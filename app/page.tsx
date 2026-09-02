const herramientas = [
  {
    nombre: "Calculadora de porcentaje",
    descripcion: "Calcula porcentajes de forma rápida y sencilla.",
    categoria: "Calculadoras",
    ruta: "/porcentaje",
    disponible: true,
  },
  {
    nombre: "Calculadora de descuento",
    descripcion: "Descubre cuánto ahorrarás y cuál será el precio final.",
    categoria: "Dinero",
    ruta: "/descuento",
    disponible: true,
  },
  {
    nombre: "Calculadora de edad",
    descripcion: "Calcula tu edad exacta a partir de tu fecha de nacimiento.",
    categoria: "Tiempo",
    ruta: "/edad",
    disponible: true,
  },
  {
    nombre: "Calculadora de IVA",
    descripcion: "Calcula el IVA, el precio neto y el precio total.",
    categoria: "Dinero",
    ruta: "/iva",
    disponible: true,
  },
  {
    nombre: "Calculadora de préstamos",
    descripcion:
      "Calcula la cuota mensual, los intereses y el total que pagarás.",
    categoria: "Dinero",
    ruta: "/prestamos",
    disponible: true,
  },
  {
    nombre: "Conversor de kilómetros",
    descripcion: "Convierte kilómetros a millas y millas a kilómetros.",
    categoria: "Conversores",
    ruta: "/kilometros",
    disponible: false,
  },
];

const categorias = [
  "Calculadoras",
  "Conversores",
  "Dinero",
  "Tiempo",
  "Estudio",
  "Tecnología",
  "Fitness",
  "Imágenes",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <a
            href="/"
            className="text-2xl font-bold hover:text-blue-600"
          >
            Herramientas Gratis
          </a>

          <nav className="hidden gap-6 text-sm md:flex">
            <a
              href="#herramientas"
              className="hover:text-blue-600"
            >
              Herramientas
            </a>

            <a
              href="#categorias"
              className="hover:text-blue-600"
            >
              Categorías
            </a>
          </nav>

        </div>
      </header>

      {/* PRESENTACIÓN */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">

        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Gratis y fácil de usar
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          Herramientas útiles para todos los días
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
          Calculadoras, conversores y herramientas online gratuitas,
          rápidas y sencillas.
        </p>

      </section>

      {/* HERRAMIENTAS */}
      <section
        id="herramientas"
        className="mx-auto max-w-6xl px-6 pb-20"
      >

        <h2 className="mb-8 text-2xl font-bold">
          Herramientas disponibles
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {herramientas.map((herramienta) => (
            <div
              key={herramienta.nombre}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <span className="text-sm font-medium text-blue-600">
                {herramienta.categoria}
              </span>

              <h3 className="mt-3 text-lg font-semibold">
                {herramienta.nombre}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {herramienta.descripcion}
              </p>

              {herramienta.disponible ? (
                <a
                  href={herramienta.ruta}
                  className="mt-6 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Usar herramienta →
                </a>
              ) : (
                <span className="mt-6 inline-block rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-500">
                  Próximamente
                </span>
              )}

            </div>
          ))}

        </div>

      </section>

      {/* CATEGORÍAS */}
      <section
        id="categorias"
        className="border-t bg-white"
      >

        <div className="mx-auto max-w-6xl px-6 py-16">

          <h2 className="text-2xl font-bold">
            Categorías
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {categorias.map((categoria) => (
              <div
                key={categoria}
                className="rounded-xl border p-5 text-center font-medium transition hover:bg-slate-50"
              >
                {categoria}
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* INFORMACIÓN */}
      <section className="border-t bg-slate-50">

        <div className="mx-auto max-w-3xl px-6 py-16 text-center">

          <h2 className="text-2xl font-bold">
            Herramientas gratuitas y fáciles de usar
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Nuestro objetivo es crear herramientas online sencillas
            que puedas utilizar desde tu computador o teléfono sin
            necesidad de instalar programas.
          </p>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t bg-white">

        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-sm text-slate-500">
          Herramientas Gratis — herramientas online gratuitas.
        </div>

      </footer>

    </main>
  );
}