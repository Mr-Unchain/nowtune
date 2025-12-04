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
  title: "NowTune",
  description: "NowTune music social network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-50`}
      >
        <div className="min-h-screen bg-slate-950">
          <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <div className="text-lg font-semibold tracking-tight">NowTune</div>
            </div>
          </header>
          <main className="mx-auto flex max-w-5xl flex-col px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
