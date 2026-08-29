"use client";

import { useState } from "react";

export default function EdadPage() {
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaCalculo, setFechaCalculo] = useState("");
  const [resultado, setResultado] = useState<{
    años: number;
    meses: number;
    dias: number;
    totalDias: number;
    totalSemanas: number;
    totalMeses: number;
    proximoCumple: Date;
    diasParaCumple: number;
  } | null>(null);

  const calcularEdad = () => {
    if (!fechaNacimiento) return;

    const nacimiento = new Date(`${fechaNacimiento}T00:00:00`);

    const hoy = fechaCalculo
      ? new Date(`${fechaCalculo}T00:00:00`)
      : new Date();

    if (nacimiento > hoy) {
      setResultado(null);
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

    const cumpleañosEsteAño = new Date(
      hoy.getFullYear(),
      nacimiento.getMonth(),
      nacimiento.getDate()
    );

    let proximoCumple = cumpleañosEsteAño;

    if (cumpleañosEsteAño < hoy) {
      proximoCumple = new Date(
        hoy.getFullYear() + 1,
        nacimiento.getMonth(),
        nacimiento.getDate()
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
  };

  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

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

      <div className="mx-auto max-w-3xl px-5 py-10">

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

        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold">
            Introduce tus datos
          </h2>

          <div className="mt-6">

            <label className="mb-2 block text-sm font-semibold">
              Fecha de nacimiento
            </label>

            <input
              type="date"
              value={fechaNacimiento}
              onChange={(e) =>
                setFechaNacimiento(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

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
                setFechaCalculo(e.target.value)
              }
              className="w-full rounded-xl border px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-2 text-sm text-slate-500">
              Déjalo vacío para calcular tu edad hasta hoy.
            </p>

          </div>

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

          {resultado && (
            <div className="mt-8">

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

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border p-5">
                  <p className="text-sm text-slate-500">
                    Edad en meses
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {resultado.totalMeses.toLocaleString("es-CL")}
                  </p>
                </div>

                <div className="rounded-xl border p-5">
                  <p className="text-sm text-slate-500">
                    Edad en semanas
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {resultado.totalSemanas.toLocaleString("es-CL")}
                  </p>
                </div>

                <div className="rounded-xl border p-5">
                  <p className="text-sm text-slate-500">
                    Edad en días
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {resultado.totalDias.toLocaleString("es-CL")}
                  </p>
                </div>

                <div className="rounded-xl border p-5">
                  <p className="text-sm text-slate-500">
                    Próximo cumpleaños
                  </p>

                  <p className="mt-2 text-lg font-bold capitalize">
                    {formatearFecha(resultado.proximoCumple)}
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-2xl border bg-blue-50 p-6">

                <p className="text-sm font-semibold text-blue-700">
                  🎂 Próximo cumpleaños
                </p>

                <p className="mt-2 text-2xl font-bold">
                  Faltan {resultado.diasParaCumple} días
                </p>

              </div>

            </div>
          )}

        </section>

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

        <div className="mt-8 text-center">

          <a
            href="/"
            className="font-medium text-blue-600 hover:underline"
          >
            ← Ver todas las herramientas
          </a>

        </div>

      </div>

      <footer className="mt-10 border-t bg-white">

        <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm text-slate-500">
          Herramientas Gratis · Herramientas online gratuitas
        </div>

      </footer>

    </main>
  );
}