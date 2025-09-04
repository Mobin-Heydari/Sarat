
import type { Metadata } from "next";
import "./globals.css";
import Theme from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "گروه سرود صراط",
  description: "گروه سرود صراط گروه برتر سرود.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8"></meta>
        <meta name="author" content="Mobin Heyadri"></meta>
        <link rel="icon" href="/logo.png" sizes="64" />
      </head>
      <body className="dark:bg-base-dark bg-base-light font-custom flex flex-col justify-between gap-6">
        <Theme>
          <Navbar />
          {children}
          <Footer />
        </Theme>
      </body>
    </html>
  );
}