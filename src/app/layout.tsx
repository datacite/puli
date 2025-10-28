import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Metadata Analytics",
  description: "DataCite Metadata Analytics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSans3.className} antialiased max-w-7xl mx-auto px-6 bg-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
