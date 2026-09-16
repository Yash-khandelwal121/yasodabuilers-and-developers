import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomActions from "@/components/layout/MobileBottomActions";
import WhatsAppWidget from "@/components/layout/WhatsAppWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yasoda Builders and Developers | Builders & Developers in Guntakal",
  description: "Yasoda Builders and Developers provides residential, commercial and building construction services in Guntakal, Anantapur District, Andhra Pradesh.",
};

import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen overflow-x-hidden w-full`}
      >
        <PublicLayoutWrapper>
          <TopBar />
          <Navbar />
        </PublicLayoutWrapper>
        
        <main className="flex-grow">{children}</main>
        
        <PublicLayoutWrapper>
          <Footer />
          <MobileBottomActions />
          <WhatsAppWidget />
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}
