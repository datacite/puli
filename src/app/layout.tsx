import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import LoadingIndicator from "@/components/LoadingIndicator";
import { barlow } from "@/lib/fonts";
import Footer from "./Footer";
import Header from "./Header";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "DataCite Metadata Dashboard",
  description: "DataCite Metadata Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.className} antialiased bg-datacite-gray grid grid-rows-[min-content_1fr_auto] h-dvh max-h-dvh`}
      >
        <Providers>
          <Header />
          <div className="flex flex-col gap-12 py-4 max-w-7xl mx-auto px-6">
            {children}
          </div>
          <Footer />
          <LoadingIndicator />
        </Providers>
        <Analytics />
        <Script id="feedback-button">
          {`(function(){window.onUsersnapCXLoad=function(e){e.init()};var e=document.createElement("script");e.defer=1,e.src="https://widget.usersnap.com/global/load/b4393e90-ec13-4338-b299-7b6f122b7de3?onload=onUsersnapCXLoad",document.getElementsByTagName("head")[0].appendChild(e)})();`}
        </Script>
      </body>
    </html>
  );
}
