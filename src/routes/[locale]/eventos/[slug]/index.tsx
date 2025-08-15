import { component$ } from "@builder.io/qwik";
import { useLocation, Link } from "@builder.io/qwik-city";
import { LuCalendar, LuMapPin } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import EventoAniversarioImg from '~/media/eventos1.png?jsx';
import EventoMalvinasImg from '~/media/eventos2.png?jsx';
import MuseoRodanteImg from '~/media/museo-rodante.webp?jsx';
import EventoVideoconferenciaImg from '~/media/videoconferencia1.jpeg?jsx';
import EventoAntilefIuraImg from '~/media/eventos3.webp?jsx';
import { _ } from "compiled-i18n";

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
    image: "/images/placeholder-evento.jpg",
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
      "Videoconferencia a cargo de Eduardo Crivelli Minutti. El Renacimiento en Italia fue un periodo de transformación cultural que marcó el paso de la Edad Media a la modernidad, recuperando la herencia clásica y promoviendo el humanismo. Ciudades como Florencia, Venecia y Roma se destacaron por su innovación artística y cambios sociales, políticos y económicos que influyeron en el pensamiento moderno.",
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

export default component$(() => {
  const loc = useLocation();
  const slug = loc.params.slug;
  const evento = eventos.find((e) => e.id === slug);

  if (!evento) {
    return (
      <div class="container mx-auto px-4 py-16 text-center">
        <h1 class="text-2xl font-bold mb-4">{_`Evento no encontrado`}</h1>
        <Link href="/eventos" class="text-red-600 underline">{_`Volver a eventos`}</Link>
      </div>
    );
  }

  return (
    <section class="py-12 bg-white min-h-screen">
      <div class="container mx-auto px-4 max-w-3xl">
        <div class="mb-8">
          <Link href="/eventos" class="text-red-600 hover:underline text-sm">← {_`Volver a eventos`}</Link>
        </div>
        {evento.imageComponent ? (
          <div class="w-full flex justify-center items-center bg-gray-100 rounded-xl mb-8" style={{ minHeight: '320px', maxHeight: '480px', height: 'auto' }}>
            <evento.imageComponent style={{ maxWidth: '100%', maxHeight: '480px', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '1rem' }} />
          </div>
        ) : (
          <div class="w-full flex justify-center items-center bg-gray-100 rounded-xl mb-8" style={{ minHeight: '320px', maxHeight: '480px', height: 'auto' }}>
            <img src={evento.image} alt={evento.title} style={{ maxWidth: '100%', maxHeight: '480px', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '1rem' }} />
          </div>
        )}
        <h1 class="text-3xl md:text-4xl font-bold mb-4">{evento.title}</h1>
        <div class="flex flex-wrap gap-6 text-gray-600 mb-6 text-lg">
          <span class="flex items-center gap-2"><LuCalendar class="h-5 w-5" /> {evento.date}</span>
          <span class="flex items-center gap-2"><LuMapPin class="h-5 w-5" /> {evento.location}</span>
        </div>
        <p class="text-gray-700 text-lg mb-8">{evento.description}</p>
        <Link href="/contacto">
          <Button class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md border-2 border-green-700 px-8 py-2">
            Consultar
          </Button>
        </Link>
      </div>
    </section>
  );
});
