import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IVA Chile",
  description:
    "Calcula el IVA del 19% en Chile. Agrega o quita IVA de un precio y obtén el precio neto, IVA y precio final.",
  keywords: [
    "calculadora de IVA",
    "calculadora IVA Chile",
    "IVA 19%",
    "calcular IVA",
    "quitar IVA",
    "agregar IVA",
    "precio con IVA",
    "precio sin IVA",
  ],
};

export default function IvaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}