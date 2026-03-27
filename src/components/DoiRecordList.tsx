import React from "react";
import Link from "next/link";

export type DoiRecord = {
  id: string;
  attributes: {
    titles: { title: string }[];
    doi: string;
    descriptions?: { description: string }[];
    types: { resourceTypeGeneral?: string };
    citationCount?: number;
    viewCount?: number;
    downloadCount?: number;
    publicationYear?: string;
    publisher?: string;
    agency?: string;
  };
};

type DoiRecordListProps = {
  records: DoiRecord[];
};

export function DoiRecordList({ records }: DoiRecordListProps) {
  if (!records || records.length === 0) {
    return <p>No citations found.</p>;
  }
  return (
    <div className="flex flex-col py-4">
      {records.map((record, idx) => (
        <div key={record.id} className="flex flex-col">
          <DoiRecordItem record={record} />
          {idx < records.length - 1 && (
            <div className="w-full flex justify-center">
              <div className="h-px w-5/6 bg-gray-300 my-2" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

type DoiRecordItemProps = {
  record: DoiRecord;
};

export function DoiRecordItem({ record }: DoiRecordItemProps) {
  return (
        <Link
      href={`/citations/${record.attributes.doi}`}
      className="cursor-pointer"
      scroll={false}
      shallow
    >
    <div className="py-2">
      <div className="font-bold text-[#243B54]">
        {record.attributes.titles[0].title}
      </div>
      <div className="text-gray-500 font-semibold text-sm">
        https://doi.org/{record.attributes.doi}
      </div>
               <div className="text-gray-500 text-sm mt-2">
            {record.attributes.publicationYear} · {record.attributes.publisher} {record.attributes.agency && " · via " + record.attributes.agency.charAt(0).toUpperCase() + record.attributes.agency.slice(1)}
            </div>
      <div className="text-gray-500 line-clamp-3 text-sm mt-2">
        {record.attributes.descriptions?.[0]?.description}
      </div>

      <div className="text-gray-500 text-sm mt-2">
        {record.attributes.types.resourceTypeGeneral ? (
          <span className="font-semibold mr-2 bg-[#e6f0fa] text-[#003366] rounded-full px-3 py-1 text-xs inline-block">
            {record.attributes.types.resourceTypeGeneral}
          </span>
        ) : null}
        <span className="align-right font-semibold mt-2 bg-gray-100 text-[#003366] rounded-sm px-3 py-1 text-xs inline-block">
          Citations: <span className="font-bold mr-2">{record.attributes.citationCount} </span>
          Views: <span className="font-bold mr-2">{record.attributes.viewCount} </span>
          Downloads: <span className="font-bold mr-2">{record.attributes.downloadCount} </span>
        </span>
      </div>
    </div>
    </Link>
  );
}
