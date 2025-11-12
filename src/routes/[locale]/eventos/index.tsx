import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { LuCalendar, LuClock, LuMapPin } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { _, getLocale } from "compiled-i18n";
import qs from "qs";

const BASE_URL = import.meta.env.VITE_STRAPI_URL;

interface StrapiEvento {
  id: number;
  documentId: string;
  titulo: string;
  fecha: string;
  lugar: string;
  destacado: boolean;
  description: string;
  imagen_principal:
    | {
        url: string;
        formats?: {
          thumbnail?: { url: string; width?: number; height?: number };
          small?: { url: string; width?: number; height?: number };
          medium?: { url: string; width?: number; height?: number };
          large?: { url: string; width?: number; height?: number };
        };
        width?: number;
        height?: number;
        alternativeText?: string | null;
      }
    | null;
  galeria?:
    | Array<{
        url: string;
        formats?: {
          thumbnail?: { url: string; width?: number; height?: number };
          small?: { url: string; width?: number; height?: number };
          medium?: { url: string; width?: number; height?: number };
          large?: { url: string; width?: number; height?: number };
        };
      }>
    | null;
}

// Tipo para evento formateado
interface EventoFormateado {
  id: string;
  title: string;
  date: string;
  dateObj: Date;
  description: string;
  location: string;
  image: string | null;
  imageLarge: string | null;
  imageAlt: string | null;
  imageSrcSet: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  imageThumb: string | null;
  destacado: boolean;
  galeria?: Array<{ url: string }>;
}

// Función para formatear fecha en español
function formatDate(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diaSemana = diasSemana[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();

  let dateStr = `${diaSemana} ${dia} de ${mes}`;
  if (hora > 0 || minutos > 0) {
    const horaStr = hora.toString().padStart(2, "0");
    const minutosStr = minutos.toString().padStart(2, "0");
    dateStr += ` - ${horaStr}:${minutosStr}hs`;
  }

  return dateStr;
}

// Utils para URLs absolutas desde Strapi
function absolutize(url: string): string {
  const baseUrl = BASE_URL.replace(/\/$/, "");
  return url.startsWith("http") ? url : `${baseUrl}${url}`;
}

// Función para obtener URL de imagen optimizada de Strapi
function getStrapiImageUrl(
  imagen: StrapiEvento["imagen_principal"],
  size:
    | "thumbnail"
    | "small"
    | "medium"
    | "large"
    | "original" = "medium"
): string | null {
  if (!imagen) return null;

  const imageUrl = absolutize(imagen.url);

  // Si hay formato específico solicitado y existe, usarlo
  if (size !== "original" && imagen.formats && imagen.formats[size]) {
    const format = imagen.formats[size];
    if (format) {
      return absolutize(format.url);
    }
  }

  return imageUrl;
}

// Genera srcset desde los formats de Strapi + original
function getStrapiImageSrcSet(
  imagen: StrapiEvento["imagen_principal"]
): string | null {
  if (!imagen) return null;

  const srcset: string[] = [];

  const pushIf = (
    fmt?: { url: string; width?: number },
    fallbackW?: number
  ) => {
    if (!fmt) return;
    const url = absolutize(fmt.url);
    const width = fmt.width || fallbackW;
    if (url && width) srcset.push(`${url} ${width}w`);
  };

  if (imagen.formats) {
    pushIf(imagen.formats.thumbnail, 156);
    pushIf(imagen.formats.small, 500);
    pushIf(imagen.formats.medium, 750);
    pushIf(imagen.formats.large, 1000);
  }

  // Original como fallback (máxima resolución)
  const originalUrl = absolutize(imagen.url);
  if (imagen.width) {
    srcset.push(`${originalUrl} ${imagen.width}w`);
  } else if (imagen.formats?.large?.width) {
    const largeWidth = imagen.formats.large.width;
    srcset.push(`${originalUrl} ${Math.round(largeWidth * 1.5)}w`);
  } else {
    srcset.push(`${originalUrl} 1920w`);
  }

  return srcset.length > 0 ? srcset.join(", ") : null;
}

// RouteLoader para obtener eventos de Strapi
export const useEventos = routeLoader$(async () => {
  try {
    const query = qs.stringify(
      {
        populate: "*",
        sort: ["fecha:desc"], // Ordenar por fecha descendente (más reciente primero)
      },
      { encodeValuesOnly: true }
    );

    const res = await fetch(`${BASE_URL}/api/eventos?${query}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch eventos from Strapi: ${res.status}`);
    }

    const data = (await res.json()) as { data: StrapiEvento[] };

    // Mapear eventos de Strapi al formato que necesitamos
    const eventosFormateados: EventoFormateado[] = data.data.map((evento) => {
      const fechaObj = new Date(evento.fecha);
      const imageUrl = getStrapiImageUrl(evento.imagen_principal, "medium");
      const imageLargeUrl =
        getStrapiImageUrl(evento.imagen_principal, "large") ||
        getStrapiImageUrl(evento.imagen_principal, "original");
      const imageSrcSet = getStrapiImageSrcSet(evento.imagen_principal);
      const imageThumb = getStrapiImageUrl(
        evento.imagen_principal,
        "thumbnail"
      );

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

    // Ordenar por fecha (más reciente primero)
    eventosFormateados.sort(
      (a, b) => b.dateObj.getTime() - a.dateObj.getTime()
    );

    return eventosFormateados;
  } catch (error) {
    console.error("Error fetching eventos:", error);
    return [];
  }
});

// Card de evento con imagen cuadrada, placeholder blur y acento italiano
const EventCard = component$(
  (props: {
    evento: EventoFormateado;
    currentLocale: string;
    isPast?: boolean;
    highPriority?: boolean; // Para el primer evento próximo (LCP)
  }) => {
    const { evento, currentLocale, isPast, highPriority } = props;
    const isLoaded = useSignal(false);

    const sizesAttr =
      "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

    return (
      <div
        key={evento.id}
        class={[
          "group rounded-xl border overflow-hidden shadow-sm transition-all duration-300 bg-white",
          isPast ? "opacity-70" : "hover:shadow-md hover:-translate-y-0.5",
        ].join(" ")}
      >
        {/* Banda tricolor italiana */}
        <div class="h-1 w-full bg-gradient-to-r from-green-600 via-white to-red-600" />

        {/* Imagen cuadrada con placeholder blur */}
        <div class="relative aspect-square bg-gray-100">
          {/* Placeholder blur (thumbnail) */}
          <div
            class={[
              "absolute inset-0",
              "bg-gray-100",
              evento.imageThumb ? "opacity-100" : "opacity-0",
              "transition-opacity duration-500",
            ].join(" ")}
            style={{
              backgroundImage: evento.imageThumb
                ? `url('${evento.imageThumb}')`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
              transform: "scale(1.05)",
              opacity: isLoaded.value ? "0" : "1",
            }}
          />

          {/* Imagen principal responsive desde Strapi */}
          {evento.image ? (
            <img
              src={evento.image}
              srcset={evento.imageSrcSet || undefined}
              alt={evento.imageAlt || evento.title}
              width={evento.imageWidth || 1200}
              height={evento.imageHeight || 1200}
              class="absolute inset-0 h-full w-full object-cover object-center"
              loading={highPriority ? "eager" : "lazy"}
              decoding={highPriority ? "sync" : "async"}
              fetchPriority={highPriority ? "high" : "auto"}
              sizes={sizesAttr}
              onLoad$={() => {
                isLoaded.value = true;
              }}
            />
          ) : (
            <div class="absolute inset-0 flex items-center justify-center text-gray-300">
              <LuCalendar class="h-16 w-16" />
            </div>
          )}

          {/* Badge de destacado */}
          {evento.destacado && !isPast && (
            <span class="absolute left-2 top-2 rounded-md bg-green-600/90 px-2 py-1 text-xs font-semibold text-white shadow-sm">
              {_`Destacado`}
            </span>
          )}
        </div>

        {/* Contenido */}
        <div class="p-6 border-b">
          <h3 class="text-xl font-semibold text-gray-900">{evento.title}</h3>
          <div class="mt-2 flex items-center gap-2 text-gray-600">
            <LuCalendar class="h-4 w-4" />
            <span>{evento.date}</span>
          </div>
        </div>

        <div class="p-6">
          <div class="mb-4 text-gray-600 line-clamp-3">{evento.description}</div>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <LuMapPin class="h-4 w-4" />
            <span>{evento.location}</span>
          </div>
        </div>

        <div class="p-6 pt-0">
          <Button
            look="primary"
            class="bg-green-600 hover:bg-green-700 transition-colors"
          >
            <Link href={`/${currentLocale}/eventos/${evento.id}`}>
              {_`Más información`}
            </Link>
          </Button>
          {isPast && (
            <Button
              look="primary"
              class="bg-gray-300 text-gray-700 cursor-default ml-4"
              disabled
            >
              {_`Finalizado`}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

export default component$(() => {
  const currentLocale = getLocale();
  const eventosSignal = useEventos();
  const eventos = eventosSignal.value;

  // Obtener la fecha de hoy, normalizada a medianoche para comparar solo fechas (sin hora)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Clasificar eventos en próximos y pasados basándose en la fecha actual
  const eventosProximos = eventos.filter((e) => {
    const fecha = new Date(e.dateObj);
    fecha.setHours(0, 0, 0, 0);
    return fecha >= today;
  });

  const eventosPasados = eventos.filter((e) => {
    const fecha = new Date(e.dateObj);
    fecha.setHours(0, 0, 0, 0);
    return fecha < today;
  });

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
            <h2 class="text-2xl font-bold mb-8 text-green-700">
              {_`Próximos eventos`}
            </h2>
            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {eventosProximos.length === 0 && (
                <p class="col-span-2 text-gray-500">
                  {_`No hay eventos próximos.`}
                </p>
              )}
              {eventosProximos.map((evento, idx) => (
                <EventCard
                  key={evento.id}
                  evento={evento}
                  currentLocale={currentLocale}
                  highPriority={idx === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Eventos Celebrados */}
        <section class="py-8 bg-white">
          <div class="container mx-auto px-4">
            <h2 class="text-2xl font-bold mb-8 text-gray-500">
              {_`Eventos celebrados`}
            </h2>
            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {eventosPasados.length === 0 && (
                <p class="col-span-2 text-gray-400">
                  {_`No hay eventos celebrados aún.`}
                </p>
              )}
              {eventosPasados.map((evento) => (
                <EventCard
                  key={evento.id}
                  evento={evento}
                  currentLocale={currentLocale}
                  isPast
                />
              ))}
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section class="py-16 bg-white">
          <div class="container mx-auto px-4">
            <div class="mb-12 text-center">
              <h2 class="mb-2 text-3xl font-bold">
                {_`Calendario de Actividades`}
              </h2>
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
                  {eventos.map((evento) => (
                    <div key={evento.id} class="flex gap-4 border-b pb-4">
                      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-gray-100">
                        <LuCalendar class="h-6 w-6 text-gray-600" />
                      </div>
                      <div class="flex-1">
                        <h4 class="font-medium">{evento.title}</h4>
                        <div class="flex items-center gap-2 text-sm text-gray-600">
                          <LuClock class="h-4 w-4" />
                          <span>{evento.date}</span>
                        </div>
                      </div>
                      <Button look="outline" size="sm">
                        <Link href={`/${currentLocale}/eventos/${evento.id}`}>
                          {_`Ver`}
                        </Link>
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
            <h2 class="mb-4 text-3xl font-bold">
              {_`¿Tienes un proyecto cultural?`}
            </h2>
            <p class="mx-auto mb-8 max-w-2xl text-lg">
              {_`Acércanos tu propuesta. Estamos abiertos a colaboraciones y nuevas iniciativas culturales.`}
            </p>
            <Button
              look="outline"
              size="lg"
              class="bg-white text-green-600 hover:bg-white/90"
            >
              <Link href={`/${currentLocale}/contacto?asunto=proyecto`}>
                {_`Presentar proyecto`}
              </Link>
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
      content:
        _`Descubre los eventos culturales, sociales y educativos organizados por el Círculo Italiano de Miramar. Muestras, cenas, charlas y más.`,
    },
  ],
};