import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "SecureStart BD | Secure code templates for small dev teams";
const description =
  "Free templates for safe login, encrypted storage and API validation, plus a security checklist and a fake link checker for small development teams in Bangladesh.";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title,
  description,
  openGraph: { title, description, type: "website", images: ["/og.png"] },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${geistMono.variable} flex min-h-screen flex-col`}
      >
        <a
          href="#main"
          className="sr-only fixed left-4 top-4 z-[60] rounded-lg bg-white px-3 py-2 caption-1 focus:not-sr-only focus:outline-2 focus:outline-emerald-700"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
