import { Barlow, DM_Sans } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "700"],
  display: "swap",
});

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "700"],
  display: "swap",
});
