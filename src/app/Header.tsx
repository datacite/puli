import Image from "next/image";
import Link from "next/link";
import logo from "./datacite-logo.png";

export default function Header() {
  return (
    <header className="py-4 px-6">
      <h1>
        <Link href="/">
          <Image src={logo} alt="DataCite logo" height={75} className="" />
        </Link>
      </h1>
    </header>
  );
}
