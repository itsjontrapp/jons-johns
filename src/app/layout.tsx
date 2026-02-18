import type { Metadata } from "next";
import { Inter, Righteous, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jon's Johns | The Unofficial Guide to the Most Overlooked Rooms",
  description: "The unofficial guide to the most overlooked rooms. Rating the bathrooms you didn't know you cared about.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${righteous.variable} ${pressStart.variable} antialiased bg-background text-foreground`}
      >
        <Nav />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-brown/20 py-8 text-center text-sm text-brown/60">
          <p className="font-pixel text-sm text-brown">Jon&apos;s Johns</p>
          <p className="mt-1">The unofficial guide to the most overlooked rooms.</p>
        </footer>
      </body>
    </html>
  );
}
