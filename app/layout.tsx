import { Toaster } from "@/components/ui/sonner"
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Providers from "@/app/providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Linqs — Save • Manage • Share",
  description: "Linqs is a sleek, intuitive platform designed to help you effortlessly organize, manage, and share your favorite links.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>

      <head>
        <meta name="referrer" content="origin" />
        <script src="https://accounts.google.com/gsi/client" async></script>
        <meta name="theme-color" content="#000000" />
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <Providers>
              {children}
            </Providers>
          </main>
        </ThemeProvider>

        <Toaster />
      </body>
    </html>
  );
}
