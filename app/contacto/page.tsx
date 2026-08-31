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
          comunicarte con nosotros? Puedes escribirnos.
        </p>

        <section className="mt-10 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">
            Escríbenos
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Para consultas, sugerencias o reportes relacionados con
            Herramientas Gratis, puedes contactarnos mediante el correo
            electrónico indicado a continuación.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              Correo electrónico
            </p>

            <a
              href="mailto:contacto@herramientasgratis.com"
              className="mt-2 inline-block font-semibold text-blue-600 hover:underline"
            >
              contacto@herramientasgratis.com
            </a>
          </div>

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Intentaremos responder las consultas relacionadas con el
            funcionamiento del sitio y nuestras herramientas.
          </p>
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