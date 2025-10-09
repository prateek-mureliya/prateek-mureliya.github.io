import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/theme-provider";
import { ProcessContextProvider } from "@/contexts/process-manager";
import "./globals.css";
import { Toaster } from "@/components/UI/sonner";
import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_KEYWORDS,
  GITHUB_SITE_URL,
} from "@/lib/constants";
import { HackedContextProvider } from "@/contexts/hacked";
import { URL } from "node:url";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  metadataBase: new URL(GITHUB_SITE_URL),
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
          <ProcessContextProvider>
            <HackedContextProvider>{children}</HackedContextProvider>
          </ProcessContextProvider>

          <Toaster
            position={"top-center"}
            duration={10000}
            toastOptions={{
              unstyled: true,
              classNames: {
                toast:
                  "flex items-center gap-2 w-full p-4 text-sm bg-gradient-to-r text-white rounded-lg shadow-lg",
                icon: "size-4 -ml-1 mr-1",
                title: "font-semibold",
                description: "opacity-90",
                cancelButton:
                  "h-6 ml-auto shrink-0 bg-white/20 hover:bg-white/30 rounded px-2 py-1 text-xs",
                success:
                  "from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600",
                error:
                  "from-rose-500 to-red-500 dark:from-rose-600 dark:to-red-600",
                info: "from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600",
                warning:
                  "from-amber-500 to-yellow-500 dark:from-amber-600 tdark:o-yellow-600",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
