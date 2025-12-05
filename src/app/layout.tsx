import { uiText } from "@/config/strings";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: uiText.metadata.title,
  description: uiText.metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-slate-50`}
      >
        <div className="min-h-screen bg-slate-950">
          <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <Link className="text-lg font-semibold tracking-tight" href="/">
                {uiText.appName}
              </Link>
              <nav className="flex items-center gap-4 text-sm text-slate-200">
                <Link className="rounded-full px-3 py-1 hover:bg-slate-800/70" href="/">
                  {uiText.nav.timeline}
                </Link>
                <Link className="rounded-full px-3 py-1 hover:bg-slate-800/70" href="/post">
                  {uiText.nav.post}
                </Link>
                <Link className="rounded-full px-3 py-1 hover:bg-slate-800/70" href="/listening">
                  {uiText.nav.listening}
                </Link>
                <Link
                  className="rounded-full px-3 py-1 hover:bg-slate-800/70"
                  href="/profile/you"
                >
                  {uiText.nav.profile}
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto flex max-w-5xl flex-col px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
