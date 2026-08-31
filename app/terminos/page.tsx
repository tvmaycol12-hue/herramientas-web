export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
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
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            ← Inicio
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Términos y Condiciones
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          Última actualización: agosto de 2026
        </p>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">1. Uso del sitio</h2>

            <p className="mt-3 leading-7 text-slate-600">
              Herramientas Gratis proporciona calculadoras y otras
              herramientas online destinadas a facilitar cálculos y
              consultas de carácter general.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Al utilizar este sitio aceptas estos términos y condiciones.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              2. Uso de las calculadoras
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Los resultados proporcionados por nuestras herramientas tienen
              carácter informativo y pueden utilizar aproximaciones
              matemáticas.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Los resultados no deben considerarse asesoramiento financiero,
              legal, médico o profesional.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              3. Exactitud de la información
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Intentamos mantener nuestras herramientas y contenidos
              actualizados y funcionando correctamente. Sin embargo, no
              garantizamos que toda la información sea siempre completa,
              exacta o libre de errores.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              4. Responsabilidad
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Herramientas Gratis no será responsable por decisiones tomadas
              exclusivamente basándose en los resultados obtenidos mediante
              nuestras herramientas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              5. Propiedad intelectual
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              El contenido, diseño, textos y elementos desarrollados
              específicamente para este sitio pertenecen a Herramientas
              Gratis, salvo que se indique lo contrario.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              6. Enlaces externos
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              El sitio puede contener enlaces hacia páginas o servicios de
              terceros. No controlamos dichos sitios ni somos responsables
              de sus contenidos o políticas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              7. Modificaciones
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Podemos modificar, actualizar o retirar herramientas y
              contenidos del sitio en cualquier momento.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              8. Contacto
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Si tienes preguntas sobre estos términos, puedes utilizar los
              medios de contacto disponibles en el sitio.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-10 border-t bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm text-slate-500">
          Herramientas Gratis · Herramientas online gratuitas
        </div>
      </footer>
    </main>
  );
}