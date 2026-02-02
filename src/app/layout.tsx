import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./premium.css";
import "./text-fixes.css";
import MainLayout from "@/components/MainLayout";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MakeMyPortal - Premium Digital Services",
  description: "Your one-stop digital service portal for websites, bots, branding, videos, and automation. Transform your digital presence with MakeMyPortal.",
  keywords: ["website development", "digital services", "bots", "automation", "branding", "India"],
  authors: [{ name: "MakeMyPortal" }],
  openGraph: {
    title: "MakeMyPortal - Premium Digital Services",
    description: "Transform your digital presence with MakeMyPortal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SmoothScroll>
          <MainLayout>
            {children}
          </MainLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
