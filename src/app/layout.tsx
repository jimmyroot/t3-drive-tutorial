import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import PosthogProvider from "./_providers/PosthogProvider";

export const metadata: Metadata = {
  title: "T3 Drive Tutorial",
  description: "Kinda like Google Drive, only worse...",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <PosthogProvider>
        <html lang="en" className={`${geist.variable}`}>
          <body>{children}</body>
        </html>
      </PosthogProvider>
    </ClerkProvider>
  );
}
