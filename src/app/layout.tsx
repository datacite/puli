import type { Metadata } from "next";
import "./globals.css";
import { barlow } from "@/lib/fonts";
import Header from "./Header";
import Providers from "./Providers";

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
      <body className={`${barlow.className} antialiased bg-gray-100`}>
        <Providers>
          <Header />
          <div className="flex flex-col gap-8 py-4 max-w-7xl mx-auto px-6">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
