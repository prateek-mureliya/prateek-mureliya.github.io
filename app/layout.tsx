import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/theme-provider";
import { ProcessContextProvider } from "@/contexts/process-manager";
import "./globals.css";
import { Toaster } from "@/components/UI/sonner";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/constants";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
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
          <Toaster position={"bottom-center"} />
        </ThemeProvider>
      </body>
    </html>
  );
}
