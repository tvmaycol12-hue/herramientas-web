export default function ContactoPage() {
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
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
          CONTACTO
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Contacta con nosotros
        </h1>

        <p className="mt-4 text-lg leading-7 text-slate-600">
          ¿Tienes una sugerencia, encontraste un problema o quieres
          comunicarte con nosotros? Estamos trabajando para ofrecerte
          diferentes formas de contacto.
        </p>

        <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">
            ¿Encontraste un problema?
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Si alguna de nuestras herramientas no funciona correctamente,
            puedes informarnos para que podamos revisarla y mejorarla.
          </p>

          <div className="mt-6 rounded-xl bg-blue-50 p-5">
            <p className="font-semibold text-blue-900">
              Estamos preparando nuestros canales de contacto.
            </p>

            <p className="mt-2 text-sm leading-6 text-blue-800">
              Próximamente añadiremos un medio de contacto directo para
              recibir sugerencias, consultas y reportes.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">
            Sugerencias
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Si tienes una idea para una nueva calculadora o herramienta,
            nos interesa conocerla. Nuestro objetivo es seguir agregando
            herramientas gratuitas y útiles.
          </p>
        </section>
      </div>

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