import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { LuCalendar, LuClock, LuMapPin } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { _ } from "compiled-i18n";
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

// Utilidad para parsear fechas en formato "Día de la semana D de Mes - HShs" o "Lunes 17 de Marzo"
function parseEventoDate(dateStr: string): Date | null {
    // Intentar extraer día, mes y año
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const regex = /([0-9]{1,2}) de ([A-Za-záéíóúñ]+)(?: - (\d{1,2})h)?/i;
    const match = dateStr.match(regex);
    if (match) {
        const dia = parseInt(match[1], 10);
        const mes = meses.findIndex(m => m.toLowerCase() === match[2].toLowerCase());
        const anio = 2025; // Hardcodeado para este dataset
        if (mes >= 0) {
            return new Date(anio, mes, dia);
        }
    }
    // Si no matchea, intentar con otro formato (ej: "Lunes 17 de Marzo")
    const regex2 = /([0-9]{1,2}) de ([A-Za-záéíóúñ]+)/i;
    const match2 = dateStr.match(regex2);
    if (match2) {
        const dia = parseInt(match2[1], 10);
        const mes = meses.findIndex(m => m.toLowerCase() === match2[2].toLowerCase());
        const anio = 2025;
        if (mes >= 0) {
            return new Date(anio, mes, dia);
        }
    }
    return null;
}

const today = new Date(2025, 3, 27); // 27 de abril de 2025 (mes 3 = abril)

// Ordenar eventos por fecha descendente (más reciente primero)
const eventosOrdenados = [...eventos].sort((a, b) => {
    const fechaA = parseEventoDate(a.date) || new Date(1900, 0, 1);
    const fechaB = parseEventoDate(b.date) || new Date(1900, 0, 1);
    return fechaB.getTime() - fechaA.getTime();
});
const eventosProximos = eventosOrdenados.filter(e => {
    const fecha = parseEventoDate(e.date);
    return fecha && fecha >= today;
});
const eventosPasados = eventosOrdenados.filter(e => {
    const fecha = parseEventoDate(e.date);
    return fecha && fecha < today;
});

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col">
            <main class="flex-1">
                {/* Hero Section */}
                <section class="bg-green-600 py-16 text-white">
                    <div class="container mx-auto px-4">
                        <div class="text-center">
                            <h1 class="mb-4 text-4xl font-bold">{_`Eventos y Muestras`}</h1>
                            <p class="mx-auto mb-6 max-w-2xl text-lg">
                                {_`Descubre todas las actividades culturales, sociales y educativas que organizamos en el Círculo Italiano de Miramar`}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Próximos Eventos */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <h2 class="text-2xl font-bold mb-8 text-green-700">{_`Próximos eventos`}</h2>
                        <div class="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
                            {eventosProximos.length === 0 && (
                                <p class="col-span-2 text-gray-500">{_`No hay eventos próximos.`}</p>
                            )}
                            {eventosProximos.map((evento) => (
                                <div key={evento.id} class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div class="relative h-64 flex items-center justify-center bg-gray-100">
                                        {evento.imageComponent ? (
                                            <evento.imageComponent style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <img src={evento.image} alt={evento.title} class="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div class="p-6 border-b">
                                        <h3 class="text-xl font-medium">{evento.title}</h3>
                                        <div class="flex items-center gap-2 text-gray-600 mt-1">
                                            <LuCalendar class="h-4 w-4" />
                                            <span>{evento.date}</span>
                                        </div>
                                    </div>
                                    <div class="p-6">
                                        <p class="mb-4 text-gray-600">{evento.description}</p>
                                        <div class="flex items-center gap-2 text-sm text-gray-600">
                                            <LuMapPin class="h-4 w-4" />
                                            <span>{evento.location}</span>
                                        </div>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <Button look="primary" class="bg-green-600 hover:bg-green-700">
                                            <Link href={`/eventos/${evento.id}`}>{_`Más información`}</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Eventos Celebrados */}
                <section class="py-8 bg-white">
                    <div class="container mx-auto px-4">
                        <h2 class="text-2xl font-bold mb-8 text-gray-500">{_`Eventos celebrados`}</h2>
                        <div class="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
                            {eventosPasados.length === 0 && (
                                <p class="col-span-2 text-gray-400">{_`No hay eventos celebrados aún.`}</p>
                            )}
                            {eventosPasados.map((evento) => (
                                <div key={evento.id} class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow opacity-70">
                                    <div class="relative h-64 flex items-center justify-center bg-gray-100">
                                        {evento.imageComponent ? (
                                            <evento.imageComponent style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <img src={evento.image} alt={evento.title} class="w-full h-full object-cover" />
                                        )}
                                    </div>
                                    <div class="p-6 border-b">
                                        <h3 class="text-xl font-medium">{evento.title}</h3>
                                        <div class="flex items-center gap-2 text-gray-600 mt-1">
                                            <LuCalendar class="h-4 w-4" />
                                            <span>{evento.date}</span>
                                        </div>
                                    </div>
                                    <div class="p-6">
                                        <p class="mb-4 text-gray-600">{evento.description}</p>
                                        <div class="flex items-center gap-2 text-sm text-gray-600">
                                            <LuMapPin class="h-4 w-4" />
                                            <span>{evento.location}</span>
                                        </div>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <Button look="primary" class="bg-gray-400 opacity-80 cursor-default" disabled>
                                            {_`Finalizado`}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Calendar */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold">{_`Calendario de Actividades`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">
                                {_`Mantente al día con todas nuestras actividades y eventos`}
                            </p>
                        </div>

                        <div class="mx-auto max-w-4xl rounded-lg border p-6">
                            <div class="grid gap-4">
                                <div class="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <h3 class="font-bold">{_`Abril 2025`}</h3>
                                    </div>
                                    <div class="flex gap-2">
                                        <Button look="outline" size="sm">
                                            {_`Anterior`}
                                        </Button>
                                        <Button look="outline" size="sm">
                                            {_`Siguiente`}
                                        </Button>
                                    </div>
                                </div>

                                <div class="space-y-4">
                                    {[...eventos].sort((a, b) => {
                                        const fechaA = parseEventoDate(a.date) || new Date(1900, 0, 1);
                                        const fechaB = parseEventoDate(b.date) || new Date(1900, 0, 1);
                                        return fechaB.getTime() - fechaA.getTime();
                                    }).map((evento) => (
                                        <div key={evento.id} class="flex gap-4 border-b pb-4">
                                            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                                                <LuCalendar class="h-6 w-6" />
                                            </div>
                                            <div class="flex-1">
                                                <h4 class="font-medium">{evento.title}</h4>
                                                <div class="flex items-center gap-2 text-sm text-gray-600">
                                                    <LuClock class="h-4 w-4" />
                                                    <span>{evento.date}</span>
                                                </div>
                                            </div>
                                            <Button look="outline" size="sm">
                                                <Link href={`/eventos/${evento.id}`}>{_`Ver`}</Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section class="bg-green-600 py-16 text-white">
                    <div class="container mx-auto px-4 text-center">
                        <h2 class="mb-4 text-3xl font-bold">{_`¿Tienes un proyecto cultural?`}</h2>
                        <p class="mx-auto mb-8 max-w-2xl text-lg">
                            {_`Acércanos tu propuesta. Estamos abiertos a colaboraciones y nuevas iniciativas culturales.`}
                        </p>
                        <Button look="outline" size="lg" class="bg-white text-green-600 hover:bg-white/90">
                            <Link href="/contacto?asunto=proyecto">{_`Presentar proyecto`}</Link>
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Eventos y Muestras - Círculo Italiano Joven Italia`,
    meta: [
        {
            name: "description",
            content: _`Descubre los eventos culturales, sociales y educativos organizados por el Círculo Italiano de Miramar. Muestras, cenas, charlas y más.`,
        },
    ],
};
