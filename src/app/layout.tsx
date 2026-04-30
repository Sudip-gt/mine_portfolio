import CommandPaletteProvider from "@/components/CommandPaletteProvider";
import Footer from "@/components/Footer";
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
  metadataBase: new URL("https://sudip.dev"),
  title: "Sudip | Full Stack JavaScript Developer",
  description:
    "Full Stack JavaScript Developer specializing in React, Next.js, Node.js, NestJS, and modern web technologies. Available for freelance and full-time roles.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/icon.svg"],
    apple: ["/icon.svg"],
  },
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sudip | Full Stack JavaScript Developer",
    description:
      "Full Stack JavaScript Developer specializing in React, Next.js, Node.js, and NestJS.",
    url: "/",
    siteName: "Sudip's Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sudip — Full Stack JavaScript Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sudip | Full Stack JavaScript Developer",
    description:
      "Full Stack JavaScript Developer specializing in React, Next.js, Node.js, and NestJS.",
    images: ["/og-image.png"],
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col">
          <Navbar />
          <CommandPaletteProvider />
          <main className="flex-1" data-search-root>{children}</main>
          <Footer />
        </body>
    </html>
  );
}
