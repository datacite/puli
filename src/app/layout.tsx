import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "./Header";

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
      <body className={`${sourceSans3.className} antialiased bg-gray-100`}>
        <Header />
        <div className="flex flex-col gap-8 py-4 max-w-7xl mx-auto px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
