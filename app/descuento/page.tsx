"use client";

import { useState } from "react";

export default function DescuentoPage() {
  const [precio, setPrecio] = useState("");
  const [descuento, setDescuento] = useState("");
  const [copiado, setCopiado] = useState(false);

  // Convierte:
  // 10.000 -> 10000
  // 100.000 -> 100000
  // 1.500.000 -> 1500000
  const convertirNumero = (valor: string) => {
    const limpio = valor.replace(/\./g, "").replace(/,/g, ".");
    return Number(limpio);
  };

  const precioNumero = convertirNumero(precio);
  const descuentoNumero = convertirNumero(descuento);

  let montoDescuento = 0;
  let precioFinal = 0;

  if (
    precio !== "" &&
    descuento !== "" &&
    !isNaN(precioNumero) &&
    !isNaN(descuentoNumero) &&
    descuentoNumero >= 0
  ) {
    montoDescuento =
      precioNumero * (descuentoNumero / 100);

    precioFinal =
      precioNumero - montoDescuento;
  }

  const hayResultado =
    precio !== "" &&
    descuento !== "" &&
    !isNaN(precioNumero) &&
    !isNaN(descuentoNumero) &&
    descuentoNumero >= 0;

  const formatoPesos = (numero: number) => {
    return numero.toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const copiarResultado = async () => {
    if (!hayResultado) return;

    await navigator.clipboard.writeText(
      `$${formatoPesos(precioFinal)}`
    );

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
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
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
            Calculadora de descuentos
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Calcula cuánto dinero ahorras y cuál será el precio
            final después de aplicar un descuento.
          </p>

        </div>

        {/* CALCULADORA */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Calcula tu descuento
          </h2>

          {/* PRECIO */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-semibold">
              Precio original
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-500">
                $
              </span>

              <input
                type="text"
                inputMode="decimal"
                value={precio}
                onChange={(e) => {
                  const valor = e.target.value;

                  if (/^[0-9.,]*$/.test(valor)) {
                    setPrecio(valor);
                    setCopiado(false);
                  }
                }}
                placeholder="Ej: 10.000"
                className="w-full rounded-xl border py-3 pl-9 pr-4 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <p className="mt-2 text-sm text-slate-500">
              Puedes escribir valores como 10.000 o 100000.
            </p>

          </div>

          {/* DESCUENTO */}
          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold">
              Porcentaje de descuento
            </label>

            <div className="relative">

              <input
                type="text"
                inputMode="decimal"
                value={descuento}
                onChange={(e) => {
                  const valor = e.target.value;

                  if (/^[0-9.,]*$/.test(valor)) {
                    setDescuento(valor);
                    setCopiado(false);
                  }
                }}
                placeholder="Ej: 20"
                className="w-full rounded-xl border px-4 py-3 pr-12 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-500">
                %
              </span>

            </div>

          </div>

          {/* BOTÓN LIMPIAR */}
          <div className="mt-6">

            <button
              onClick={limpiar}
              className="rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-50"
            >
              Limpiar
            </button>

          </div>

          {/* RESULTADO */}
          {hayResultado && (
            <div className="mt-8">

              <div className="rounded-2xl bg-slate-900 p-6 text-white">

                <p className="text-sm text-slate-300">
                  Precio final
                </p>

                <p className="mt-2 text-4xl font-bold sm:text-5xl">
                  ${formatoPesos(precioFinal)}
                </p>

                <p className="mt-4 text-sm text-slate-300">
                  Ahorras: ${formatoPesos(montoDescuento)}
                </p>

                <button
                  onClick={copiarResultado}
                  className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  {copiado
                    ? "✓ Copiado"
                    : "Copiar resultado"}
                </button>

              </div>

              {/* DETALLE */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Precio original
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    ${formatoPesos(precioNumero)}
                  </p>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Descuento ({descuentoNumero}%)
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    ${formatoPesos(montoDescuento)}
                  </p>

                </div>

                <div className="rounded-xl border p-5 sm:col-span-2">

                  <p className="text-sm text-slate-500">
                    Precio final
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    ${formatoPesos(precioFinal)}
                  </p>

                </div>

              </div>

            </div>
          )}

        </section>

        {/* EXPLICACIÓN */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            ¿Cómo calcular un descuento?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Para calcular cuánto dinero corresponde al descuento,
            multiplica el precio original por el porcentaje de
            descuento y divide el resultado entre 100.
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            Descuento = precio × porcentaje ÷ 100
          </div>

          <div className="mt-4 rounded-xl bg-slate-100 p-4 font-mono">
            Precio final = precio − descuento
          </div>

        </section>

        {/* EJEMPLO */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Ejemplo: 20% de descuento en $10.000
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Si un producto cuesta $10.000 y tiene un descuento
            del 20%, ahorrarás $2.000 y pagarás $8.000.
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            $10.000 × 20% = $2.000
          </div>

          <div className="mt-4 rounded-xl bg-slate-100 p-4 font-mono">
            $10.000 − $2.000 = $8.000
          </div>

        </section>

        {/* ENLACES */}
        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm">

          <a
            href="/porcentaje"
            className="font-medium text-blue-600 hover:underline"
          >
            Calculadora de porcentaje
          </a>

          <a
            href="/iva"
            className="font-medium text-blue-600 hover:underline"
          >
            Calculadora de IVA
          </a>

          <a
            href="/edad"
            className="font-medium text-blue-600 hover:underline"
          >
            Calculadora de edad
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