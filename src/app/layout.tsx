import type { Metadata } from "next";
import { Archivo, Work_Sans, Caveat } from "next/font/google";
import { PersonaProvider } from "@/context/PersonaContext";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Roast my Startup: Austria Edition",
  description: "Fünf österreichische Archetypen + ein Silicon-Valley-VC-Bro bewerten deine Startup-Website.",
  openGraph: {
    title: "Roast my Startup: Austria Edition",
    description: "Finde heraus, was Österreich wirklich von deiner Idee hält.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${archivo.variable} ${workSans.variable} ${caveat.variable}`}>
        <PersonaProvider>
          {children}
        </PersonaProvider>
      </body>
    </html>
  );
}
