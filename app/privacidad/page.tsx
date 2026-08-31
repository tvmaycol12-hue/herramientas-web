export default function PrivacidadPage() {
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
          Política de Privacidad
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          Última actualización: agosto de 2026
        </p>

        <section className="mt-10 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">
              1. Información general
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              En Herramientas Gratis nos preocupamos por la privacidad de
              nuestros visitantes. Esta Política de Privacidad explica cómo
              se puede recopilar, utilizar y proteger la información cuando
              utilizas nuestro sitio web.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              2. Información que recopilamos
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Nuestras calculadoras y herramientas pueden utilizarse sin
              necesidad de crear una cuenta ni proporcionar información
              personal.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Dependiendo de los servicios que incorporemos en el futuro,
              podremos utilizar herramientas de análisis, publicidad u otros
              servicios de terceros que recopilen información técnica, como
              el navegador, el dispositivo utilizado o páginas visitadas.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              3. Uso de la información
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              La información recopilada puede utilizarse para mejorar el
              funcionamiento del sitio, analizar el tráfico, detectar
              problemas técnicos, mejorar nuestras herramientas y mostrar
              contenido o publicidad relevante cuando corresponda.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              4. Cookies
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Este sitio puede utilizar cookies y tecnologías similares para
              mejorar la experiencia del usuario, analizar el funcionamiento
              del sitio y, si corresponde, ofrecer publicidad personalizada.
            </p>

            <p className="mt-3 leading-7 text-slate-600">
              Puedes configurar o bloquear las cookies desde las opciones de
              tu navegador.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              5. Servicios de terceros
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Podemos utilizar servicios de terceros, como herramientas de
              análisis o plataformas publicitarias. Estos servicios pueden
              recopilar información de acuerdo con sus propias políticas de
              privacidad.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              6. Seguridad
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Adoptamos medidas razonables para proteger la información
              utilizada por el sitio. Sin embargo, ningún sistema de
              transmisión o almacenamiento de información en Internet puede
              garantizar una seguridad absoluta.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              7. Cambios en esta política
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Esta Política de Privacidad puede actualizarse cuando sea
              necesario para reflejar cambios en nuestras herramientas,
              servicios o requisitos legales.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              8. Contacto
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Si tienes preguntas relacionadas con esta Política de
              Privacidad, puedes contactarnos mediante los canales de
              contacto disponibles en nuestro sitio web.
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