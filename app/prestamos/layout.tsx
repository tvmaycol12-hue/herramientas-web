import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Préstamos Online",
  description:
    "Calcula las cuotas, intereses y el costo total de un préstamo. Simula fácilmente cuánto pagarás por tu préstamo.",
  keywords: [
    "calculadora de préstamos",
    "calcular préstamo",
    "cuota de préstamo",
    "calculadora de cuotas",
    "intereses de préstamo",
    "simulador de préstamo",
    "préstamo online",
  ],
};

export default function PrestamosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}