"use client";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <h2>{error.message}</h2>
    </div>
  );
}
