"use client";

import { useState } from "react";

export default function DescuentoPage() {
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("");
  const [copiado, setCopiado] = useState(false);

  const precioNumero = Number(precio);
  const descuentoNumero = Number(descuento);

  let ahorro: number | null = null;
  let precioFinal: number | null = null;

  if (
    precio !== "" &&
    descuento !== "" &&
    precioNumero >= 0 &&
    descuentoNumero >= 0
  ) {
    ahorro = (precioNumero * descuentoNumero) / 100;
    precioFinal = precioNumero - ahorro;
  }

  const formatearNumero = (numero: number) => {
    return new Intl.NumberFormat("es-CL", {
      maximumFractionDigits: 2,
    }).format(numero);
  };

  const copiarResultado = async () => {
    if (precioFinal === null) return;

    const texto = `Precio original: ${formatearNumero(
      precioNumero
    )}\nDescuento: ${formatearNumero(
      descuentoNumero
    )}%\nAhorras: ${formatearNumero(
      ahorro ?? 0
    )}\nPrecio final: ${formatearNumero(precioFinal)}`;

    await navigator.clipboard.writeText(texto);

    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  };

  const limpiar = () => {
    setPrecio("");
    setDescuento("");
    setCopiado(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">

          <a
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            Herramientas Gratis
          </a>

          <a
            href="/"
            className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            ← Inicio
          </a>

        </div>
      </header>

      {/* CONTENIDO */}
      <div className="mx-auto max-w-3xl px-5 py-10">

        {/* TÍTULO */}
        <div className="mb-8">

          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            CALCULADORA
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Calculadora de descuento
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Calcula cuánto dinero ahorrarás y cuál será el precio final
            después de aplicar un descuento.
          </p>

        </div>

        {/* CALCULADORA */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Calcula tu descuento
          </h2>

          {/* CAMPOS */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            {/* PRECIO */}
            <div>

              <label className="mb-2 block text-sm font-semibold">
                Precio original
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  $
                </span>

                <input
                  type="number"
                  min="0"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  placeholder="Ej: 50000"
                  className="w-full rounded-xl border py-3 pl-9 pr-4 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* DESCUENTO */}
            <div>

              <label className="mb-2 block text-sm font-semibold">
                Porcentaje de descuento
              </label>

              <div className="relative">

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={descuento}
                  onChange={(e) => setDescuento(e.target.value)}
                  placeholder="Ej: 20"
                  className="w-full rounded-xl border px-4 py-3 pr-10 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                  %
                </span>

              </div>

            </div>

          </div>

          {/* BOTÓN LIMPIAR */}
          <button
            onClick={limpiar}
            className="mt-6 rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-50"
          >
            Limpiar
          </button>

          {/* RESULTADO */}
          {precioFinal !== null && ahorro !== null && (
            <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">

              <p className="text-sm text-slate-300">
                Precio final
              </p>

              <p className="mt-2 text-4xl font-bold sm:text-5xl">
                ${formatearNumero(precioFinal)}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-white/10 p-4">

                  <p className="text-sm text-slate-300">
                    Precio original
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    ${formatearNumero(precioNumero)}
                  </p>

                </div>

                <div className="rounded-xl bg-white/10 p-4">

                  <p className="text-sm text-slate-300">
                    Ahorras
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    ${formatearNumero(ahorro)}
                  </p>

                </div>

              </div>

              <button
                onClick={copiarResultado}
                className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                {copiado ? "✓ Resultado copiado" : "Copiar resultado"}
              </button>

            </div>
          )}

        </section>

        {/* EJEMPLOS */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Ejemplo de cálculo
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Si un producto cuesta $50.000 y tiene un descuento del 20%:
          </p>

          <div className="mt-5 space-y-3">

            <div className="rounded-xl bg-slate-100 p-4 font-mono">
              Descuento: $50.000 × 20% = $10.000
            </div>

            <div className="rounded-xl bg-slate-100 p-4 font-mono">
              Precio final: $50.000 − $10.000 = $40.000
            </div>

          </div>

        </section>

        {/* PREGUNTAS */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            ¿Cómo calcular un descuento?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Para calcular cuánto representa un descuento, multiplica el
            precio original por el porcentaje de descuento y divide entre
            100.
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            Precio × descuento ÷ 100 = ahorro
          </div>

          <p className="mt-5 leading-7 text-slate-600">
            Después, resta el ahorro al precio original para obtener el
            precio final.
          </p>

          <div className="mt-3 rounded-xl bg-slate-100 p-4 font-mono">
            Precio original − ahorro = precio final
          </div>

        </section>

        {/* VOLVER */}
        <div className="mt-8 text-center">

          <a
            href="/"
            className="font-medium text-blue-600 hover:underline"
          >
            ← Ver todas las herramientas
          </a>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="mt-10 border-t bg-white">

        <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm text-slate-500">
          Herramientas Gratis · Herramientas online gratuitas
        </div>

      </footer>

    </main>
  );
}