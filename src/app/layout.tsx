import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bursa Kerja Khusus SMKN Ngargoyoso",
  description: " Cari Loker Sesuai Dengan Keingginan Anda",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
