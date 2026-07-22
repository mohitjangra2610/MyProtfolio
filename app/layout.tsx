import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ResponsiveNavigation } from "@/components/navigation/ResponsiveNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Mohit Jangra",
    default: "Mohit Jangra — Product Designer",
  },
  description:
    "Simplifying complex systems through strategy and systems thinking. Portfolio of Mohit Jangra, a UX/Product Designer focused on structure, clarity, and scalable design.",
  openGraph: {
    title: "Mohit Jangra — Product Designer",
    description: "Simplifying complex systems through strategy and systems thinking.",
    type: "website",
    locale: "en_US",
    siteName: "Mohit Jangra",
  },
  icons: {
    icon: "/mj_icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ResponsiveNavigation />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
