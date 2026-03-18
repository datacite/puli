import Image from "next/image";
import Link from "next/link";
import { H1 } from "@/components/datacite/Headings";
import logo from "./DataCite-Logo.png";

export default function Header() {
  return (
    <header className="py-4 px-6">
      <H1 className="w-max">
        <Link href="/" prefetch>
          <Image src={logo} alt="DataCite logo" height={50} className="" />
        </Link>
      </H1>
    </header>
  );
}
