import React from "react";
import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { Skeleton } from "@/components/ui/skeleton";

type DoiRecordListSkeletonProps = {
  count?: number;
};

function DoiRecordItemSkeleton() {
  return (
    <div className="flex min-h-[7.5rem] flex-col gap-2 py-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function DoiRecordListSkeleton({ count = 5 }: DoiRecordListSkeletonProps) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex flex-col">
          <DoiRecordItemSkeleton />
          {idx < count - 1 && (
            <BaseSeparator
              orientation="horizontal"
              className="my-2 h-px w-5/6 self-center bg-gray-300"
            />
          )}
        </div>
      ))}
    </div>
  );
}
