import React from "react";
import Link from "next/link";

export type EventFeedItem = {
  id: string;
  type: string;
  attributes: {
    "subj-id": string;
    "obj-id": string;
    "source-id": string;
    "relation-type-id": string;
    total: number;
    "message-action": string;
    license: string;
    "occurred-at": string;
    timestamp: string;
  };
  relationships: {
    subj: { data: { id: string; type: string } };
    obj: { data: { id: string; type: string } };
  };
};

export type EventFeedProps = {
  events: EventFeedItem[];
  doi: string;
};

const relationTypeLabel: Record<string, string> = {
  references: "references",
  cites: "cites",
  "is-authored-by": "is authored by",
};

export default function EventFeed({ events, doi }: EventFeedProps) {
  return (
    <div className="relative pl-6 py-8 w-full">
      <ul className="space-y-10">
        {events.map((event, idx) => (
          <li key={event.id} className="relative flex items-start min-h-[40px] max-w-full">
            {idx !== events.length - 1 && (
              <span className="absolute left-1.5 top-10 w-0.5 h-[calc(100%_-_12px)] bg-gray-700/40 z-0" aria-hidden="true" />
            )}
            <span className="absolute left-0 top-2 flex justify-center w-3 h-3 rounded-full bg-[#243B54]" />
            <div className="ml-8 flex-1 flex flex-col justify-center w-full pr-2">
              <div className="flex items-start gap-2 text-sm text-gray-600 min-h-[28px]">
                {event.attributes["subj-id"].startsWith("https://doi.org/") ? (
                  <Link
                    href={`/dois/${event.attributes["subj-id"].replace("https://doi.org/", "")}`}
                    className="font-semibold bg-[#e6f0fa] text-[#003366] rounded-full px-3 py-1 text-xs inline-block text-center max-w-xs overflow-hidden truncate hover:underline"
                    title={event.attributes["subj-id"]}
                    scroll={false}
                    shallow
                  >
                    {event.attributes["subj-id"].replace("https://doi.org/", "" ) === doi ? <span className="mr-1">✔</span> : ""}
                    {event.attributes["subj-id"].replace("https://doi.org/", "")}
                  </Link>
                ) : (
                  <span
                    className="font-semibold bg-[#e6f0fa] text-[#003366] rounded-full px-3 py-1 text-xs inline-block text-center max-w-xs overflow-hidden truncate"
                    title={event.attributes["subj-id"]}
                  >
                    {event.attributes["subj-id"].replace("https://doi.org/", "" ) === doi ? <span className="mr-1">✔</span> : ""}
                    {event.attributes["subj-id"].replace("https://doi.org/", "")}
                  </span>
                )}
                <span className="text-gray-500">→</span>
                <span className="font-semibold  text-center" style={{ minWidth: '60px' }} title={event.attributes["relation-type-id"]}>
                  {relationTypeLabel[event.attributes["relation-type-id"]] || event.attributes["relation-type-id"]}
                </span>
                <span className="text-gray-500">→</span>
                {event.attributes["obj-id"].startsWith("https://doi.org/") ? (
                  <Link
                    href={`/dois/${event.attributes["obj-id"].replace("https://doi.org/", "")}`}
                    className="font-semibold bg-[#e6f0fa] text-[#003366] rounded-full px-3 py-1 text-xs inline-block text-center max-w-xs overflow-hidden truncate hover:underline"
                    title={event.attributes["obj-id"]}
                    scroll={false}
                    shallow
                  >
                    {event.attributes["obj-id"].replace("https://doi.org/", "" ) === doi ? <span className="mr-1">✔</span> : ""}
                    {event.attributes["obj-id"].replace("https://doi.org/", "")}
                  </Link>
                ) : (
                  <span
                    className="font-semibold bg-[#e6f0fa] text-[#003366] rounded-full px-3 py-1 text-xs inline-block text-center max-w-xs overflow-hidden truncate"
                    title={event.attributes["obj-id"]}
                  >
                    {event.attributes["obj-id"].replace("https://doi.org/", "" ) === doi ? <span className="mr-1">✔</span> : ""}
                    {event.attributes["obj-id"].replace("https://doi.org/", "")}
                  </span>
                )}
              </div>
              <div className="mt-2 text-xs">
                <div className="text-gray-500 mb-1">
                  <span>{new Date(event.attributes["occurred-at"]).toLocaleString()}</span>
                  <span> via </span>
                    <span className="">{event.attributes["source-id"]}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
