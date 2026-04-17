import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudip | Full Stack JavaScript Developer",
  description:
    "Full Stack JavaScript Developer specializing in React, Next.js, Node.js, NestJS, and modern web technologies. Available for freelance and full-time roles.",
  keywords: [
    "Full Stack Developer",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "MongoDB",
    "PostgreSQL",
  ],
  authors: [{ name: "Sudip" }],
  openGraph: {
    title: "Sudip | Full Stack JavaScript Developer",
    description:
      "Full Stack JavaScript Developer specializing in React, Next.js, Node.js, and NestJS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
        </body>
    </html>
  );
}
