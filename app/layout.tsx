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
  title: {
    default: "Herramientas Gratis | Calculadoras Online",
    template: "%s | Herramientas Gratis",
  },

  description:
    "Calculadoras y herramientas online gratuitas para porcentajes, descuentos, edad, IVA, préstamos y mucho más.",

  keywords: [
    "calculadora online",
    "calculadoras gratis",
    "calculadora de porcentaje",
    "calculadora de descuento",
    "calculadora de edad",
    "calculadora de IVA",
    "calculadora de préstamos",
    "herramientas online",
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
      "Calculadoras y herramientas online gratuitas, rápidas y fáciles de usar.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6639069224961716"
          crossOrigin="anonymous"
        />
      </head>

      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}