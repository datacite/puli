"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PaginationToken = number | "ellipsis";

type PaginationControlsProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
  showSummary?: boolean;
  className?: string;
};

function range(start: number, end: number): number[] {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

function getPaginationTokens(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
): PaginationToken[] {
  if (totalPages <= maxVisiblePages) {
    return range(1, totalPages);
  }

  const siblingCount = Math.max(1, Math.floor((maxVisiblePages - 5) / 2));
  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, "ellipsis", totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [1, "ellipsis", ...rightRange];
  }

  return [1, "ellipsis", ...range(leftSibling, rightSibling), "ellipsis", totalPages];
}

export default function PaginationControls({
  page,
  pageSize,
  total,
  onPageChange,
  maxVisiblePages = 7,
  showSummary = true,
  className,
}: PaginationControlsProps) {
  const safePageSize = Math.max(pageSize, 1);
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const startIdx = (currentPage - 1) * safePageSize + 1;
  const endIdx = Math.min(currentPage * safePageSize, total);
  const hasMultiplePages = totalPages > 1;
  const hasOnPageChange = typeof onPageChange === "function";

  if (!hasMultiplePages) {
    if (!showSummary || total <= 0) {
      return null;
    }

    return (
      <div className={cn("mt-6 border-t px-4 py-4", className)}>
        <div className="text-center text-sm text-muted-foreground">Showing 1-{total} of {total}</div>
      </div>
    );
  }

  const tokens = getPaginationTokens(currentPage, totalPages, maxVisiblePages);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        "mt-6 border-t px-4 py-4",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-[60px] px-3"
          disabled={currentPage <= 1 || !hasOnPageChange}
          onClick={() => onPageChange?.(currentPage - 1)}
          aria-label="Go to previous page"
        >
          Previous
        </Button>

        {tokens.map((token, idx) => {
          if (token === "ellipsis") {
            return (
              <span
                key={`ellipsis-${idx}`}
                aria-hidden="true"
                className="inline-flex h-8 min-w-8 items-center justify-center px-1 text-sm text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const isCurrent = token === currentPage;

          return (
            <Button
              key={`page-${token}`}
              type="button"
              variant={isCurrent ? "default" : "ghost"}
              size="icon-sm"
              aria-label={`Go to page ${token}`}
              aria-current={isCurrent ? "page" : undefined}
              disabled={!hasOnPageChange}
              onClick={() => {
                if (!isCurrent && hasOnPageChange) {
                  onPageChange(token);
                }
              }}
              className={cn(
                "rounded-full text-sm",
                isCurrent ? "bg-datacite-blue-dark text-white hover:bg-datacite-blue-dark/90" : undefined,
              )}
            >
              {token}
            </Button>
          );
        })}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-[60px] px-3"
          disabled={currentPage >= totalPages || !hasOnPageChange}
          onClick={() => onPageChange?.(currentPage + 1)}
          aria-label="Go to next page"
        >
          Next
        </Button>
      </div>

      {showSummary ? (
        <div className="mt-2 text-center text-sm text-muted-foreground">
          Showing {startIdx}-{endIdx} of {total}
        </div>
      ) : null}
    </nav>
  );
}
