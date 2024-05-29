import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Provider from "./util/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BKK SMKN NGARGOYOSO",
  description: "BURSA KERJA SMK NEGRI NGARGOYOSO",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png?v=4",
    shortcut: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Provider>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
