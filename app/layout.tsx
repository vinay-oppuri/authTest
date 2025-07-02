import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Authentication Test - App.",
  description: "Developed for Authentication Tesing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}