import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/theme-provider";
import { ProcessContextProvider } from "@/contexts/process-manager";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prateek's Portfolio",
  description:
    "Explore Prateek's interactive online portfolio designed like a modern web OS. Discover projects, skills, and experience through a beautiful, desktop-style interface. Fast, intuitive, and uniquely personal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='relative w-full h-dvh overflow-hidden'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ProcessContextProvider>{children}</ProcessContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
