"use client";

import { useState } from "react";

type ResultadoEdad = {
  años: number;
  meses: number;
  dias: number;
  totalDias: number;
  totalSemanas: number;
  totalMeses: number;
  proximoCumple: Date;
  diasParaCumple: number;
};

export default function EdadPage() {
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaCalculo, setFechaCalculo] = useState("");
  const [resultado, setResultado] = useState<ResultadoEdad | null>(null);
  const [error, setError] = useState("");

  const crearFecha = (fecha: string) => {
    const [año, mes, dia] = fecha.split("-").map(Number);

    return new Date(año, mes - 1, dia);
  };

  const calcularEdad = () => {
    setError("");
    setResultado(null);

    if (!fechaNacimiento) {
      setError("Debes ingresar tu fecha de nacimiento.");
      return;
    }

    const nacimiento = crearFecha(fechaNacimiento);

    const hoy = fechaCalculo
      ? crearFecha(fechaCalculo)
      : new Date();

    // Eliminamos la hora para que el cálculo sea exacto por día.
    hoy.setHours(0, 0, 0, 0);
    nacimiento.setHours(0, 0, 0, 0);

    if (nacimiento > hoy) {
      setError(
        "La fecha de nacimiento no puede ser posterior a la fecha de cálculo."
      );
      return;
    }

    let años = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();
    let dias = hoy.getDate() - nacimiento.getDate();

    if (dias < 0) {
      meses--;

      const diasMesAnterior = new Date(
        hoy.getFullYear(),
        hoy.getMonth(),
        0
      ).getDate();

      dias += diasMesAnterior;
    }

    if (meses < 0) {
      años--;
      meses += 12;
    }

    const diferenciaMs =
      hoy.getTime() - nacimiento.getTime();

    const totalDias = Math.floor(
      diferenciaMs / (1000 * 60 * 60 * 24)
    );

    const totalSemanas = Math.floor(totalDias / 7);

    const totalMeses = años * 12 + meses;

    // Próximo cumpleaños
    let añoCumpleaños = hoy.getFullYear();

    let proximoCumple = new Date(
      añoCumpleaños,
      nacimiento.getMonth(),
      nacimiento.getDate()
    );

    // Si el cumpleaños ya pasó, buscamos el del próximo año.
    if (proximoCumple < hoy) {
      añoCumpleaños++;

      proximoCumple = new Date(
        añoCumpleaños,
        nacimiento.getMonth(),
        nacimiento.getDate()
      );
    }

    // Corrección para personas nacidas el 29 de febrero.
    if (
      nacimiento.getMonth() === 1 &&
      nacimiento.getDate() === 29 &&
      proximoCumple.getMonth() !== 1
    ) {
      proximoCumple = new Date(
        añoCumpleaños,
        1,
        28
      );
    }

    const diasParaCumple = Math.ceil(
      (proximoCumple.getTime() - hoy.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    setResultado({
      años,
      meses,
      dias,
      totalDias,
      totalSemanas,
      totalMeses,
      proximoCumple,
      diasParaCumple,
    });
  };

  const limpiar = () => {
    setFechaNacimiento("");
    setFechaCalculo("");
    setResultado(null);
    setError("");
  };

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const cambiarFechaNacimiento = (
    valor: string
  ) => {
    setFechaNacimiento(valor);
    setResultado(null);
    setError("");
  };

  const cambiarFechaCalculo = (
    valor: string
  ) => {
    setFechaCalculo(valor);
    setResultado(null);
    setError("");
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
            Calculadora de edad
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Calcula tu edad exacta en años, meses y días.
            También puedes calcular tu edad en meses, semanas
            y días.
          </p>

        </div>

        {/* CALCULADORA */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Introduce tus datos
          </h2>

          {/* FECHA NACIMIENTO */}
          <div className="mt-6">

            <label className="mb-2 block text-sm font-semibold">
              Fecha de nacimiento
            </label>

            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) =>
                cambiarFechaNacimiento(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* FECHA DE CÁLCULO */}
          <div className="mt-5">

            <label className="mb-2 block text-sm font-semibold">
              Calcular edad hasta

              <span className="ml-2 font-normal text-slate-500">
                (opcional)
              </span>
            </label>

            <input
              type="date"
              value={fechaCalculo}
              onChange={(e) =>
                cambiarFechaCalculo(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-sm text-slate-500">
              Déjalo vacío para calcular tu edad hasta hoy.
            </p>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* BOTONES */}
          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={calcularEdad}
              className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Calcular edad
            </button>

            <button
              onClick={limpiar}
              className="rounded-xl border px-6 py-3 font-medium transition hover:bg-slate-50"
            >
              Limpiar
            </button>

          </div>

          {/* RESULTADO */}
          {resultado && (
            <div className="mt-8">

              {/* EDAD EXACTA */}
              <div className="rounded-2xl bg-slate-900 p-6 text-white">

                <p className="text-sm text-slate-300">
                  Edad exacta
                </p>

                <p className="mt-3 text-4xl font-bold sm:text-5xl">
                  {resultado.años} años
                </p>

                <p className="mt-3 text-lg text-slate-300">
                  {resultado.meses} meses y{" "}
                  {resultado.dias} días
                </p>

              </div>

              {/* ESTADÍSTICAS */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Edad en meses
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {resultado.totalMeses.toLocaleString(
                      "es-CL"
                    )}
                  </p>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Edad en semanas
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {resultado.totalSemanas.toLocaleString(
                      "es-CL"
                    )}
                  </p>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Edad en días
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {resultado.totalDias.toLocaleString(
                      "es-CL"
                    )}
                  </p>

                </div>

                <div className="rounded-xl border p-5">

                  <p className="text-sm text-slate-500">
                    Próximo cumpleaños
                  </p>

                  <p className="mt-2 text-lg font-bold capitalize">
                    {formatearFecha(
                      resultado.proximoCumple
                    )}
                  </p>

                </div>

              </div>

              {/* PRÓXIMO CUMPLEAÑOS */}
              <div className="mt-5 rounded-2xl border bg-blue-50 p-6">

                <p className="text-sm font-semibold text-blue-700">
                  🎂 Próximo cumpleaños
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {resultado.diasParaCumple === 0
                    ? "¡Es hoy! 🎉"
                    : `Faltan ${resultado.diasParaCumple} días`}
                </p>

              </div>

            </div>
          )}

        </section>

        {/* EXPLICACIÓN */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            ¿Cómo calcular la edad?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Para calcular la edad exacta se compara la fecha de
            nacimiento con la fecha hasta la que quieres realizar
            el cálculo.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            La calculadora obtiene los años completos y después
            calcula los meses y días restantes.
          </p>

        </section>

        {/* INFORMACIÓN */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Calculadora de edad online
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Introduce tu fecha de nacimiento para conocer tu edad
            exacta. También puedes elegir una fecha específica para
            saber qué edad tenías en ese momento.
          </p>

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
            Calculadora de descuentos
          </a>

          <a
            href="/iva"
            className="font-medium text-blue-600 hover:underline"
          >
            Calculadora de IVA
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