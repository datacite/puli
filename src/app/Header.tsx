import Image from "next/image";
import Link from "next/link";
import { H1 } from "@/components/datacite/Headings";
import logo from "./DataCite-Logo.svg";

export default function Header() {
  return (
    <header className="py-4 px-6">
      <H1 className="w-max">
        <Link href="/">
          <Image src={logo} alt="DataCite logo" height={75} className="" />
        </Link>
      </H1>
    </header>
  );
}
