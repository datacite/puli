"use client";

import { Suspense } from "react";
import GlobalSearch from "@/components/GlobalSearch";

export default function Header() {

  return (
    <header className="flex bg-datacite-blue-dark items-center gap-6 px-6 py-4">
      {/* <H1 className="w-max shrink-0">
        <Link href="/" prefetch>
          <Image src={logo} alt="DataCite logo" height={35} className="" />
        </Link>
      </H1> */}
        <div className="flex min-w-0 flex-1 justify-center">
          <Suspense fallback={<div className="h-10 w-full" />}>
            <GlobalSearch />
          </Suspense>
        </div>
    </header>
  );
}
