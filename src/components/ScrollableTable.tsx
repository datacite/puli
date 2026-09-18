import { DownloadIcon } from "lucide-react";
import type { ReactNode } from "react";
import { H3 } from "@/components/datacite/Headings";

import { Button } from "@/components/ui/button";

type TableValue = ReactNode;
type CsvCellValue = string | number | boolean | null | undefined;

function escapeCsvValue(value: CsvCellValue): string {
  const stringValue = value == null ? "" : String(value);
  return /[",\n\r]/.test(stringValue)
    ? `"${stringValue.replaceAll('"', '""')}"`
    : stringValue;
}

function downloadCsvFile(contents: string, filename: string) {
  const blob = new Blob([contents], { type: "text/csv" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(href);
}

export type TableColumn<T> = {
  header: string;
  accessor: keyof T;
  className?: string;
};

interface ScrollableTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  maxHeight?: string;
  rowKey: keyof T;
  title?: string;
  csvFilename?: string;
  csvRows?: Array<Record<string, CsvCellValue>>;
}

export default function ScrollableTable<T>({
  columns,
  data,
  maxHeight = "h-96",
  rowKey,
  title,
  csvFilename = "table-export.csv",
  csvRows,
}: ScrollableTableProps<T>) {
  function handleDownloadCsv() {
    if (!csvRows || csvRows.length === 0) return;

    const headerRow = columns.map((column) => escapeCsvValue(column.header)).join(",");
    const bodyRows = csvRows.map((row) =>
      columns.map((column) => escapeCsvValue(row[String(column.accessor)])).join(","),
    );
    downloadCsvFile([headerRow, ...bodyRows].join("\n"), csvFilename);
  }

  return (
    <div className="space-y-2">
      {title || (csvRows && csvRows.length > 0) ? (
        <div className="flex items-center justify-between gap-3 px-0">
          <H3 className="text-md">{title}</H3>
          {csvRows && csvRows.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8  rounded-full px-2.5 text-xs font-semibold text-muted-foreground hover:bg-gray-200 hover:text-foreground"
              onClick={handleDownloadCsv}
            >
              <DownloadIcon className="size-3.5" />
              <span>Export CSV</span>
            </Button>
          ) : null}
        </div>
      ) : null}
      <div className="rounded-none border bg-white overflow-hidden">
        <div className={`${maxHeight} overflow-y-auto`}>
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-muted z-10">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-muted-foreground"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={String(item[rowKey]) || String(index)}
                  className={`border-b border-border transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-slate-50"
                  } hover:bg-slate-100`}
                >
                  {columns.map((column, colIdx) => (
                    <td
                      key={colIdx}
                      className={`px-4 py-3 text-sm text-foreground ${
                        column.className || ""
                      }`}
                    >
                      {(item[column.accessor] as TableValue) ?? ""}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
