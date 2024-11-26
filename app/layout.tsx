import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/navigation/nav";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/team-provider";
import { Toaster } from "sonner";

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
    <html lang="en" suppressHydrationWarning>
      <body className={(cn("px-6 md:px-24 max-w-7xl mx-auto"), `${inter.className}`)}>
        {" "}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Nav />
          <Toaster richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
