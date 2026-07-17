import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fragmentMono = localFont({
  src: "../public/FragmentMono-Regular.ttf",
  variable: "--font-fragment-mono",
});

export const metadata: Metadata = {
  title: "Rocket Launch T-Time",
  description: "Live countdown to the next rocket launch, any pad, any rocket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fragmentMono.variable} h-full antialiased`}>
      <body className="min-h-full font-mono">{children}</body>
    </html>
  );
}
