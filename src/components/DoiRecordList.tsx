import React from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import PaginationControls from "@/components/PaginationControls";
import { externalSubtitleIcon } from "@/lib/resultItems";
import type { ResultListItem } from "@/types";

type DoiRecordListProps = {
  items?: ResultListItem[];
  singleLineDescription?: boolean;
  loading?: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  emptyText?: string;
};

export function DoiRecordList({
  items = [],
  singleLineDescription = true,
  loading = false,
  total = 0,
  page = 1,
  pageSize = 25,
  onPageChange,
  emptyText = "No results found.",
}: DoiRecordListProps) {
  const descriptionClassName = singleLineDescription ? "line-clamp-1" : undefined;

  const content = (
    <>
      {loading && items.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-500">
          <Spinner className="size-6 stroke-datacite-blue-dark" />
        </div>
      ) : null}

      {!loading && items.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          {emptyText}
        </div>
      )}

      {!loading && items.length > 0 && (
        <>
          <div className="flex flex-col">
            {items.map((item, idx) => (
              <div key={item.id} className="flex flex-col">
                <ResultListRow item={item} descriptionClassName={descriptionClassName} />
                {idx < items.length - 1 && (
                  <BaseSeparator
                    orientation="horizontal"
                    className="my-2 h-px w-5/6 self-center bg-gray-300"
                  />
                )}
              </div>
            ))}
          </div>

          {total > 0 && pageSize > 0 && (
            <PaginationControls
              page={page}
              pageSize={pageSize}
              total={total}
              onPageChange={onPageChange}
              maxVisiblePages={7}
              className="border-gray-300 px-0"
            />
          )}
        </>
      )}
    </>
  );

  return (
    <div className="flex flex-col py-4 min-w-0">
      {content}
    </div>
  );
}

type ResultListRowProps = {
  item: ResultListItem;
  descriptionClassName?: string;
};

function ResultListRow({ item, descriptionClassName }: ResultListRowProps) {
  return (
    <div className="py-2 flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <div className="font-bold text-datacite-blue-dark hover:text-datacite-blue-light transition-colors">
          <Link href={item.href}>{item.title}</Link>
        </div>
        {item.subtitle ? (
          item.subtitleHref ? (
            <a
              href={item.subtitleHref}
              target={item.subtitleExternal ? "_blank" : undefined}
              rel={item.subtitleExternal ? "noopener noreferrer" : undefined}
              className="flex items-center font-semibold text-sm text-muted-foreground hover:text-datacite-blue-light transition-colors"
            >
              {item.subtitle}
              {item.subtitleExternal ? externalSubtitleIcon : null}
            </a>
          ) : (
            <div className="font-semibold text-sm text-muted-foreground">{item.subtitle}</div>
          )
        ) : null}
      </div>
      {item.secondaryLine ? (
        <div className="text-gray-500 text-sm">{item.secondaryLine}</div>
      ) : null}
      {item.attributes && item.attributes.length > 0 ? (
        <div className="text-muted-foreground text-sm gap-4 flex flex-wrap flex-row">
          {item.attributes.map((attribute) => (
            <span key={attribute.type} className="flex items-center gap-1">
              {attribute.icon}
              {attribute.content}
            </span>
          ))}
        </div>
      ) : null}
      {item.description ? (
        <div className={["text-muted-foreground text-sm", descriptionClassName].filter(Boolean).join(" ")}>
          {item.description}
        </div>
      ) : null}
      {item.badge ? (
        <div>
          <span className="font-semibold mr-2 bg-[#e6f0fa] text-[#003366] rounded-full px-3 py-1 text-xs inline-block">
            {item.badge}
          </span>
        </div>
      ) : null}
    </div>
  );
}
