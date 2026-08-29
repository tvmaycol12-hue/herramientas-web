"use client";

import { useState } from "react";

type Modo = "porcentaje" | "quePorcentaje" | "aumento" | "descuento";

export default function PorcentajePage() {
  const [modo, setModo] = useState<Modo>("porcentaje");
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [copiado, setCopiado] = useState(false);

  const n1 = Number(numero1);
  const n2 = Number(numero2);

  let resultado: number | null = null;
  let explicacion = "";

  if (numero1 !== "" && numero2 !== "") {
    switch (modo) {
      case "porcentaje":
        resultado = (n1 * n2) / 100;
        explicacion = `${n2}% de ${n1} es ${resultado}`;
        break;

      case "quePorcentaje":
        if (n2 !== 0) {
          resultado = (n1 / n2) * 100;
          explicacion = `${n1} representa el ${resultado.toFixed(2)}% de ${n2}`;
        }
        break;

      case "aumento":
        resultado = n1 + (n1 * n2) / 100;
        explicacion = `${n1} aumentado en ${n2}% es ${resultado}`;
        break;

      case "descuento":
        resultado = n1 - (n1 * n2) / 100;
        explicacion = `${n1} con un descuento de ${n2}% es ${resultado}`;
        break;
    }
  }

  const copiarResultado = async () => {
    if (resultado === null) return;

    await navigator.clipboard.writeText(String(resultado));
    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
  };

  const limpiar = () => {
    setNumero1("");
    setNumero2("");
    setCopiado(false);
  };

  const titulo = {
    porcentaje: "¿Cuánto es un porcentaje de un número?",
    quePorcentaje: "¿Qué porcentaje representa un número?",
    aumento: "Aumentar un número en un porcentaje",
    descuento: "Aplicar un descuento",
  };

  const etiqueta1 = {
    porcentaje: "Número",
    quePorcentaje: "Número",
    aumento: "Precio o número original",
    descuento: "Precio o número original",
  };

  const etiqueta2 = {
    porcentaje: "Porcentaje",
    quePorcentaje: "Número total",
    aumento: "Porcentaje de aumento",
    descuento: "Porcentaje de descuento",
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="/" className="text-xl font-bold">
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
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            CALCULADORA
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Calculadora de porcentaje
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Calcula porcentajes, aumentos, descuentos y descubre qué
            porcentaje representa un número.
          </p>
        </div>

        {/* CALCULADORA */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          {/* MODOS */}
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              onClick={() => {
                setModo("porcentaje");
                limpiar();
              }}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "porcentaje"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">
                X% de un número
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Ej: 20% de 500
              </div>
            </button>

            <button
              onClick={() => {
                setModo("quePorcentaje");
                limpiar();
              }}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "quePorcentaje"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">
                ¿Qué porcentaje es?
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Ej: 100 de 500
              </div>
            </button>

            <button
              onClick={() => {
                setModo("aumento");
                limpiar();
              }}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "aumento"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">
                Aumentar porcentaje
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Ej: 500 + 20%
              </div>
            </button>

            <button
              onClick={() => {
                setModo("descuento");
                limpiar();
              }}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "descuento"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">
                Aplicar descuento
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Ej: 500 - 20%
              </div>
            </button>
          </div>

          {/* TÍTULO DEL CÁLCULO */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">
              {titulo[modo]}
            </h2>
          </div>

          {/* CAMPOS */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                {etiqueta1[modo]}
              </label>

              <input
                type="number"
                value={numero1}
                onChange={(e) => setNumero1(e.target.value)}
                placeholder="Ej: 500"
                className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                {etiqueta2[modo]}
              </label>

              <input
                type="number"
                value={numero2}
                onChange={(e) => setNumero2(e.target.value)}
                placeholder="Ej: 20"
                className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* BOTONES */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={limpiar}
              className="rounded-xl border px-5 py-3 font-medium hover:bg-slate-50"
            >
              Limpiar
            </button>
          </div>

          {/* RESULTADO */}
          {resultado !== null && (
            <div className="mt-8 rounded-2xl bg-slate-900 p-6 text-white">
              <p className="text-sm text-slate-300">
                Resultado
              </p>

              <p className="mt-2 break-words text-4xl font-bold sm:text-5xl">
                {Number.isInteger(resultado)
                  ? resultado
                  : resultado.toFixed(2)}
              </p>

              <p className="mt-4 text-sm text-slate-300">
                {explicacion}
              </p>

              <button
                onClick={copiarResultado}
                className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                {copiado ? "✓ Copiado" : "Copiar resultado"}
              </button>
            </div>
          )}
        </section>

        {/* EXPLICACIÓN */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            ¿Cómo calcular porcentajes?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Para calcular un porcentaje de un número, multiplica el número
            por el porcentaje y divide el resultado entre 100.
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            número × porcentaje ÷ 100
          </div>

          <p className="mt-5 leading-7 text-slate-600">
            Por ejemplo, para calcular el 20% de 500:
          </p>

          <div className="mt-3 rounded-xl bg-slate-100 p-4 font-mono">
            500 × 20 ÷ 100 = 100
          </div>
        </section>

        {/* FUTURAS HERRAMIENTAS */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Más herramientas próximamente
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              🧮 Calculadora de descuentos
            </div>

            <div className="rounded-xl border p-4">
              💰 Calculadora de sueldo
            </div>

            <div className="rounded-xl border p-4">
              📅 Calculadora de fechas
            </div>

            <div className="rounded-xl border p-4">
              🔄 Conversor de unidades
            </div>
          </div>
        </section>
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