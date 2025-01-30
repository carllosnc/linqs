import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { SessionProvider } from "next-auth/react";
import { JotaiProviders } from "@/components/jotai-providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linqs",
  description: "The better way to organize and share links",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body
        className={
          `${geistSans.variable} ${geistMono.variable} antialiased font-sans`
        }
      >
        <JotaiProviders>
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              <main className="min-h-screen flex flex-col justify-between items-center">
                <Header />
                <div className="w-full max-w-[800px] min-h-screen border-x md:border-none border-color">
                  {children}
                </div>
                <Footer />
              </main>
            </ThemeProvider>
          </SessionProvider>
        </JotaiProviders>
      </body>
    </html>
  );
}
