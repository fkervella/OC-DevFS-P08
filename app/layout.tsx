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
  title: "Kasa",
  description: "Location d appartements et de maisons entre particuliers",
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
        <title>
          Kasa Location d appartements et de maisons entre particuliers
        </title>
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <FavoritesProvider>
          <Header />
          <main className="flex flex-1 max-w-280 m-auto w-full">
            {children}
          </main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
