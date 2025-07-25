import type { Metadata } from "next";
import { Montserrat, Merriweather, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "@/components/tanstack-query-provider";
import { Toolbar } from "basehub/next-toolbar";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Liam Murray",
    template: "%s | Liam Murray",
  },
  description: "Software Engineer. Building stuff on the internet.",
  keywords: [
    "Liam Murray",
    "Software Engineer",
    "Google",
    "Web Development",
    "TypeScript",
    "React",
    "Next.js",
    "Seattle",
    "Open Source",
  ],
  authors: [{ name: "Liam Murray" }],
  creator: "Liam Murray",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Liam Murray - Software Engineer",
    description: "Building stuff on the internet.",
    siteName: "Liam Murray",
  },
  twitter: {
    card: "summary_large_image",
    title: "Liam Murray - Software Engineer",
    description: "Building stuff on the internet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${merriweather.variable} ${sourceCodePro.variable} antialiased bg-background dark text-foreground`}
      >
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
        <Toolbar />
      </body>
    </html>
  );
}
