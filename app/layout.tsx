import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { ScrollToTop } from "@/components/ScrollToTop";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "أخبار السعودية",
  description: "أحدث الأخبار في المملكة العربية السعودية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} font-sans antialiased bg-gray-50 text-gray-900 flex flex-col min-h-screen`}
      >
        <Header />
        <NavBar />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
