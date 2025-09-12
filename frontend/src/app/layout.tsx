
import type { Metadata } from "next";
import "./globals.css";
import Theme from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export const metadata: Metadata = {
  title: "گروه سرود صراط | هنر، ایمان، همدلی",
  description:
    "گروه سرود صراط مجموعه‌ای فرهنگی با هدف ترویج ارزش‌های مذهبی، اجتماعی و هنری از طریق نماهنگ، صوت، طنز و ارتباط انسانی. با ما همراه شوید.",
  keywords: [
    "گروه سرود صراط",
    "نماهنگ",
    "صوت",
    "طنز",
    "محتوای فرهنگی",
    "سرود مذهبی",
    "هنر ایرانی",
    "سرود نوجوانان",
    "ارتباط با ما",
  ],
  authors: [{ name: "Mobin Heyadri", url: "https://serat.ir" }],
  creator: "Mobin Heyadri",
  publisher: "گروه سرود صراط",
  metadataBase: new URL("https://serat.ir"),
  openGraph: {
    title: "گروه سرود صراط | هنر، ایمان، همدلی",
    description:
      "در مجموعه‌ی صراط، نماهنگ‌ها، صوت‌ها، لحظات طنز و ارتباط فرهنگی را تجربه کنید. محتوایی برای تمام سنین با پیام‌های الهام‌بخش.",
    url: "https://serat.ir",
    siteName: "گروه سرود صراط",
    images: [
      {
        url: "https://serat.ir/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "گروه سرود صراط",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "گروه سرود صراط",
    description: "هنر، ایمان، همدلی — همه در یک مجموعه فرهنگی.",
    images: ["https://serat.ir/og-home.jpg"],
    creator: "@serat_group",
  },
  alternates: {
    canonical: "https://serat.ir",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Mobin Heyadri" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/logo.png" sizes="64x64" type="image/png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="dark:bg-base-dark bg-base-light font-samim font-bold flex flex-col justify-between gap-6">
        <Theme>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </Theme>
      </body>
    </html>
  );
}
