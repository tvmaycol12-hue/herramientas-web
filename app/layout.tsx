import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://herramientasgratis.cl"),

  title: {
    default: "Herramientas Gratis | Calculadoras Online",
    template: "%s | Herramientas Gratis",
  },

  description:
    "Calculadoras online gratuitas, rápidas y fáciles de usar. Calcula porcentajes, descuentos, edad, IVA, préstamos y mucho más.",

  keywords: [
    "calculadora online",
    "calculadoras gratis",
    "herramientas online",
    "calculadora de porcentaje",
    "calculadora de descuento",
    "calculadora de edad",
    "calculadora de IVA",
    "calculadora de préstamos",
  ],

  authors: [
    {
      name: "Herramientas Gratis",
    },
  ],

  creator: "Herramientas Gratis",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Herramientas Gratis | Calculadoras Online",
    description:
      "Calculadoras online gratuitas, rápidas y fáciles de usar.",
    type: "website",
    locale: "es_CL",
    siteName: "Herramientas Gratis",
  },

  twitter: {
    card: "summary",
    title: "Herramientas Gratis | Calculadoras Online",
    description:
      "Calculadoras online gratuitas, rápidas y fáciles de usar.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CL"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}