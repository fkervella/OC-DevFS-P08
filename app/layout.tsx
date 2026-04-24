import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Footer from "@/app/_components/Common/Footer";
import Header from "@/app/_components/Common/Header";

import { FavoritesProvider } from "./context/FavoriteContext";

/**
 * Inter définition d'une font disponible
 *
 * @type {*}
 */
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kasa - Location entre particuliers",

    template: "%s | Kasa", // permet aux pages filles de surcharger le titre
  },
  description: "Location d'appartements et de maisons entre particuliers",
  keywords: ["location", "appartement", "maison", "particuliers", "kasa"],
  authors: [{ name: "Kasa" }],
  creator: "Kasa",
  metadataBase: new URL("https://oc-dev-fs-p08.vercel.app/"),
  openGraph: {
    title: "Kasa — Location entre particuliers",
    description: "Location d'appartements et de maisons entre particuliers",
    url: "https://oc-dev-fs-p08.vercel.app/",
    siteName: "Kasa",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasa — Location entre particuliers",
    description: "Location d'appartements et de maisons entre particuliers",
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
    <html lang="fr" className={`${inter.className} antialiased h-full`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <FavoritesProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-mainRed focus:p-2 focus:rounded"
          >
            Aller au contenu principal
          </a>
          <Header />
          <main
            id="main-content"
            className="flex flex-1 max-w-280 m-auto w-full"
          >
            {children}
          </main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
