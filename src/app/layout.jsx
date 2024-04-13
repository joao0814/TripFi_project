import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import TripNavbar from "./components/TripNavbar/TripNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TRIPFI",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <TripNavbar />
      {children}
      <Analytics />
    </>
  );
}
