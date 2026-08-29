import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Edad Exacta Online",
  description:
    "Calcula tu edad exacta a partir de tu fecha de nacimiento. Descubre cuántos años, meses y días tienes de forma rápida y sencilla.",
  keywords: [
    "calculadora de edad",
    "calcular edad",
    "edad exacta",
    "calculadora edad exacta",
    "cuántos años tengo",
    "calcular edad por fecha de nacimiento",
    "calculadora fecha de nacimiento",
  ],
};

export default function EdadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}