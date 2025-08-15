import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { LuCheck, LuClock, LuUser, LuCalendar } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { _ } from "compiled-i18n";
import ClaseInglesImg from "~/media/clases-italiano.jpeg?jsx";

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col">
      <main class="flex-1">
        {/* Hero Section */}
        <section class="bg-blue-600 py-16 text-white">
          <div class="container mx-auto px-4">
            <div class="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <div class="inline-block mb-4 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {_`Inscripciones Abiertas`}
                </div>
                <h1 class="mb-4 text-4xl font-bold">{_`Clases de Inglés`}</h1>
                <p class="mb-6 text-lg">
                  {_`Aprende inglés con nuestros diferentes niveles y propuestas para todas las edades.`}
                </p>
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2">
                    <LuCheck class="h-5 w-5" />
                    <span>{_`Profesores certificados con experiencia internacional`}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <LuCheck class="h-5 w-5" />
                    <span>{_`Grupos reducidos`}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <LuCheck class="h-5 w-5" />
                    <span>{_`Material didáctico incluido`}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <LuCheck class="h-5 w-5" />
                    <span>{_`Inscripciones abiertas hasta el 4 de abril`}</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-center">
                  <ClaseInglesImg
                      style={{ height: "600px", maxWidth: "500px" }}
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Info Section */}
        <section class="py-12 bg-blue-50">
          <div class="container mx-auto px-4">
            <div class="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg border border-blue-100">
              <div class="flex flex-col md:flex-row items-center gap-6">
                <div class="flex-shrink-0 w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <LuUser class="h-12 w-12 text-blue-600" />
                </div>
                <div class="text-center md:text-left">
                  <h2 class="text-2xl font-bold mb-2">{_`Profesora Gladis Mejia`}</h2>
                  <p class="text-gray-600 mb-4">
                    {_`Profesora certificada con más de 15 años de experiencia en la enseñanza del inglés.`}
                  </p>
                  <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <div class="flex items-center gap-2">
                      <LuCalendar class="h-5 w-5 text-blue-600" />
                      <span>{_`Martes y Jueves`}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <LuClock class="h-5 w-5 text-blue-600" />
                      <span>{_`17:00 a 18:15 hs`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Levels Section */}
        <section class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <div class="mb-12 text-center">
              <h2 class="mb-2 text-3xl font-bold">{_`Nuestros Niveles`}</h2>
              <p class="mx-auto max-w-2xl text-gray-600">
                {_`Ofrecemos diferentes niveles adaptados a tus necesidades y objetivos`}
              </p>
            </div>

            <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              <div class="border border-blue-200 rounded shadow-sm hover:shadow-lg transition-shadow relative">
                <div class="absolute top-0 right-0 p-2">
                  <div class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {_`Popular`}
                  </div>
                </div>
                <div class="p-6 border-b">
                  <h3 class="text-xl font-medium">Beginner</h3>
                  <p class="text-sm text-gray-500">{_`Para principiantes`}</p>
                </div>
                <div class="p-6">
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Introducción al idioma inglés`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Vocabulario básico y expresiones cotidianas`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Gramática fundamental`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Conversación básica`}</span>
                    </li>
                  </ul>
                </div>
                <div class="p-6 pt-0">
                  <Button look="primary" class="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/contacto?curso=ingles-beginner">{_`Inscribirme`}</Link>
                  </Button>
                </div>
              </div>

              <div class="border border-blue-200 rounded shadow-sm hover:shadow-lg transition-shadow">
                <div class="p-6 border-b">
                  <h3 class="text-xl font-medium">Intermediate</h3>
                  <p class="text-sm text-gray-500">{_`Para estudiantes con conocimientos previos`}</p>
                </div>
                <div class="p-6">
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Ampliación de vocabulario`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Gramática avanzada`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Conversación fluida`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Comprensión de textos`}</span>
                    </li>
                  </ul>
                </div>
                <div class="p-6 pt-0">
                  <Button look="primary" class="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/contacto?curso=ingles-intermediate">{_`Inscribirme`}</Link>
                  </Button>
                </div>
              </div>

              <div class="border border-blue-200 rounded shadow-sm hover:shadow-lg transition-shadow">
                <div class="p-6 border-b">
                  <h3 class="text-xl font-medium">Advanced</h3>
                  <p class="text-sm text-gray-500">{_`Para estudiantes avanzados`}</p>
                </div>
                <div class="p-6">
                  <ul class="space-y-2">
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Perfeccionamiento del idioma`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Expresiones idiomáticas y coloquiales`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Preparación para exámenes internacionales`}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <LuCheck class="h-5 w-5 text-blue-600 mt-0.5" />
                      <span>{_`Inglés para negocios y profesional`}</span>
                    </li>
                  </ul>
                </div>
                <div class="p-6 pt-0">
                  <Button look="primary" class="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/contacto?curso=ingles-advanced">{_`Inscribirme`}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exams Section */}
        <section class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <div class="mb-12 text-center">
              <h2 class="mb-2 text-3xl font-bold">{_`Preparación para Exámenes Internacionales`}</h2>
              <p class="mx-auto max-w-2xl text-gray-600">
                {_`Te preparamos para obtener certificaciones reconocidas mundialmente`}
              </p>
            </div>

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              <div class="border border-blue-200 rounded shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div class="p-6 border-b text-center">
                  <h3 class="text-xl font-medium">Cambridge</h3>
                </div>
                <div class="p-6 text-center">
                  <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-2xl">🇬🇧</span>
                  </div>
                  <p class="text-sm text-gray-600">{_`Preparación para exámenes FCE, CAE y CPE`}</p>
                </div>
                <div class="p-6 pt-0">
                  <Button look="outline" class="w-full">
                    <Link href="/contacto?curso=ingles-cambridge">{_`Más info`}</Link>
                  </Button>
                </div>
              </div>

              <div class="border border-blue-200 rounded shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div class="p-6 border-b text-center">
                  <h3 class="text-xl font-medium">TOEFL</h3>
                </div>
                <div class="p-6 text-center">
                  <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-2xl">🇺🇸</span>
                  </div>
                  <p class="text-sm text-gray-600">
                    {_`Preparación para el Test of English as a Foreign Language`}
                  </p>
                </div>
                <div class="p-6 pt-0">
                  <Button look="outline" class="w-full">
                    <Link href="/contacto?curso=ingles-toefl">{_`Más info`}</Link>
                  </Button>
                </div>
              </div>

              <div class="border border-blue-200 rounded shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div class="p-6 border-b text-center">
                  <h3 class="text-xl font-medium">IELTS</h3>
                </div>
                <div class="p-6 text-center">
                  <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-2xl">🌎</span>
                  </div>
                  <p class="text-sm text-gray-600">
                    {_`Preparación para International English Language Testing System`}
                  </p>
                </div>
                <div class="p-6 pt-0">
                  <Button look="outline" class="w-full">
                    <Link href="/contacto?curso=ingles-ielts">{_`Más info`}</Link>
                  </Button>
                </div>
              </div>

              <div class="border border-blue-200 rounded shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div class="p-6 border-b text-center">
                  <h3 class="text-xl font-medium">Business</h3>
                </div>
                <div class="p-6 text-center">
                  <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span class="text-2xl">💼</span>
                  </div>
                  <p class="text-sm text-gray-600">{_`Inglés para negocios y entornos profesionales`}</p>
                </div>
                <div class="p-6 pt-0">
                  <Button look="outline" class="w-full">
                    <Link href="/contacto?curso=ingles-business">{_`Más info`}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section class="py-16 bg-gray-100">
          <div class="container mx-auto px-4">
            <div class="mb-12 text-center">
              <h2 class="mb-2 text-3xl font-bold">{_`Preguntas Frecuentes`}</h2>
              <p class="mx-auto max-w-2xl text-gray-600">
                {_`Resolvemos tus dudas sobre nuestras clases de inglés`}
              </p>
            </div>

            <div class="mx-auto max-w-3xl space-y-6">
              <div class="border rounded bg-white hover:shadow-md transition-shadow p-6">
                <h3 class="text-lg font-medium mb-2">{_`¿Cuándo comienzan las clases?`}</h3>
                <p class="text-gray-600">
                  {_`El ciclo lectivo 2025 comenzó el 17 de marzo, pero las inscripciones están abiertas hasta el 4 de abril.`}
                </p>
              </div>

              <div class="border rounded bg-white hover:shadow-md transition-shadow p-6">
                <h3 class="text-lg font-medium mb-2">{_`¿Necesito conocimientos previos?`}</h3>
                <p class="text-gray-600">
                  {_`No para el nivel Beginner. Para los otros niveles, realizamos una evaluación para ubicarte en el grupo adecuado según tus conocimientos.`}
                </p>
              </div>

              <div class="border rounded bg-white hover:shadow-md transition-shadow p-6">
                <h3 class="text-lg font-medium mb-2">{_`¿Cuál es el costo de las clases?`}</h3>
                <p class="text-gray-600">
                  {_`Los costos varían según el nivel y si eres socio o no. Contáctanos para obtener información detallada sobre los precios actuales.`}
                </p>
              </div>

              <div class="border rounded bg-white hover:shadow-md transition-shadow p-6">
                <h3 class="text-lg font-medium mb-2">{_`¿Qué materiales necesito?`}</h3>
                <p class="text-gray-600">
                  {_`El material didáctico básico está incluido. Te indicaremos si necesitas algún libro o recurso adicional según el nivel.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section class="py-16 bg-blue-50">
          <div class="container mx-auto px-4">
            <div class="mb-12 text-center">
              <h2 class="mb-2 text-3xl font-bold">{_`Lo que dicen nuestros alumnos`}</h2>
              <p class="mx-auto max-w-2xl text-gray-600">
                {_`Experiencias de quienes ya están aprendiendo inglés con nosotros`}
              </p>
            </div>

            <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              <div class="bg-white border border-blue-100 rounded shadow-sm p-6">
                <div class="mb-4 flex justify-center">
                  <div class="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        stroke="#FFD700"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p class="text-center italic mb-4">
                  "{_`Las clases con la profesora Gladis son excelentes. Su método de enseñanza es muy claro y dinámico. En poco tiempo he notado un gran avance en mi nivel de inglés.`}"
                </p>
                <div class="text-center">
                  <p class="font-semibold">{_`María González`}</p>
                  <p class="text-sm text-gray-600">{_`Alumna de nivel Intermediate`}</p>
                </div>
              </div>

              <div class="bg-white border border-blue-100 rounded shadow-sm p-6">
                <div class="mb-4 flex justify-center">
                  <div class="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        stroke="#FFD700"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p class="text-center italic mb-4">
                  "{_`Empecé desde cero y ahora puedo mantener conversaciones básicas en inglés. El ambiente es muy agradable y los grupos reducidos permiten una atención personalizada.`}"
                </p>
                <div class="text-center">
                  <p class="font-semibold">{_`Carlos Rodríguez`}</p>
                  <p class="text-sm text-gray-600">{_`Alumno de nivel Beginner`}</p>
                </div>
              </div>

              <div class="bg-white border border-blue-100 rounded shadow-sm p-6">
                <div class="mb-4 flex justify-center">
                  <div class="flex gap-1">
                    {Array(5).fill(0).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#FFD700"
                        stroke="#FFD700"
                        stroke-width="1"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p class="text-center italic mb-4">
                  "{_`Mi hijo disfruta mucho las clases de inglés. La profesora Gladis tiene una manera muy especial de enseñar a los niños, haciendo que aprendan jugando.`}"
                </p>
                <div class="text-center">
                  <p class="font-semibold">{_`Laura Martínez`}</p>
                  <p class="text-sm text-gray-600">{_`Madre de alumno`}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section class="bg-blue-600 py-16 text-white">
          <div class="container mx-auto px-4 text-center">
            <h2 class="mb-4 text-3xl font-bold">{_`¿Listo para aprender inglés?`}</h2>
            <p class="mx-auto mb-8 max-w-2xl text-lg">
              {_`No pierdas esta oportunidad y sumate ya. Inscripciones abiertas hasta el 4 de abril.`}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button look="outline" size="lg" class="bg-white text-blue-600 hover:bg-white/90">
                <Link href="/contacto">{_`Inscríbete ahora`}</Link>
              </Button>
              <Button look="outline" size="lg" class="border-white text-white hover:bg-white/10">
                <Link href="/contacto?asunto=consulta-ingles">{_`Hacer una consulta`}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: _`Clases de Inglés - Círculo Italiano Joven Italia`,
  meta: [
    {
      name: "description",
      content: _`Aprende inglés con profesores certificados. Todos los niveles disponibles para niños y adultos en Miramar.`,
    },
  ],
};
