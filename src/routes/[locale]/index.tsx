import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { _, getLocale } from "compiled-i18n";
import { LuCalendar, LuLanguages, LuFileText, LuMusic, LuApple, LuPalette, LuBrush, LuBuilding2 } from "@qwikest/icons/lucide";
import HeroSlider from "~/components/HeroSlider/HeroSlider";
import { Button, Card } from "~/components/ui";
import ImageStory from "~/media/story.jpg?h=500&jsx";
import qs from 'qs'

const BASE_URL = import.meta.env.VITE_STRAPI_URL;

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            imagen: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true
            }
          },
        },
      }
    }
  },
}

export const useGetHomePage = routeLoader$(async () => {
  const query = qs.stringify(QUERY_HOME_PAGE, { encodeValuesOnly: true });
  console.log('query ', query)
  const res = await fetch(`${BASE_URL}/api/home-page?${query}`);
  if (!res.ok) throw new Error('Failed to fetch data from Strapi');
  const data = await res.json() as any;
  return data;
});

export const useGetStrapiDataHomePage = routeLoader$(async () => {
  const res = await fetch(`${BASE_URL}/api/home-page`);
  if (!res.ok) throw new Error('Failed to fetch data from Strapi');
  const data = await res.json() as any;
  return data;
});

// Fecha actual para filtrar eventos
const today = new Date();
today.setHours(0, 0, 0, 0); // Asegurar comparación solo por fecha

// Filtrar solo eventos futuros
export default component$(() => {
  const signal = useGetStrapiDataHomePage()
  console.log('signal ', signal.value)
  const signalHomePage = useGetHomePage()
  console.log('signalHomePage ', signalHomePage.value.data.sections[0])
  const currentLocale = getLocale();
  return (
    <>
      <HeroSlider
        description={signalHomePage.value.data.sections[0].Subtitulo}
        title={signalHomePage.value.data.sections[0].Titulo}
      />

      {/* Services Section */}
      <section class="py-16 md:py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {_`Nuestros servicios`}
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              {_`Descubre todo lo que el Círculo Italiano de Miramar tiene para ofrecerte`}
            </p>
          </div>
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {/* Tarjeta Idiomas */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-2xl bg-white/95 shadow-md hover:-translate-y-1 relative overflow-hidden text-center">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-2xl" />
              <Card.Header class="flex flex-col items-center">
                <div class="h-12 w-12 rounded-full bg-green-50 text-green-700 flex items-center justify-center shadow-sm mb-3">
                  <LuLanguages class="h-6 w-6" />
                </div>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Idiomas`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Aprende italiano e inglés con nuestros diferentes niveles y propuestas para todas las edades.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex gap-3 justify-center">
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href={`/${currentLocale}/clases/italiano`} class="w-full">
                    {_`Italiano`}
                  </Link>
                </Button>
                <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                  <Link href={`/${currentLocale}/clases/ingles`} class="w-full">
                    {_`Inglés`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Eventos */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-2xl bg-white/95 shadow-md hover:-translate-y-1 relative overflow-hidden text-center">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-2xl" />
              <Card.Header class="flex flex-col items-center">
                <div class="h-12 w-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-sm mb-3">
                  <LuCalendar class="h-6 w-6" />
                </div>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Eventos Culturales`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Exposiciones, muestras, charlas y eventos que promueven la cultura italiana.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex justify-center">
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href={`/${currentLocale}/eventos`} class="w-full">
                    {_`Ver agenda`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Trámites */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-2xl bg-white/95 shadow-md hover:-translate-y-1 relative overflow-hidden text-center">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-2xl" />
              <Card.Header class="flex flex-col items-center">
                <div class="h-12 w-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shadow-sm mb-3">
                  <LuFileText class="h-6 w-6" />
                </div>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Trámites de Ciudadanía`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Asesoramiento y apoyo en los trámites para obtener la ciudadanía italiana.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex justify-center">
                <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                  <Link href={`/${currentLocale}/tramites`} class="w-full">
                    {_`Asesoría`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Danzas Ritmos Latinos */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-2xl bg-white/95 shadow-md hover:-translate-y-1 relative overflow-hidden text-center">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-2xl" />
              <Card.Header class="flex flex-col items-center">
                <div class="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-sm mb-3">
                  <LuMusic class="h-6 w-6" />
                </div>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`titulo_danzas_ritmos_en_accion`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Clases y talleres de danzas latinas para todas las edades. Vení a moverte y divertirte aprendiendo ritmos como salsa, bachata y más.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex justify-center">
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href={`/${currentLocale}/clases/danzas`} class="w-full">
                    {_`Ver más`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Nutrición */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-2xl bg-white/95 shadow-md hover:-translate-y-1 relative overflow-hidden text-center">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-2xl" />
              <Card.Header class="flex flex-col items-center">
                <div class="h-12 w-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shadow-sm mb-3">
                  <LuApple class="h-6 w-6" />
                </div>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Nutrición`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Charlas, talleres y asesoramiento sobre alimentación saludable y bienestar, a cargo de profesionales.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex justify-center">
                <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                  <Link href={`/${currentLocale}/eventos`} class="w-full">
                    {_`Próximas actividades`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Taller de Arte */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-2xl bg-white/95 shadow-md hover:-translate-y-1 relative overflow-hidden text-center">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-2xl" />
              <Card.Header class="flex flex-col items-center">
                <div class="h-12 w-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shadow-sm mb-3">
                  <LuBrush class="h-6 w-6" />
                </div>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Taller de arte`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Espacio creativo para aprender distintas técnicas artísticas con profesores y artistas invitados.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex justify-center">
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href={`/${currentLocale}/eventos`} class="w-full">
                    {_`Próximas actividades`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Exposición de obras */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-2xl bg-white/95 shadow-md hover:-translate-y-1 relative overflow-hidden text-center">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-2xl" />
              <Card.Header class="flex flex-col items-center">
                <div class="h-12 w-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shadow-sm mb-3">
                  <LuPalette class="h-6 w-6" />
                </div>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Exposición de obras`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Espacio para artistas locales y regionales. Exhibiciones de pintura, fotografía y otras expresiones artísticas.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex justify-center">
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href={`/${currentLocale}/eventos`} class="w-full">
                    {_`Ver exposiciones`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Alquiler de Salones */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-2xl bg-white/95 shadow-md hover:-translate-y-1 relative overflow-hidden text-center">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-2xl" />
              <Card.Header class="flex flex-col items-center">
                <div class="h-12 w-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shadow-sm mb-3">
                  <LuBuilding2 class="h-6 w-6" />
                </div>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Alquiler de salones`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Ofrecemos espacios equipados para reuniones, capacitaciones y celebraciones familiares.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex justify-center">
                <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                  <Link href={`/${currentLocale}/contacto`} class="w-full">
                    {_`Consultar disponibilidad`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
          </div>
        </div>
      </section>

      {/* Próximos Eventos Section */}
      <section class="py-16 md:py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {_`Próximos Eventos`}
            </h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              {_`No te pierdas nuestras próximas actividades culturales y sociales.`}
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section class="py-16 md:py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="grid gap-12 md:grid-cols-2 items-center max-w-5xl mx-auto">
            <div class="order-2 md:order-1 relative h-[350px] rounded-lg overflow-hidden shadow-md">
              <ImageStory
                class="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div class="order-1 md:order-2">
              <h2 class="mb-4 text-3xl font-bold text-gray-800">{_`Nuestra Historia`}</h2>
              <p class="mb-6 text-gray-700 text-lg leading-relaxed">
                {_`Desde 1889, somos un pilar de la cultura italiana en Miramar. Nacimos para apoyar a los inmigrantes y hoy seguimos promoviendo el idioma, las tradiciones y el encuentro cultural. Con 136 años de historia, evolucionamos manteniendo nuestro corazón italiano.`}
              </p>
              <Button>
                <Link href={`/${currentLocale}/nosotros`}>
                  {_`Conoce más`}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section class="py-16 md:py-20 bg-gradient-to-r from-green-600/80 via-white to-red-600/80">
        <div class="container mx-auto px-4">
          <div class="mx-auto max-w-3xl rounded-lg bg-white p-10 shadow-lg border-2 border-green-600">
            <div class="text-center">
              <h2 class="mb-4 text-3xl md:text-4xl font-bold text-gray-800 font-serif tracking-wide">{_`¿Quieres formar parte?`}</h2>
              <p class="mb-8 text-lg text-gray-600">
                {_`Acércate a nuestra sede o contáctanos para conocer más sobre nuestras actividades, hacerte socio o presentar tu proyecto.`}
              </p>
              <div class="flex flex-wrap justify-center gap-4">
                <div>
                  <Link href={`/${currentLocale}/asociate`} class="w-full">
                    <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                      {_`Asociate`}
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link href={`/${currentLocale}/proyectos`} class="w-full">
                    <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                      {_`Presenta tu proyecto`}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Mutual Cultural Círculo Italiano Joven Italia - Miramar",
  meta: [
    {
      name: "description",
      content: _`Descubre el Círculo Italiano Joven Italia en Miramar. Clases de italiano e inglés, eventos culturales, trámites de ciudadanía y más. 136 años promoviendo la cultura italiana.`,
    },
  ],
};
