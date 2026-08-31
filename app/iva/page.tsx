"use client";

import { useState } from "react";

type Modo = "agregar" | "quitar";

export default function IvaPage() {
  const [modo, setModo] = useState<Modo>("agregar");
  const [precio, setPrecio] = useState("");
  const [iva, setIva] = useState("19");
  const [copiado, setCopiado] = useState(false);

  // Convierte números escritos en formato chileno:
  // 10.000 -> 10000
  // 1.500.000 -> 1500000
  // 10000,50 -> 10000.50
  // 10.000,50 -> 10000.50
  const convertirNumero = (valor: string) => {
    if (!valor) return 0;

    const limpio = valor.replace(/\./g, "").replace(",", ".");

    return Number(limpio);
  };

  const precioNumero = convertirNumero(precio);
  const ivaNumero = convertirNumero(iva);

  let precioFinal = 0;
  let montoIva = 0;
  let precioBase = 0;

  const hayResultado =
    precio !== "" &&
    !isNaN(precioNumero) &&
    !isNaN(ivaNumero) &&
    precioNumero >= 0 &&
    ivaNumero >= 0;

  if (hayResultado) {
    if (modo === "agregar") {
      // Precio ingresado = precio SIN IVA
      precioBase = precioNumero;

      montoIva = precioNumero * (ivaNumero / 100);

      precioFinal = precioNumero + montoIva;
    } else {
      // Precio ingresado = precio CON IVA
      precioFinal = precioNumero;

      precioBase = precioNumero / (1 + ivaNumero / 100);

      montoIva = precioNumero - precioBase;
    }
  }

  const formatoPesos = (numero: number) => {
    return numero.toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const copiarResultado = async () => {
    if (!hayResultado) return;

    try {
      await navigator.clipboard.writeText(
        `$${formatoPesos(precioFinal)}`
      );

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch {
      // Si el navegador bloquea el portapapeles,
      // no se rompe la calculadora.
    }
  };

  const limpiar = () => {
    setPrecio("");
    setIva("19");
    setCopiado(false);
  };

  const cambiarModo = (nuevoModo: Modo) => {
    setModo(nuevoModo);
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
            Calculadora de IVA
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-600">
            Calcula el IVA de un precio, obtén el precio final
            y descubre cuánto corresponde al impuesto.
          </p>
        </div>

        {/* CALCULADORA */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Calcula tu IVA
          </h2>

          {/* MODOS */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => cambiarModo("agregar")}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "agregar"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">
                Agregar IVA
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Precio sin IVA → precio con IVA
              </div>
            </button>

            <button
              onClick={() => cambiarModo("quitar")}
              className={`rounded-xl border p-4 text-left transition ${
                modo === "quitar"
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="font-semibold">
                Quitar IVA
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Precio con IVA → precio sin IVA
              </div>
            </button>
          </div>

          {/* PRECIO */}
          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold">
              {modo === "agregar"
                ? "Precio sin IVA"
                : "Precio con IVA"}
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

                  // Permite números, puntos y coma.
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
              Puedes escribir 10.000, 10000 o 10.000,50.
            </p>
          </div>

          {/* IVA */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Porcentaje de IVA
            </label>

            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={iva}
                onChange={(e) => {
                  const valor = e.target.value;

                  if (/^[0-9.,]*$/.test(valor)) {
                    setIva(valor);
                    setCopiado(false);
                  }
                }}
                className="w-full rounded-xl border px-4 py-3 pr-12 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium text-slate-500">
                %
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Para Chile, el IVA general es del 19%.
            </p>
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
                  {modo === "agregar"
                    ? "Precio final con IVA"
                    : "Precio sin IVA"}
                </p>

                <p className="mt-2 break-words text-4xl font-bold sm:text-5xl">
                  ${formatoPesos(precioFinal)}
                </p>

                <p className="mt-4 text-sm text-slate-300">
                  IVA: ${formatoPesos(montoIva)}
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
                    Precio sin IVA
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    ${formatoPesos(precioBase)}
                  </p>
                </div>

                <div className="rounded-xl border p-5">
                  <p className="text-sm text-slate-500">
                    IVA ({formatoPesos(ivaNumero)}%)
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    ${formatoPesos(montoIva)}
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
            ¿Cómo calcular el IVA en Chile?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Para agregar un IVA del 19% a un precio, se multiplica
            el precio por 0,19 para obtener el monto del IVA y
            después se suma al precio original.
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            IVA = precio × 19 ÷ 100
          </div>

          <div className="mt-4 rounded-xl bg-slate-100 p-4 font-mono">
            Precio final = precio + IVA
          </div>
        </section>

        {/* EJEMPLO */}
        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold">
            Ejemplo: IVA de $10.000
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Si tienes un precio de $10.000 sin IVA y aplicas
            un IVA del 19%, el impuesto corresponde a $1.900.
          </p>

          <div className="mt-5 rounded-xl bg-slate-100 p-4 font-mono">
            $10.000 × 19% = $1.900
          </div>

          <div className="mt-4 rounded-xl bg-slate-100 p-4 font-mono">
            $10.000 + $1.900 = $11.900
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