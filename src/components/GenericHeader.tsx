import { H2 } from "@/components/datacite/Headings";
import type { HeaderInfo } from "@/types";
import { SquareArrowOutUpRight } from "lucide-react";

export default function Header(props: { headerInfo: HeaderInfo }) {
  return (
    <div className="flex flex-col gap-1 pl-6 ">
        <H2 className={`text-2xl datacite-dark-grey`}>{props.headerInfo.title}</H2>
        { props.headerInfo.id.startsWith("https") ? (
            <a href={props.headerInfo.id} target="_blank" rel="noopener noreferrer" className="text-muted-foreground flex items-center font-semibold text-sm hover:text-datacite-blue-light transition-colors">
                {props.headerInfo.id}
                <SquareArrowOutUpRight className="size-3 inline-block ml-1" />
            </a>
        ) :
        (
            <div className="font-semibold text-sm text-muted-foreground">{props.headerInfo.id}</div>
        )}
        {
            props.headerInfo.labels && (
                <div className="flex flex-row gap-4 flex-wrap text-muted-foreground">
                    {props.headerInfo.labels.map((label) => (
                        label.content && (
                        <div key={label.type} className="flex items-center gap-1 text-sm">
                            {label.icon}
                            <span>{label.content}</span>
                        </div>
                        )
                    ))}
                </div>
            )
        }
    </div>
  );

}
