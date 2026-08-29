import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Descuento Online",
  description:
    "Calcula descuentos de forma rápida y sencilla. Descubre cuánto ahorrarás y cuál será el precio final después de aplicar un descuento.",
  keywords: [
    "calculadora de descuento",
    "calcular descuento",
    "descuento porcentaje",
    "precio con descuento",
    "cuánto ahorro con descuento",
    "calcular precio final",
    "calculadora de ofertas",
  ],
};

export default function DescuentoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}   