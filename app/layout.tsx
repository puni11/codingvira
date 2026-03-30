import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeVira - Managed DevOps Services, Website Development, and Cloud Solutions",
  description: "CodeVira is a leading provider of managed DevOps services, website development, and cloud solutions. We help businesses streamline their operations, enhance their online presence, and leverage the power of the cloud to achieve their goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-zinc-50`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
      </Providers>
    </html>
  );
}
