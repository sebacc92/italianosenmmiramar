import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import { LuCalendar, LuMapPin } from "@qwikest/icons/lucide";
import HeroSlider from "~/components/HeroSlider/HeroSlider";
import { Button, Card } from "~/components/ui";
import ImageStory from "~/media/story.jpg?h=500&jsx";
import EventoAniversarioImg from '~/media/eventos1.png?jsx';
import EventoMalvinasImg from '~/media/eventos2.png?jsx';
import MuseoRodanteImg from '~/media/museo-rodante.webp?jsx';
import EventoVideoconferenciaImg from '~/media/videoconferencia1.jpeg?jsx';
import EventoAntilefIuraImg from '~/media/eventos3.webp?jsx';

const eventos = [
    {
        id: "aniversario-136",
        title: "136° Aniversario - Cena, baile y algo más!",
        date: "Sábado 10 de Mayo - 21:30hs",
        imageComponent: EventoMalvinasImg,
        description:
            "¡Celebramos nuestros inicios! Cena, baile y algo más. Anticipadas hasta el 8/05: Socios $23.000, No socios $27.000. Entrada general desde el 9/05: $32.000.",
        location: "Mutual Cultural Círculo Italiano Joven Italia, Miramar",
    },
    {
        id: "peones-malvinas",
        title: "Peones de Malvinas - Anhelando verte otra vez",
        date: "Martes 6 de Mayo - 10hs y 15:30hs",
        imageComponent: EventoAniversarioImg,
        description:
            "Obra de la Escuela de danza Ritmos en Acción. La historia de una madre que extraña a su hijo, de un hijo que necesita a su mamá, de un pueblo que llora y sueña libertad. Entrada general: $4.000. Valor especial escuelas: $2.000. Reservas por WhatsApp: 223 4219060.",
        location: "Mutual Cultural Círculo Italiano Joven Italia, Miramar",
    },
    {
        id: "bienal-arte-2025",
        title: "Bienal de Arte 2025",
        date: "Sábado 5 de Abril - 19hs",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cP9qd0B8BbVFb6VnIrSYDYaeOtYGVw.png",
        description:
            "Muestra de arte pequeño formato. Destacándose la presentación de una obra de Raquel Forner, proveniente del Museo Pcial. de Bellas Artes, Emilio Pettoruti.",
        location: "Mutual Cultural Círculo Italiano, Calle 24 n1214",
    },
    {
        id: "cena-bienal-2025",
        title: "Cena Bienal 2025",
        date: "Jueves 10 de Abril - 21hs",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-d9PNSvU4MNqCngV983dWaJ93rqNoK3.png",
        description:
            "Menú: Bruschette, lasagne, fragole con panna montata, bebidas. Precios: Socios $20.000, No socios $25.000. Anticipadas hasta martes 8/04 $18.000 socios y $23.000 no socios.",
        location: "Mutual Cultural Círculo Italiano, Calle 24 n1214",
    },
    {
        id: "charla-museo-rodante",
        title: "Charla: Un Museo Rodante",
        date: "Jueves 11 de Abril - 17:30hs",
        imageComponent: MuseoRodanteImg,
        description:
            "Importante charla a cargo de Federico Rovituso: 'Un Museo Rodante' con colecciones e historias del Museo Provincial de Bellas Artes Emilio Pettoruti.",
        location: "Mutual Cultural Círculo Italiano, Calle 24 n1214",
    },
    {
        id: "inicio-clases-italiano",
        title: "Inicio Clases de Italiano",
        date: "Lunes 17 de Marzo",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1RsMvba8MpkNeAZHIRkhdrxBiRwPSj.png",
        description:
            "Arranca el ciclo lectivo 2025 de clases de Italiano, con sus diferentes niveles y propuestas para todas las edades. Inscripciones abiertas hasta el 4 de abril.",
        location: "Mutual Cultural Círculo Italiano, Calle 24 n1214",
    },
    {
        id: "videoconferencia-renacimiento-italia",
        title: "El Renacimiento en Italia: cultura y sociedad",
        date: "Viernes 25 de Abril - 17:30hs",
        imageComponent: EventoVideoconferenciaImg,
        description:
            "Videoconferencia a cargo de Eduardo Crivelli Minutti. El Renacimiento en Italia fue un periodo de transformación cultural que marcó el paso de la Edad Media a la modernidad, recuperando la herencia clásica y promoviendo el humanismo.",
        location: "Via Zoom y presencial en Mutual Cultural Italiana, calle 24 n1214",
    },
    {
        id: "antilef-iura-expo-2025",
        title: "Exposición Antilef Iura + Música",
        date: "Sábado 26 de Abril - 18hs",
        imageComponent: EventoAntilefIuraImg,
        description: "Exposición de arte y música en la Mutual Cultural Círculo Italiano Joven Italia. Obras de Antilef Iura y acompañamiento musical. ¡No te lo pierdas!",
        location: "Mutual Cultural Círculo Italiano Joven Italia, Miramar",
    },
];

function parseEventoDate(dateStr: string): Date | null {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const regex = /([0-9]{1,2}) de ([A-Za-záéíóúñ]+)/i; // Simplificado para buscar día y mes
    const match = dateStr.match(regex);
    if (match) {
        const dia = parseInt(match[1], 10);
        const mesStr = match[2].toLowerCase();
        const mes = meses.findIndex(m => m === mesStr);
        const anio = new Date().getFullYear(); // Usar año actual o ajustar si es necesario

        // Heurística para manejar eventos del próximo año si el mes ya pasó
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentDay = now.getDate();
        const finalYear = anio;
        if (mes < currentMonth || (mes === currentMonth && dia < currentDay)) {
             // Si la fecha del evento ya pasó este año, asumimos que es del próximo año
             // Esto podría necesitar ajustes si los eventos abarcan más de un año
            // finalYear = anio + 1; // Descomentar si es necesario
        }

        if (mes >= 0) {
            // Nota: Date() usa mes 0-indexado
            return new Date(finalYear, mes, dia);
        }
    }
    return null;
}

// Fecha actual para filtrar eventos
const today = new Date();
today.setHours(0, 0, 0, 0); // Asegurar comparación solo por fecha

// Ordenar eventos por fecha ascendente (más próximo primero)
const eventosOrdenados = [...eventos]
    .map(e => ({ ...e, fechaObj: parseEventoDate(e.date) }))
    .filter(e => e.fechaObj) // Filtrar eventos sin fecha parseable
    .sort((a, b) => a.fechaObj!.getTime() - b.fechaObj!.getTime());

// Filtrar solo eventos futuros
const eventosProximos = eventosOrdenados.filter(e => e.fechaObj! >= today);

export default component$(() => {
  return (
    <>
      <HeroSlider />

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
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* Tarjeta Idiomas */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-xl bg-white/90 shadow-md hover:-translate-y-1 relative overflow-hidden">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-xl" />
              <Card.Header>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Idiomas`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Aprende italiano e inglés con nuestros diferentes niveles y propuestas para todas las edades.`}</Card.Description>
              </Card.Header>
              <Card.Footer class="flex gap-3">
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href="/clases/italiano" class="w-full">
                    {_`Italiano`}
                  </Link>
                </Button>
                <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                  <Link href="/clases/ingles" class="w-full">
                    {_`Inglés`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Eventos */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-xl bg-white/90 shadow-md hover:-translate-y-1 relative overflow-hidden">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-xl" />
              <Card.Header>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Eventos Culturales`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Exposiciones, muestras, charlas y eventos que promueven la cultura italiana.`}</Card.Description>
              </Card.Header>
              <Card.Footer>
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href="/eventos" class="w-full">
                    {_`Ver agenda`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Trámites */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-xl bg-white/90 shadow-md hover:-translate-y-1 relative overflow-hidden">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-xl" />
              <Card.Header>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Trámites de Ciudadanía`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Asesoramiento y apoyo en los trámites para obtener la ciudadanía italiana.`}</Card.Description>
              </Card.Header>
              <Card.Footer>
                <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                  <Link href="/tramites" class="w-full">
                    {_`Asesoría`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Danzas Ritmos Latinos */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-xl bg-white/90 shadow-md hover:-translate-y-1 relative overflow-hidden">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-xl" />
              <Card.Header>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`danzas_ritmos_latinos`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Clases y talleres de danzas latinas para todas las edades. Vení a moverte y divertirte aprendiendo ritmos como salsa, bachata y más.`}</Card.Description>
              </Card.Header>
              <Card.Footer>
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href="/clases" class="w-full">
                    {_`Ver más`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Nutrición */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-xl bg-white/90 shadow-md hover:-translate-y-1 relative overflow-hidden">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-xl" />
              <Card.Header>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Nutrición`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Charlas, talleres y asesoramiento sobre alimentación saludable y bienestar, a cargo de profesionales.`}</Card.Description>
              </Card.Header>
              <Card.Footer>
                <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                  <Link href="/eventos" class="w-full">
                    {_`Próximas actividades`}
                  </Link>
                </Button>
              </Card.Footer>
            </Card.Root>
            {/* Tarjeta Exposición de obras */}
            <Card.Root class="transition duration-300 ease-in-out hover:shadow-xl border border-green-600 rounded-xl bg-white/90 shadow-md hover:-translate-y-1 relative overflow-hidden">
              <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-xl" />
              <Card.Header>
                <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{_`Exposición de obras`}</Card.Title>
                <Card.Description class="text-gray-600">{_`Espacio para artistas locales y regionales. Exhibiciones de pintura, fotografía y otras expresiones artísticas.`}</Card.Description>
              </Card.Header>
              <Card.Footer>
                <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                  <Link href="/eventos" class="w-full">
                    {_`Ver exposiciones`}
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
          <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {eventosProximos.length === 0 && (
              <p class="col-span-full text-center text-gray-500">{_`No hay eventos próximos programados.`}</p>
            )}
            {eventosProximos.slice(0, 3).map((evento) => ( // Mostrar solo los primeros 3
              <Card.Root key={evento.id} class="transition duration-300 ease-in-out hover:shadow-xl border border-red-600 rounded-xl bg-white/90 shadow-md hover:-translate-y-1 relative overflow-hidden flex flex-col">
                <div class="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600 rounded-t-xl" />
                {/* Imagen del evento */}
                <div class="relative h-48 w-full bg-gray-200 flex items-center justify-center overflow-hidden mt-1 rounded-t-xl">
                  {evento.imageComponent ? (
                    <evento.imageComponent class="h-full w-full object-cover" />
                  ) : evento.image ? (
                    <img src={evento.image} alt={evento.title} class="h-full w-full object-cover" />
                  ) : (
                    <LuCalendar class="h-16 w-16 text-gray-400" /> // Placeholder si no hay imagen
                  )}
                </div>
                <Card.Header class="pt-4">
                  <Card.Title class="text-xl text-gray-800 font-serif tracking-wide">{evento.title}</Card.Title>
                  <div class="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    <LuCalendar class="h-4 w-4 flex-shrink-0" />
                    <span>{evento.date}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <LuMapPin class="h-4 w-4 flex-shrink-0" />
                    <span>{evento.location}</span>
                  </div>
                </Card.Header>
                {/* Opcional: Añadir descripción corta si se desea */}
                {/* <Card.Content class="flex-grow">
                  <p class="text-gray-600 text-sm line-clamp-3">{evento.description}</p>
                </Card.Content> */}
                <Card.Footer class="mt-auto pt-4">
                  <Button class="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-red-700">
                    <Link href={`/eventos/${evento.id}`} class="w-full">
                      {_`Ver más`}
                    </Link>
                  </Button>
                </Card.Footer>
              </Card.Root>
            ))}
          </div>
          {eventosProximos.length > 3 && ( // Mostrar botón "Ver todos" solo si hay más de 3 eventos
            <div class="text-center mt-12">
              <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                <Link href="/eventos">
                  {_`Ver todos los eventos`}
                </Link>
              </Button>
            </div>
          )}
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
                <Link href="/historia">
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
                  <Link href="/contacto" class="w-full">
                    <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700">
                      {_`Hazte socio`}
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link href="/proyectos" class="w-full">
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
  title: _`Mutual Cultural Círculo Italiano Joven Italia - Miramar`,
  meta: [
    {
      name: "description",
      content: _`Descubre el Círculo Italiano Joven Italia en Miramar. Clases de italiano e inglés, eventos culturales, trámites de ciudadanía y más. 136 años promoviendo la cultura italiana.`,
    },
  ],
};
