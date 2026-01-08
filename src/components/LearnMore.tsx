export default function LearnMore({
  href,
  text,
}: {
  href: string;
  text?: string;
}) {
  return (
    <a href={href} className="underline">
      {text || "Learn more"}
    </a>
  );
}
