import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./css/globals.css";
import "./css/shadow.css";
import "./css/chatbot.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar/Navbar";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevJ2K - Portfolio",
  description: "The portfolio of a passionate software engineer.",
  icons: {
    icon: "/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex justify-center`}
      >
        <Navbar />
        {children}
        {/* <Chatbot /> */}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
