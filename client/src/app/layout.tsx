import "./globals.css";

import Header from "@/components/Header";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ModeToggle } from "@/components/model-toggle";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex justify-between items-center h-24 container">
            <ModeToggle />
            <Header />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
