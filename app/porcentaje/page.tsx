"use client";

import { useState } from "react";

type Modo = "porcentaje" | "quePorcentaje" | "aumento" | "descuento";

export default function PorcentajePage() {
  const [modo, setModo] = useState<Modo>("porcentaje");
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [copiado, setCopiado] = useState(false);

  // Convierte números escritos en formato chileno/internacional.
  //
  // Ejemplos:
  // 10000       -> 10000
  // 10.000      -> 10000
  // 1.500.000   -> 1500000
  // 10,5        -> 10.5
  // 10.50       -> 10.5
  // 1000.50     -> 1000.5
  const convertirNumero = (valor: string): number => {
    if (!valor.trim()) return 0;

    let limpio = valor.trim().replace(/\s/g, "");

    // Si tiene coma, la coma se considera decimal.
    if (limpio.includes(",")) {
      limpio = limpio.replace(/\./g, "").replace(",", ".");
      return Number(limpio);
    }

    // Si tiene más de un punto, se consideran separadores de miles.
    const cantidadPuntos = (limpio.match(/\./g) || []).length;

    if (cantidadPuntos > 1) {
      limpio = limpio.replace(/\./g, "");
      return Number(limpio);
    }

    // Si tiene un solo punto:
    // 10.5 -> decimal
    // 1000.5 -> decimal
    // 10.000 -> miles
    if (cantidadPuntos === 1) {
      const partes = limpio.split(".");

      if (partes[1]?.length === 3 && partes[0].length >= 1) {
        limpio = limpio.replace(".", "");
      }
    }

    return Number(limpio);
  };

  const n1 = convertirNumero(numero1);
  const n2 = convertirNumero(numero2);

  let resultado: number | null = null;
  let explicacion = "";

  if (
    numero1 !== "" &&
    numero2 !== "" &&
    Number.isFinite(n1) &&
    Number.isFinite(n2)
  ) {
    switch (modo) {
      case "porcentaje":
        resultado = (n1 * n2) / 100;

        explicacion = `${formatoNumero(n2)}% de ${formatoNumero(
          n1
        )} es ${formatoNumero(resultado)}`;
        break;

      case "quePorcentaje":
        if (n2 !== 0) {
          resultado = (n1 / n2) * 100;

          explicacion = `${formatoNumero(
            n1
          )} representa el ${resultado.toFixed(2)}% de ${formatoNumero(n2)}`;
        }
        break;

      case "aumento":
        resultado = n1 + (n1 * n2) / 100;

        explicacion = `${formatoNumero(
          n1
        )} aumentado en ${formatoNumero(n2)}% es ${formatoNumero(resultado)}`;
        break;

      case "descuento":
        resultado = n1 - (n1 * n2) / 100;

        explicacion = `${formatoNumero(
          n1
        )} con un descuento de ${formatoNumero(
          n2
        )}% es ${formatoNumero(resultado)}`;
        break;
    }
  }

  function formatoNumero(numero: number): string {
    return numero.toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  }

  const copiarResultado = async () => {
    if (resultado === null) return;

    try {
      await navigator.clipboard.writeText(String(resultado));

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch {
      setCopiado(false);
    }
  };

  const limpiar = () => {
    setNumero1("");
    setNumero2("");
    setCopiado(false);
  };

  const cambiarModo = (nuevoModo: Modo) => {
    setModo(nuevoModo);
    limpiar();
  };

  const manejarNumero = (
    valor: string,
    setter: (valor: string) => void
  ) => {
    // CORREGIDO:
    // Antes estaba mal escrito como /^[0-9.,]\*$/
    if (/^[0-9.,]*$/.test(valor)) {
      setter(valor);
      setCopiado(false);
    }
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
          <a
            href="/"
            className="text-xl font-bold tracking-tight hover:text-blue-600"
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
        {/* INTRODUCCIÓN */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
            CALCULADORA ONLINE
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Calculadora de porcentaje
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Calcula porcentajes, aumentos, descuentos y descubre qué
            porcentaje representa un número de forma rápida y gratuita.
          </p>
        </div>

        {/* CALCULADORA */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          {/* MODOS */}
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => cambiarModo("porcentaje")}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "porcentaje"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">X% de un número</div>

              <div className="mt-1 text-sm text-slate-500">
                Ej: 20% de 10.000
              </div>
            </button>

            <button
              type="button"
              onClick={() => cambiarModo("quePorcentaje")}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "quePorcentaje"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">¿Qué porcentaje es?</div>

              <div className="mt-1 text-sm text-slate-500">
                Ej: 1.000 de 10.000
              </div>
            </button>

            <button
              type="button"
              onClick={() => cambiarModo("aumento")}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "aumento"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">Aumentar porcentaje</div>

              <div className="mt-1 text-sm text-slate-500">
                Ej: 10.000 + 20%
              </div>
            </button>

            <button
              type="button"
              onClick={() => cambiarModo("descuento")}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "descuento"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">Aplicar descuento</div>

              <div className="mt-1 text-sm text-slate-500">
                Ej: 10.000 - 20%
              </div>
            </button>
          </div>

          {/* TÍTULO */}
          <div className="mt-8">
            <h2 className="text-xl font-bold">{titulo[modo]}</h2>
          </div>

          {/* CAMPOS */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {/* PRIMER CAMPO */}
            <div>
              <label
                htmlFor="numero1"
                className="mb-2 block text-sm font-semibold"
              >
                {etiqueta1[modo]}
              </label>

              <input
                id="numero1"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={numero1}
                onChange={(e) =>
                  manejarNumero(e.target.value, setNumero1)
                }
                placeholder={
                  modo === "porcentaje"
                    ? "Ej: 10.000"
                    : modo === "quePorcentaje"
                    ? "Ej: 1.000"
                    : "Ej: 10.000"
                }
                className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-2 text-sm text-slate-500">
                Puedes escribir 10000, 10.000 o 10,5.
              </p>
            </div>

            {/* SEGUNDO CAMPO */}
            <div>
              <label
                htmlFor="numero2"
                className="mb-2 block text-sm font-semibold"
              >
                {etiqueta2[modo]}
              </label>

              <input
                id="numero2"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={numero2}
                onChange={(e) =>
                  manejarNumero(e.target.value, setNumero2)
                }
                placeholder={
                  modo === "porcentaje"
                    ? "Ej: 20"
                    : modo === "quePorcentaje"
                    ? "Ej: 10.000"
                    : "Ej: 20"
                }
                className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <p className="mt-2 text-sm text-slate-500">
                Puedes utilizar coma o punto para decimales.
              </p>
            </div>
          </div>

          {/* BOTÓN LIMPIAR */}
          <div className="mt-6">
            <button
              type="button"
              onClick={limpiar}
              className="rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-50"
            >
              Limpiar
            </button>
          </div>

          {/* RESULTADO */}
          {resultado !== null && Number.isFinite(resultado) && (
            <div className="mt-8">
              <div className="rounded-2xl bg-slate-900 p-6 text-white">
                <p className="text-sm text-slate-300">Resultado</p>

                <p className="mt-2 break-words text-4xl font-bold sm:text-5xl">
                  {formatoNumero(resultado)}
                </p>

                <p className="mt-4 text-sm leading-6 text-slate-300">
                  {explicacion}
                </p>

                <button
                  type="button"
                  onClick={copiarResultado}
                  className="mt-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  {copiado ? "✓ Copiado" : "Copiar resultado"}
                </button>
              </div>

              {/* DETALLE */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border p-5">
                  <p className="text-sm text-slate-500">
                    Primer valor
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {formatoNumero(n1)}
                  </p>
                </div>

                <div className="rounded-xl border p-5">
                  <p className="text-sm text-slate-500">
                    Segundo valor
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {formatoNumero(n2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* EXPLICACIÓN */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            ¿Cómo calcular un porcentaje?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Para calcular un porcentaje de un número, multiplica el
            número por el porcentaje y divide el resultado entre 100.
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            número × porcentaje ÷ 100
          </div>

          <p className="mt-5 leading-7 text-slate-600">
            Por ejemplo, para calcular el 20% de 10.000:
          </p>

          <div className="mt-3 rounded-xl bg-slate-100 p-4 font-mono">
            10.000 × 20 ÷ 100 = 2.000
          </div>

          <p className="mt-5 leading-7 text-slate-600">
            Por lo tanto, el 20% de 10.000 es 2.000.
          </p>
        </section>

        {/* EJEMPLOS */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Ejemplos de porcentajes
          </h2>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">¿Cuánto es el 15% de 20.000?</p>
              <p className="mt-2 text-slate-600">
                20.000 × 15 ÷ 100 = 3.000
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">
                ¿Qué porcentaje representa 2.000 de 10.000?
              </p>
              <p className="mt-2 text-slate-600">
                2.000 ÷ 10.000 × 100 = 20%
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="font-semibold">
                ¿Cuánto queda después de aplicar un 20% de descuento a
                $50.000?
              </p>
              <p className="mt-2 text-slate-600">
                $50.000 − 20% = $40.000
              </p>
            </div>
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Preguntas frecuentes
          </h2>

          <div className="mt-6 space-y-6">
            <div>
              <h3 className="font-semibold">
                ¿Cómo calcular el porcentaje de un número?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                Multiplica el número por el porcentaje y divide el
                resultado entre 100. También puedes utilizar nuestra
                calculadora para obtener el resultado automáticamente.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                ¿Cómo calcular qué porcentaje representa un número?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                Divide el número entre el total y multiplica el resultado
                por 100.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                ¿Puedo utilizar números con decimales?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                Sí. Puedes escribir decimales utilizando coma o punto,
                por ejemplo 10,5 o 10.5.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                ¿Puedo escribir números grandes?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                Sí. Puedes introducir números como 1000000 o 1.000.000.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                ¿La calculadora es gratuita?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                Sí. Puedes utilizar esta calculadora de porcentaje
                gratuitamente desde tu computador o teléfono.
              </p>
            </div>
          </div>
        </section>

        {/* OTRAS HERRAMIENTAS */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Otras calculadoras
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            También puedes utilizar nuestras otras calculadoras online
            gratuitas.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              href="/descuento"
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <div className="font-semibold">
                🏷️ Calculadora de descuentos
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Calcula descuentos y precios finales.
              </div>
            </a>

            <a
              href="/iva"
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <div className="font-semibold">
                🧾 Calculadora de IVA
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Agrega o quita IVA de un precio.
              </div>
            </a>

            <a
              href="/edad"
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              <div className="font-semibold">
                🎂 Calculadora de edad
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Calcula tu edad exacta.
              </div>
            </a>

            <a
              href="/prestamos"
              className="rounded-xl border p-4 transition hover:bg-slate-50 sm:col-span-2"
            >
              <div className="font-semibold">
                💰 Calculadora de préstamos
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Calcula cuotas y costos de un préstamo.
              </div>
            </a>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="mt-10 border-t bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
            <a
              href="/privacidad"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Política de privacidad
            </a>

            <a
              href="/terminos"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Términos y condiciones
            </a>

            <a
              href="/contacto"
              className="text-slate-500 transition hover:text-blue-600"
            >
              Contacto
            </a>
          </div>

          <p className="mt-5 text-center text-sm text-slate-500">
            Herramientas Gratis — herramientas online gratuitas.
          </p>
        </div>
      </footer>
    </main>
  );
}