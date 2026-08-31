"use client";

import { useState } from "react";

export default function PrestamosPage() {
  const [monto, setMonto] = useState("");
  const [tasa, setTasa] = useState("");
  const [meses, setMeses] = useState("");

  const [resultado, setResultado] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [intereses, setIntereses] = useState<number | null>(null);
  const [error, setError] = useState("");

  // -----------------------------------------
  // MONTO
  // -----------------------------------------

  // Convierte:
  // 5000000 -> 5.000.000
  // 100000000 -> 100.000.000
  function formatearMonto(valor: string) {
    const numeros = valor.replace(/\D/g, "");

    if (numeros === "") {
      return "";
    }

    return Number(numeros).toLocaleString("es-CL");
  }

  // Convierte:
  // 5.000.000 -> 5000000
  function convertirMonto(valor: string) {
    return Number(valor.replace(/\./g, "").replace(/\D/g, ""));
  }

  // -----------------------------------------
  // TASA
  // -----------------------------------------

  // Permite:
  // 12
  // 12.5
  // 12,5
  function convertirTasa(valor: string) {
    return Number(valor.replace(",", "."));
  }

  // -----------------------------------------
  // CALCULAR
  // -----------------------------------------

  function calcular() {
    setError("");
    setResultado(null);
    setTotal(null);
    setIntereses(null);

    const capital = convertirMonto(monto);
    const interesAnual = convertirTasa(tasa);
    const cantidadMeses = Number(meses);

    // Validar monto
    if (!monto || capital <= 0 || !Number.isFinite(capital)) {
      setError("Ingresa un monto de préstamo válido.");
      return;
    }

    // Validar tasa
    if (
      tasa === "" ||
      !Number.isFinite(interesAnual) ||
      interesAnual < 0
    ) {
      setError("Ingresa una tasa de interés válida.");
      return;
    }

    // Evitar tasas absurdamente altas
    if (interesAnual > 1000) {
      setError("Ingresa una tasa de interés razonable.");
      return;
    }

    // Validar meses
    if (
      meses === "" ||
      !Number.isFinite(cantidadMeses) ||
      cantidadMeses <= 0
    ) {
      setError("Ingresa un plazo válido en meses.");
      return;
    }

    // El plazo debe ser entero
    if (!Number.isInteger(cantidadMeses)) {
      setError("El plazo debe ser un número entero de meses.");
      return;
    }

    // -----------------------------------------
    // CÁLCULO
    // -----------------------------------------

    const interesMensual = interesAnual / 100 / 12;

    let cuota: number;

    if (interesMensual === 0) {
      // Préstamo sin intereses
      cuota = capital / cantidadMeses;
    } else {
      // Fórmula de cuota fija
      cuota =
        (capital * interesMensual) /
        (1 - Math.pow(1 + interesMensual, -cantidadMeses));
    }

    const totalPagado = cuota * cantidadMeses;
    const totalIntereses = totalPagado - capital;

    setResultado(cuota);
    setTotal(totalPagado);
    setIntereses(totalIntereses);
  }

  // -----------------------------------------
  // LIMPIAR
  // -----------------------------------------

  function limpiar() {
    setMonto("");
    setTasa("");
    setMeses("");
    setResultado(null);
    setTotal(null);
    setIntereses(null);
    setError("");
  }

  // -----------------------------------------
  // FORMATO DE DINERO
  // -----------------------------------------

  function moneda(valor: number) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(valor);
  }

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
            CALCULADORA FINANCIERA
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Calculadora de préstamos
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Calcula la cuota mensual, el total pagado y los
            intereses de un préstamo.
          </p>

        </div>

        {/* CALCULADORA */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold">
            Calcula tu préstamo
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Introduce los datos del préstamo para obtener una
            estimación.
          </p>

          {/* MONTO */}
          <div className="mt-6">

            <label
              htmlFor="monto"
              className="mb-2 block text-sm font-semibold"
            >
              Monto del préstamo
            </label>

            <div className="relative">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                $
              </span>

              <input
                id="monto"
                type="text"
                inputMode="numeric"
                value={monto}
                onChange={(e) => {
                  setMonto(formatearMonto(e.target.value));
                  setError("");
                }}
                placeholder="Ej: 5.000.000"
                className="w-full rounded-xl border py-3 pl-9 pr-4 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            <p className="mt-2 text-xs text-slate-400">
              Puedes escribir 5000000 y se mostrará como
              5.000.000.
            </p>

          </div>

          {/* TASA */}
          <div className="mt-5">

            <label
              htmlFor="tasa"
              className="mb-2 block text-sm font-semibold"
            >
              Tasa de interés anual
            </label>

            <div className="relative">

              <input
                id="tasa"
                type="text"
                inputMode="decimal"
                value={tasa}
                onChange={(e) => {
                  const valor = e.target.value;

                  // Permite números, un punto o una coma
                  if (/^[0-9]*([.,][0-9]*)?$/.test(valor)) {
                    setTasa(valor);
                    setError("");
                  }
                }}
                placeholder="Ej: 12 o 12,5"
                className="w-full rounded-xl border px-4 py-3 pr-10 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                %
              </span>

            </div>

            <p className="mt-2 text-xs text-slate-400">
              Puedes escribir 12,5 o 12.5.
            </p>

          </div>

          {/* PLAZO */}
          <div className="mt-5">

            <label
              htmlFor="meses"
              className="mb-2 block text-sm font-semibold"
            >
              Plazo del préstamo
            </label>

            <div className="relative">

              <input
                id="meses"
                type="number"
                min="1"
                step="1"
                value={meses}
                onChange={(e) => {
                  setMeses(e.target.value);
                  setError("");
                }}
                placeholder="Ej: 48"
                className="w-full rounded-xl border px-4 py-3 pr-24 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                meses
              </span>

            </div>

            <p className="mt-2 text-xs text-slate-400">
              Ejemplo: 12, 24, 36, 48 o 60 meses.
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* BOTONES */}
          <div className="mt-7 flex flex-wrap gap-3">

            <button
              onClick={calcular}
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Calcular préstamo
            </button>

            <button
              onClick={limpiar}
              className="rounded-xl border px-6 py-3 font-semibold transition hover:bg-slate-50"
            >
              Limpiar
            </button>

          </div>

          {/* RESULTADO */}
          {resultado !== null && (
            <div className="mt-8">

              {/* CUOTA */}
              <div className="rounded-2xl bg-slate-900 p-6 text-white">

                <p className="text-sm text-slate-300">
                  Cuota mensual estimada
                </p>

                <p className="mt-2 text-4xl font-bold sm:text-5xl">
                  {moneda(resultado)}
                </p>

              </div>

              {/* DETALLES */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border bg-slate-50 p-5">

                  <p className="text-sm text-slate-500">
                    Total pagado
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {total !== null ? moneda(total) : ""}
                  </p>

                </div>

                <div className="rounded-2xl border bg-slate-50 p-5">

                  <p className="text-sm text-slate-500">
                    Total de intereses
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {intereses !== null
                      ? moneda(intereses)
                      : ""}
                  </p>

                </div>

              </div>

              {/* RESUMEN */}
              <div className="mt-5 rounded-2xl border bg-white p-5">

                <h3 className="font-semibold">
                  Resumen del préstamo
                </h3>

                <div className="mt-4 space-y-3 text-sm">

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">
                      Monto solicitado
                    </span>

                    <span className="font-semibold">
                      {moneda(convertirMonto(monto))}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">
                      Tasa anual
                    </span>

                    <span className="font-semibold">
                      {tasa}%
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">
                      Plazo
                    </span>

                    <span className="font-semibold">
                      {meses} meses
                    </span>
                  </div>

                </div>

              </div>

              {/* AVISO */}
              <div className="mt-5 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">

                <strong>Importante:</strong> este resultado es
                una estimación matemática. El valor real de un
                crédito puede variar debido a seguros, comisiones,
                impuestos, gastos y otras condiciones del préstamo.

              </div>

            </div>
          )}

        </section>

        {/* EXPLICACIÓN */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold">
            ¿Cómo se calcula un préstamo?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            La cuota mensual de un préstamo depende principalmente
            del monto solicitado, la tasa de interés y el plazo.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Cuando aumentas el plazo, normalmente la cuota mensual
            disminuye, pero puedes terminar pagando más intereses.
          </p>

          <div className="mt-6 rounded-xl bg-slate-100 p-5">

            <p className="font-mono text-sm">
              Cuota = P × r ÷ (1 − (1 + r)^−n)
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              P = monto del préstamo
              <br />
              r = tasa de interés mensual
              <br />
              n = cantidad de cuotas
            </p>

          </div>

        </section>

        {/* EJEMPLO */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold">
            Ejemplo
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Imagina que solicitas un préstamo de $5.000.000,
            con una tasa anual del 12% y un plazo de 48 meses.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">
                Monto
              </p>

              <p className="mt-1 font-bold">
                $5.000.000
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">
                Tasa
              </p>

              <p className="mt-1 font-bold">
                12% anual
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 p-4">
              <p className="text-sm text-slate-500">
                Plazo
              </p>

              <p className="mt-1 font-bold">
                48 meses
              </p>
            </div>

          </div>

        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-bold">
            Preguntas frecuentes
          </h2>

          <div className="mt-6 space-y-6">

            <div>
              <h3 className="font-semibold">
                ¿Puedo poner un préstamo de $100.000.000?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                Sí. Puedes introducir montos grandes, por ejemplo
                100.000.000. La calculadora los convertirá
                automáticamente.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                ¿Qué pasa si la tasa es 0%?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                La calculadora simplemente divide el monto del
                préstamo entre la cantidad de meses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                ¿Puedo escribir 12,5%?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                Sí. Puedes escribir la tasa utilizando coma o punto,
                por ejemplo 12,5 o 12.5.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                ¿El resultado es exactamente lo que cobrará un banco?
              </h3>

              <p className="mt-2 leading-6 text-slate-600">
                No necesariamente. Es una estimación matemática y
                no contempla todos los posibles cargos de una
                institución financiera.
              </p>
            </div>

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
            href="/descuento"
            className="font-medium text-blue-600 hover:underline"
          >
            Calculadora de descuento
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