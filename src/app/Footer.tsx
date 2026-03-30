import {
  SiGithub,
  SiMastodon,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { Mail, Newspaper } from "lucide-react";
import { H4 } from "@/components/datacite/Headings";
import { BRAND_URLS, FOOTER_URLS } from "@/constants";
import Status from "./StatusIndicator";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-center gap-x-30 gap-y-4 w-full mx-auto mt-30 py-8 px-4 bg-card">
      <Section title="About Us" links={FOOTER_URLS.about_links} />
      <Section title="Work With Us" links={FOOTER_URLS.services_links} />
      <Column>
        <Section title="Membership" links={FOOTER_URLS.community_links} />
        <Section title="Resources" links={FOOTER_URLS.resources_links} />
      </Column>
      <Column>
        <Section title="Contact Us" links={FOOTER_URLS.contact_links}>
          <Brands />
        </Section>
        <Status />
        <Section title="Funding">
          <ul className="max-w-sm">
            <li>
              The work on DataCite Commons is supported by funding from the
              European Union’s Horizon 2020 research and innovation programme
              under grant agreement No{" "}
              <a
                href="https://cordis.europa.eu/project/id/777523"
                target="_blank"
                rel="noreferrer"
              >
                777523
              </a>
              .
            </li>
          </ul>
        </Section>
      </Column>
    </footer>
  );
}

function Column(props: { children?: React.ReactNode }) {
  return <div className="flex flex-col gap-y-4">{props.children}</div>;
}

function Section(props: {
  title: string;
  links?: { name: string; url: string }[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <H4 className="font-bold">{props.title}</H4>
      {props.children}
      {props.links && <Links links={props.links} />}
    </div>
  );
}

const BASE_DATACITE_URL = "https://datacite.org";

function Links(props: { links: { name: string; url: string }[] }) {
  return (
    <ul>
      {props.links.map((link) => (
        <li key={link.name}>
          <a
            href={
              link.url.startsWith("/") ? BASE_DATACITE_URL + link.url : link.url
            }
            target="_blank"
            rel="noreferrer"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Brands() {
  return (
    <div className="flex gap-3 my-3">
      <a href={BRAND_URLS.email}>
        <Mail size={24} />
      </a>
      <a href={BRAND_URLS.blog}>
        <Newspaper size={24} />
      </a>
      <a href={BRAND_URLS.github}>
        <SiGithub size={24} />
      </a>
      <a href={BRAND_URLS.x}>
        <SiX size={24} />
      </a>
      <a href={BRAND_URLS.mastodon}>
        <SiMastodon size={24} />
      </a>
      <a href={BRAND_URLS.linkedin}>LinkedIn</a>
      <a href={BRAND_URLS.youtube}>
        <SiYoutube size={24} />
      </a>
    </div>
  );
}
