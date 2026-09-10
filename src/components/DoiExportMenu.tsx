"use client";

import {
  ChevronDown,
  Code,
  DownloadIcon,
} from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import {
  buildDoiExportUrl,
  fetchDoiCsvPage,
} from "@/data/fetch";

type Props = {
  disabled: boolean;
  query: string;
  sort: string;
  pageSize: number;
  total: number;
};

function downloadCsvFile(contents: string, filename: string) {
  const blob = new Blob([contents], { type: "text/csv" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(href);
}

function getInternationalDateStamp() {
  return new Date().toISOString().slice(0, 10);
}

export default function DoiExportMenu({
  disabled,
  query,
  sort,
  pageSize,
  total,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [exportingCurrentPage, setExportingCurrentPage] = useState(false);

  async function handleExportCurrentPage() {
    if (!query.trim() || exportingCurrentPage) return;

    setExportingCurrentPage(true);

    try {
      const csv = await fetchDoiCsvPage(query, { pageSize, sort });
      downloadCsvFile(csv, `dois-${getInternationalDateStamp()}.csv`);
      setMenuOpen(false);
    } finally {
      setExportingCurrentPage(false);
    }
  }

  function handleViewRestApi() {
    const url = buildDoiExportUrl(query, { pageSize, sort });
    window.open(url, "_blank", "noopener,noreferrer");
    setMenuOpen(false);
  }

  return (
    <Popover open={menuOpen} onOpenChange={setMenuOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 rounded-full px-2.5 text-xs font-semibold hover:bg-gray-200"
          disabled={disabled || exportingCurrentPage}
        >
          {exportingCurrentPage ? (
            <Spinner className="size-3.5" />
          ) : null}
          <span>Export...</span>
          <ChevronDown className="size-3.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="rounded-none border border-gray-200 bg-white p-1"
      >
        <div className="flex flex-col gap-1">
          {/* <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto w-full justify-start rounded-sm px-2 py-1.5 text-left text-sm font-normal"
            onClick={handleExportCurrentPage}
            disabled={exportingCurrentPage}
          >
            {exportingCurrentPage ? <Spinner className="size-3" /> : <DownloadIcon className="size-3" />}
            <span>Download Current Page as CSV</span>
          </Button> */}

          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto w-full justify-start rounded-sm px-2 py-1.5 text-left text-sm font-normal"
                disabled={exportingCurrentPage}
              >
                <DownloadIcon className="size-3" />
                <span>Export as CSV...</span>
              </Button>
            </DialogTrigger>
            <BulkExportDialog
              query={query}
              sort={sort}
              total={total}
              onClose={() => setMenuOpen(false)}
            />
          </Dialog>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto w-full justify-start rounded-sm px-2 py-1.5 text-left text-sm font-normal"
            onClick={handleViewRestApi}
            disabled={exportingCurrentPage}
          >
            <Code className="size-3" />
            <span>View in REST API</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

type BulkDialogProps = {
  query: string;
  sort: string;
  total: number;
  onClose: () => void;
};

function BulkExportDialog({ query, sort, total, onClose }: BulkDialogProps) {
  const [bulkLimit, setBulkLimit] = useState<5000 | 10000 | 20000 | 50000>(5000);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedPages, setCompletedPages] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const effectiveCount = Math.min(total, bulkLimit);
  const totalPages = Math.ceil(effectiveCount / 1000);
  const progressPercent =
    totalPages === 0 ? 0 : Math.round((completedPages / totalPages) * 100);

  const options = [5000, 10000, 20000, 50000] as const;
  // The smallest option that covers all records — options beyond it are redundant.
  const firstFullOption = options.find((o) => o >= total) ?? null;

  function handleCancel() {
    abortRef.current?.abort();
    onClose();
  }

  async function handleExport() {
    if (!query.trim() || effectiveCount <= 0 || exporting) return;

    setError(null);
    setExporting(true);
    setCompletedPages(0);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const { mergeCsvDocuments } = await import("@/data/fetch");
      const csvPages: string[] = [];

      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
        if (controller.signal.aborted) break;

        const remaining = effectiveCount - (pageNumber - 1) * 1000;
        const currentPageSize = Math.min(1000, remaining);
        const csvPage = await fetchDoiCsvPage(query, {
          pageNumber,
          pageSize: currentPageSize,
          sort,
        });

        if (controller.signal.aborted) break;

        csvPages.push(csvPage);
        setCompletedPages(pageNumber);
      }

      if (controller.signal.aborted) return;

      const mergedCsv = mergeCsvDocuments(csvPages);
      const blob = new Blob([mergedCsv], { type: "text/csv" });
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `dois-${effectiveCount}-${getInternationalDateStamp()}.csv`;
      link.click();
      URL.revokeObjectURL(href);

      onClose();
    } catch (err) {
      if (!controller.signal.aborted) {
        setError(err instanceof Error ? err.message : "Export failed.");
      }
    } finally {
      setExporting(false);
      abortRef.current = null;
    }
  }

  return (
    <>
      <DialogContent className="max-w-2xl gap-6 p-0 overflow-hidden rounded-none">
        <DialogHeader className="border-b px-7 py-6 text-left">
          <DialogTitle className="text-2xl font-medium tracking-tight text-datacite-dark-gray">
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 px-7">
          <div className="space-y-4">
            <p className="font-semibold text-datacite-dark-gray">
              Select maximum number of records to export:
            </p>

            <div className="inline-flex overflow-hidden rounded-none border border-gray-200 bg-white">
              {options.map((option) => {
                const selected = option === bulkLimit;
                const disabledOption = firstFullOption !== null && option > firstFullOption;

                return (
                  <Button
                    key={option}
                    type="button"
                    variant="ghost"
                    className={[
                      "h-12 rounded-none border-r border-gray-200 px-5 text-md font-medium last:border-r-0 sm:text-base",
                      selected ? "bg-datacite-blue-dark text-white hover:bg-datacite-blue-dark hover:text-white" : "bg-white text-datacite-dark-gray hover:bg-gray-100",
                    ].join(" ")}
                    onClick={() => setBulkLimit(option)}
                    disabled={exporting || disabledOption}
                    aria-pressed={selected}
                  >
                    {option / 1000}k
                  </Button>
                );
              })}
            </div>

            <div className="text-datacite-dark-gray text-md">
              <span className="font-semibold rounded-full border-datacite-blue-dark">
                {effectiveCount.toLocaleString("en-US")}  
              </span>
              <span> of {total.toLocaleString("en-US")} records will be exported.</span>
            </div>
          </div>

          {exporting ? (
            <div className="rounded-none border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-datacite-dark-gray">
              <div className="flex items-center gap-3">
                <Spinner className="size-4" />
                <span>
                  {progressPercent}% complete
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-datacite-blue-dark transition-[width] duration-200"
                  style={{
                    width: `${totalPages === 0 ? 0 : (completedPages / totalPages) * 100}%`,
                  }}
                />
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </div>

        <DialogFooter className="border-t px-7 py-5 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="rounded-full text-datacite-dark-gray hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-datacite-blue-dark rounded-full text-white hover:bg-datacite-blue-dark/90"
            onClick={handleExport}
            disabled={exporting || effectiveCount <= 0}
          >
            {exporting ? <Spinner className="size-4" /> : <DownloadIcon className="size-4" />}
            <span>Export CSV</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
}