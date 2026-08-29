import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Porcentaje Online",
  description:
    "Calcula porcentajes de forma rápida y sencilla. Descubre cuánto es un porcentaje de un número, qué porcentaje representa y calcula aumentos y descuentos.",
  keywords: [
    "calculadora de porcentaje",
    "calculadora porcentajes",
    "calcular porcentaje",
    "porcentaje de un número",
    "qué porcentaje es",
    "aumento porcentual",
    "descuento porcentual",
  ],
};

export default function PorcentajeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}