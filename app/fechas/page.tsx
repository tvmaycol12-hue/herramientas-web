"use client";

import { useState } from "react";

export default function FechasPage() {
  const hoy = new Date();

  const fechaHoy = hoy.toISOString().split("T")[0];

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [copiado, setCopiado] = useState(false);

  let diferenciaDias: number | null = null;
  let semanas = 0;
  let diasRestantes = 0;
  let mesesAproximados = 0;

  if (fechaInicio && fechaFin) {
    const inicio = new Date(`${fechaInicio}T00:00:00`);
    const fin = new Date(`${fechaFin}T00:00:00`);

    const diferencia =
      fin.getTime() - inicio.getTime();

    diferenciaDias = Math.round(
      diferencia / (1000 * 60 * 60 * 24)
    );

    if (diferenciaDias >= 0) {
      semanas = Math.floor(diferenciaDias / 7);
      diasRestantes = diferenciaDias % 7;
      mesesAproximados = Math.floor(
        diferenciaDias / 30.44
      );
    }
  }

  const hayResultado =
    diferenciaDias !== null &&
    diferenciaDias >= 0;

  const limpiar = () => {
    setFechaInicio("");
    setFechaFin("");
    setCopiado(false);
  };

  const copiarResultado = async () => {
    if (!hayResultado) return;

    const texto =
      `${diferenciaDias} días, ` +
      `${semanas} semanas y ${diasRestantes} días.`;

    await navigator.clipboard.writeText(texto);

    setCopiado(true);

    setTimeout(() => {
      setCopiado(false);
    }, 2000);
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
            CALCULADORA DE FECHAS
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Calculadora de días entre fechas
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Calcula cuántos días hay entre dos fechas de forma
            rápida y sencilla.
          </p>

        </div>

        {/* CALCULADORA */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Calcula la diferencia entre dos fechas
          </h2>

          {/* FECHAS */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">

            {/* FECHA INICIAL */}
            <div>

              <label className="mb-2 block text-sm font-semibold">
                Fecha inicial
              </label>

              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => {
                  setFechaInicio(e.target.value);
                  setCopiado(false);
                }}
                className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* FECHA FINAL */}
            <div>

              <label className="mb-2 block text-sm font-semibold">
                Fecha final
              </label>

              <input
                type="date"
                value={fechaFin}
                onChange={(e) => {
                  setFechaFin(e.target.value);
                  setCopiado(false);
                }}
                className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* BOTONES */}
          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={limpiar}
              className="rounded-xl border px-5 py-3 font-medium transition hover:bg-slate-50"
            >
              Limpiar
            </button>

            <button
              onClick={() => {
                setFechaInicio(fechaHoy);
                setFechaFin(fechaHoy);
              }}
              className="rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700"
            >
              Usar hoy
            </button>

          </div>

          {/* ERROR */}
          {fechaInicio &&
            fechaFin &&
            diferenciaDias !== null &&
            diferenciaDias < 0 && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                La fecha final debe ser igual o posterior a
                la fecha inicial.
              </div>
            )}

          {/* RESULTADO */}
          {hayResultado && (
            <div className="mt-8">

              <div className="rounded-2xl bg-slate-900 p-6 text-white">

                <p className="text-sm text-slate-300">
                  Diferencia entre las fechas
                </p>

                <p className="mt-2 text-4xl font-bold sm:text-5xl">
                  {diferenciaDias}{" "}
                  {diferenciaDias === 1 ? "día" : "días"}
                </p>

                <p className="mt-4 text-sm text-slate-300">
                  {semanas}{" "}
                  {semanas === 1 ? "semana" : "semanas"} y{" "}
                  {diasRestantes}{" "}
                  {diasRestantes === 1 ? "día" : "días"}
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

              {/* DATOS */}
              <div className="mt-5 grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Días
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {diferenciaDias}
                  </p>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Semanas
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {semanas}
                  </p>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Meses aprox.
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {mesesAproximados}
                  </p>

                </div>

              </div>

            </div>
          )}

        </section>

        {/* EXPLICACIÓN */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            ¿Cómo calcular los días entre dos fechas?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Para conocer cuántos días existen entre dos fechas,
            se calcula la diferencia de tiempo entre ambas fechas.
            Nuestra calculadora realiza este cálculo
            automáticamente.
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            Fecha final − Fecha inicial = días de diferencia
          </div>

        </section>

        {/* EJEMPLO */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Ejemplo
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Si quieres saber cuántos días hay entre el 1 de enero
            y el 10 de enero:
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            10 de enero − 1 de enero = 9 días
          </div>

        </section>

        {/* OTRAS HERRAMIENTAS */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            Otras herramientas
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">

            <a
              href="/edad"
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              🎂 Calculadora de edad
            </a>

            <a
              href="/porcentaje"
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              🧮 Calculadora de porcentaje
            </a>

            <a
              href="/iva"
              className="rounded-xl border p-4 transition hover:bg-slate-50"
            >
              🇨🇱 Calculadora de IVA
            </a>

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