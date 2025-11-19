import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { _, getLocale } from "compiled-i18n";
import { LuCalendar, LuLanguages, LuFileText, LuPalette, LuBuilding2, LuArrowRight, LuMapPin } from "@qwikest/icons/lucide";
import HeroSlider from "~/components/HeroSlider/HeroSlider";
import { Button } from "~/components/ui";
import ImageStory from "~/media/story.jpg?h=500&jsx";
import qs from 'qs';
import {
  BASE_URL,
  type StrapiEvento,
  type EventoFormateado,
  formatDate,
  absolutize,
  getStrapiImageUrl,
  getStrapiImageSrcSet
} from "~/utils/strapi";

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
  try {
    const query = qs.stringify(QUERY_HOME_PAGE, { encodeValuesOnly: true });
    const res = await fetch(`${BASE_URL}/api/home-page?${query}`);
    if (!res.ok) throw new Error('Failed to fetch data from Strapi');
    const data = await res.json() as any;
    return data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return null;
  }
});

export const useHomeEventos = routeLoader$(async () => {
  try {
    const query = qs.stringify(
      {
        populate: "*",
        sort: ["fecha:desc"],
        pagination: {
          limit: 10 // Traemos un poco más para filtrar en cliente si es necesario, aunque idealmente filtraríamos en backend
        }
      },
      { encodeValuesOnly: true }
    );

    const res = await fetch(`${BASE_URL}/api/eventos?${query}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch eventos from Strapi: ${res.status}`);
    }

    const data = (await res.json()) as { data: StrapiEvento[] };

    const eventosFormateados: EventoFormateado[] = data.data.map((evento) => {
      const fechaObj = new Date(evento.fecha);
      const imageUrl = getStrapiImageUrl(evento.imagen_principal, "medium");
      const imageLargeUrl = getStrapiImageUrl(evento.imagen_principal, "large") || getStrapiImageUrl(evento.imagen_principal, "original");
      const imageSrcSet = getStrapiImageSrcSet(evento.imagen_principal);
      const imageThumb = getStrapiImageUrl(evento.imagen_principal, "thumbnail");

      return {
        id: evento.documentId || evento.id.toString(),
        title: evento.titulo,
        date: formatDate(evento.fecha),
        dateObj: fechaObj,
        description: evento.description,
        location: evento.lugar,
        image: imageUrl,
        imageLarge: imageLargeUrl,
        imageAlt: evento.imagen_principal?.alternativeText || evento.titulo,
        imageSrcSet: imageSrcSet,
        imageWidth: evento.imagen_principal?.width || null,
        imageHeight: evento.imagen_principal?.height || null,
        imageThumb,
        destacado: evento.destacado,
        galeria: evento.galeria?.map((img) => ({
          url: absolutize(img.url),
        })),
      };
    });

    // Filtrar solo eventos futuros
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventosFuturos = eventosFormateados.filter(e => {
      const fecha = new Date(e.dateObj);
      fecha.setHours(0, 0, 0, 0);
      return fecha >= today;
    });

    // Ordenar por fecha más próxima
    eventosFuturos.sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

    return eventosFuturos.slice(0, 3);
  } catch (error) {
    console.error("Error fetching home eventos:", error);
    return [];
  }
});

export default component$(() => {
  const signalHomePage = useGetHomePage();
  const homeEventos = useHomeEventos();
  const currentLocale = getLocale();

  const heroData = signalHomePage.value?.data?.sections?.[0];
  const title = heroData?.Titulo || _`Bienvenidos al Círculo Italiano`;
  const subtitle = heroData?.Subtitulo || _`Un espacio de encuentro, cultura y tradición en Miramar`;

  return (
    <>
      <HeroSlider
        description={subtitle}
        title={title}
      />

      {/* Services Section - Redesigned */}
      <section class="py-20 bg-white relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16">
            <span class="text-green-600 font-bold tracking-wider uppercase text-sm mb-2 block">{_`Lo que hacemos`}</span>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
              {_`Nuestros Servicios`}
            </h2>
            <div class="w-24 h-1 bg-gradient-to-r from-green-600 via-white to-red-600 mx-auto rounded-full mb-6"></div>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {_`Descubre todo lo que el Círculo Italiano de Miramar tiene para ofrecerte a ti y a tu familia.`}
            </p>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {/* Card 1: Idiomas */}
            <Link href={`/${currentLocale}/clases`} class="group">
              <div class="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-2 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div class="relative z-10">
                  <div class="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <LuLanguages class="w-7 h-7" />
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{_`Idiomas`}</h3>
                  <p class="text-gray-600 mb-6 leading-relaxed">{_`Aprende italiano e inglés con nuestros diferentes niveles y propuestas para todas las edades.`}</p>
                  <span class="inline-flex items-center text-green-600 font-semibold group-hover:translate-x-1 transition-transform">
                    {_`Ver clases`} <LuArrowRight class="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 2: Ciudadanía */}
            <Link href={`/${currentLocale}/tramites`} class="group">
              <div class="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-red-200 hover:-translate-y-2 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div class="relative z-10">
                  <div class="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <LuFileText class="w-7 h-7" />
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">{_`Ciudadanía`}</h3>
                  <p class="text-gray-600 mb-6 leading-relaxed">{_`Asesoramiento y apoyo integral en los trámites para obtener la ciudadanía italiana.`}</p>
                  <span class="inline-flex items-center text-red-600 font-semibold group-hover:translate-x-1 transition-transform">
                    {_`Consultar`} <LuArrowRight class="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 3: Cultura */}
            <Link href={`/${currentLocale}/eventos`} class="group">
              <div class="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 hover:-translate-y-2 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div class="relative z-10">
                  <div class="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <LuPalette class="w-7 h-7" />
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-700 transition-colors">{_`Cultura y Arte`}</h3>
                  <p class="text-gray-600 mb-6 leading-relaxed">{_`Exposiciones, talleres de arte, música y eventos que promueven nuestra herencia cultural.`}</p>
                  <span class="inline-flex items-center text-green-600 font-semibold group-hover:translate-x-1 transition-transform">
                    {_`Ver agenda`} <LuArrowRight class="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 4: Salones */}
            <Link href={`/${currentLocale}/alquiler-salones`} class="group">
              <div class="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-2 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <div class="relative z-10">
                  <div class="w-14 h-14 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-600 group-hover:text-white transition-colors">
                    <LuBuilding2 class="w-7 h-7" />
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">{_`Salones`}</h3>
                  <p class="text-gray-600 mb-6 leading-relaxed">{_`Espacios equipados y versátiles para tus reuniones, capacitaciones y celebraciones.`}</p>
                  <span class="inline-flex items-center text-gray-600 font-semibold group-hover:translate-x-1 transition-transform">
                    {_`Ver espacios`} <LuArrowRight class="ml-2 w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section - Dynamic */}
      <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div class="text-left">
              <span class="text-red-600 font-bold tracking-wider uppercase text-sm mb-2 block">{_`Agenda`}</span>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 font-serif">{_`Próximos Eventos`}</h2>
            </div>
            <Link href={`/${currentLocale}/eventos`} class="hidden md:inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm">
              {_`Ver calendario completo`} <LuArrowRight class="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {homeEventos.value.length > 0 ? (
              homeEventos.value.map((evento) => (
                <Link key={evento.id} href={`/${currentLocale}/eventos/${evento.id}`} class="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div class="relative h-56 overflow-hidden">
                    <div class="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    {evento.image ? (
                      <img
                        src={evento.image}
                        alt={evento.imageAlt || evento.title}
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        width={400}
                        height={250}
                      />
                    ) : (
                      <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <LuCalendar class="w-12 h-12" />
                      </div>
                    )}
                    <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm text-sm font-bold text-gray-800">
                      {evento.date.split(' ')[0]} {evento.date.split(' ')[1]}
                    </div>
                  </div>
                  <div class="p-6 flex-1 flex flex-col">
                    <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                      {evento.title}
                    </h3>
                    <div class="flex items-center text-gray-500 text-sm mb-4">
                      <LuMapPin class="w-4 h-4 mr-1" />
                      <span class="line-clamp-1">{evento.location}</span>
                    </div>
                    <p class="text-gray-600 line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                      {evento.description}
                    </p>
                    <span class="text-green-600 font-semibold text-sm flex items-center mt-auto">
                      {_`Más información`} <LuArrowRight class="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div class="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                <LuCalendar class="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p class="text-gray-500">{_`No hay eventos próximos programados.`}</p>
                <Link href={`/${currentLocale}/eventos`} class="text-green-600 font-semibold hover:underline mt-2 inline-block">
                  {_`Ver eventos pasados`}
                </Link>
              </div>
            )}
          </div>

          <div class="mt-8 text-center md:hidden">
            <Link href={`/${currentLocale}/eventos`} class="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-semibold hover:bg-green-600 hover:text-white hover:border-green-600 transition-all shadow-sm">
              {_`Ver calendario completo`} <LuArrowRight class="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* History Section - Improved */}
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
            <div class="order-2 lg:order-1 relative">
              <div class="absolute -inset-4 bg-gradient-to-tr from-green-100 to-red-100 rounded-full blur-3xl opacity-50"></div>
              <div class="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <ImageStory class="w-full h-auto object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-6 left-6 text-white">
                  <p class="font-bold text-lg">{_`Fundada en 1889`}</p>
                  <p class="text-sm opacity-90">{_`Más de un siglo de historia`}</p>
                </div>
              </div>
            </div>

            <div class="order-1 lg:order-2">
              <span class="text-green-600 font-bold tracking-wider uppercase text-sm mb-2 block">{_`Nuestra Historia`}</span>
              <h2 class="text-4xl font-bold text-gray-900 mb-6 font-serif leading-tight">
                {_`Preservando nuestras raíces, construyendo futuro`}
              </h2>
              <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                {_`Desde 1889, somos un pilar de la cultura italiana en Miramar. Nacimos para apoyar a los inmigrantes y hoy seguimos promoviendo el idioma, las tradiciones y el encuentro cultural.`}
              </p>
              <p class="text-gray-600 mb-8 leading-relaxed">
                {_`Con 136 años de historia, evolucionamos manteniendo nuestro corazón italiano, ofreciendo un espacio abierto a toda la comunidad.`}
              </p>
              <Link href={`/${currentLocale}/nosotros`}>
                <Button class="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  {_`Conoce nuestra historia`}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section class="py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-green-800 via-green-900 to-gray-900"></div>
        <div class="absolute inset-0 opacity-20 bg-[url('/images/pattern.png')]"></div>

        <div class="container mx-auto px-4 relative z-10 text-center">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6 font-serif tracking-tight">
            {_`¿Quieres formar parte?`}
          </h2>
          <p class="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            {_`Acércate a nuestra sede o contáctanos para conocer más sobre nuestras actividades, hacerte socio o presentar tu proyecto.`}
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={`/${currentLocale}/asociate`}>
              <Button class="w-full sm:w-auto bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1">
                {_`Quiero asociarme`}
              </Button>
            </Link>
            <Link href={`/${currentLocale}/contacto`}>
              <Button class="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-all">
                {_`Contactar`}
              </Button>
            </Link>
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
