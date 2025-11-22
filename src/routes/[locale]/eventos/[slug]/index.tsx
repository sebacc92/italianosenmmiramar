import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { Link, type DocumentHead, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { LuCalendar, LuMapPin, LuArrowLeft } from "@qwikest/icons/lucide";
import { Modal } from "~/components/ui";
import EventoConsultaForm from "~/components/EventoConsultaForm";
import { _, getLocale } from "compiled-i18n";
import qs from 'qs';

const BASE_URL = import.meta.env.VITE_STRAPI_URL;

// Tipo para evento de Strapi
interface StrapiEvento {
  id: number;
  documentId: string;
  titulo: string;
  fecha: string;
  lugar: string;
  destacado: boolean;
  description: string;
  imagen: {
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
  } | null;
  galeria?: Array<{
    url: string;
    formats?: {
      thumbnail?: { url: string; width?: number; height?: number };
      small?: { url: string; width?: number; height?: number };
      medium?: { url: string; width?: number; height?: number };
      large?: { url: string; width?: number; height?: number };
    };
  }> | null;
}

// Función para formatear fecha en español
function formatDate(fechaISO: string): string {
  const fecha = new Date(fechaISO);
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const diaSemana = diasSemana[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const hora = fecha.getHours();
  const minutos = fecha.getMinutes();

  let dateStr = `${diaSemana} ${dia} de ${mes}`;
  if (hora > 0 || minutos > 0) {
    const horaStr = hora.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');
    dateStr += ` - ${horaStr}:${minutosStr}hs`;
  }

  return dateStr;
}

// Función para obtener URL de imagen optimizada de Strapi
function getStrapiImageUrl(imagen: StrapiEvento['imagen'], size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'large'): string | null {
  if (!imagen) return null;

  const baseUrl = BASE_URL.replace(/\/$/, '');
  const imageUrl = imagen.url.startsWith('http') ? imagen.url : `${baseUrl}${imagen.url}`;

  if (size !== 'original' && imagen.formats && imagen.formats[size]) {
    const format = imagen.formats[size];
    if (format) {
      const formatUrl = format.url;
      return formatUrl.startsWith('http') ? formatUrl : `${baseUrl}${formatUrl}`;
    }
  }

  return imageUrl;
}

// Función para generar srcset para imágenes responsivas
function getStrapiImageSrcSet(imagen: StrapiEvento['imagen']): string | null {
  if (!imagen || !imagen.formats) return null;

  const baseUrl = BASE_URL.replace(/\/$/, '');
  const srcset: string[] = [];

  if (imagen.formats.thumbnail) {
    const thumbnail = imagen.formats.thumbnail;
    const url = thumbnail.url.startsWith('http') ? thumbnail.url : `${baseUrl}${thumbnail.url}`;
    const width = thumbnail.width || 156;
    srcset.push(`${url} ${width}w`);
  }
  if (imagen.formats.small) {
    const small = imagen.formats.small;
    const url = small.url.startsWith('http') ? small.url : `${baseUrl}${small.url}`;
    const width = small.width || 500;
    srcset.push(`${url} ${width}w`);
  }
  if (imagen.formats.medium) {
    const medium = imagen.formats.medium;
    const url = medium.url.startsWith('http') ? medium.url : `${baseUrl}${medium.url}`;
    const width = medium.width || 750;
    srcset.push(`${url} ${width}w`);
  }
  if (imagen.formats.large) {
    const large = imagen.formats.large;
    const url = large.url.startsWith('http') ? large.url : `${baseUrl}${large.url}`;
    const width = large.width || 1000;
    srcset.push(`${url} ${width}w`);
  }

  const originalUrl = imagen.url.startsWith('http') ? imagen.url : `${baseUrl}${imagen.url}`;
  if (imagen.width) {
    srcset.push(`${originalUrl} ${imagen.width}w`);
  } else if (imagen.formats?.large?.width) {
    const largeWidth = imagen.formats.large.width;
    srcset.push(`${originalUrl} ${Math.round(largeWidth * 1.5)}w`);
  } else {
    srcset.push(`${originalUrl} 1920w`);
  }

  return srcset.length > 0 ? srcset.join(', ') : null;
}

// RouteLoader para obtener un evento específico de Strapi
export const useEvento = routeLoader$(async ({ params }) => {
  const slug = params.slug;

  try {
    // Buscar por documentId o id
    const query = qs.stringify(
      {
        populate: '*',
      },
      { encodeValuesOnly: true }
    );

    const res = await fetch(`${BASE_URL}/api/eventos/${slug}?${query}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch evento from Strapi: ${res.status}`);
    }

    const data = await res.json() as { data: StrapiEvento };

    console.log('data2', data);
    if (!data.data) {
      return null;
    }

    const eventoStrapi = data.data;
    const imageUrl = getStrapiImageUrl(eventoStrapi.imagen, 'large');
    const imageSrcSet = getStrapiImageSrcSet(eventoStrapi.imagen);

    return {
      id: eventoStrapi.documentId || eventoStrapi.id.toString(),
      title: eventoStrapi.titulo,
      date: formatDate(eventoStrapi.fecha),
      description: eventoStrapi.description,
      location: eventoStrapi.lugar,
      image: imageUrl,
      imageSrcSet: imageSrcSet,
      imageAlt: eventoStrapi.imagen?.alternativeText || eventoStrapi.titulo,
      imageWidth: eventoStrapi.imagen?.width || null,
      imageHeight: eventoStrapi.imagen?.height || null,
      destacado: eventoStrapi.destacado,
      galeria: eventoStrapi.galeria?.map(img => {
        const baseUrl = BASE_URL.replace(/\/$/, '');
        return {
          url: img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`
        };
      }),
    };
  } catch (error) {
    console.error('Error fetching evento:', error);
    return null;
  }
});

export const useEventoConsulta = routeAction$(async (data, requestEvent) => {
  // EmailJS
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_EVENTO_CONSULTA_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_EVENTO_CONSULTA_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const PRIVATE_KEY = requestEvent.env.get('EMAILJS_PRIVATE_KEY');

  if (!SERVICE_ID || !TEMPLATE_EVENTO_CONSULTA_ID || !PUBLIC_KEY || !PRIVATE_KEY) {
    console.error('Faltan credenciales de EmailJS');
    return { success: false, message: 'Faltan credenciales de EmailJS en el servidor.' };
  }

  const payload = {
    nombre: (data as any).nombre,
    email: (data as any).email,
    telefono: (data as any).telefono || 'No proporcionado',
    mensaje: (data as any).mensaje,
    eventoTitle: (data as any).eventoTitle,
  };

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_EVENTO_CONSULTA_ID,
        user_id: PUBLIC_KEY,
        template_params: payload,
        accessToken: PRIVATE_KEY,
      }),
    });

    if (!res.ok) {
      throw new Error(`EmailJS request failed with status ${res.status}`);
    }

    return {
      success: true,
      message: '¡Consulta enviada! Te contactaremos pronto.',
    };
  } catch (err) {
    console.error('EmailJS FAILED...', err);
    return {
      success: false,
      message: 'Error al enviar la consulta. Intenta nuevamente.',
    };
  }
});

export default component$(() => {
  const currentLocale = getLocale();
  const eventoSignal = useEvento();
  const evento = eventoSignal.value;
  const showConsultaModal = useSignal(false);
  const toastMessage = useSignal<{ type: 'success' | 'error'; message: string } | null>(null);

  // Asegurar que el modal esté cerrado cuando el componente se monta en el cliente
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (showConsultaModal.value) {
      showConsultaModal.value = false;
    }
  });

  const onCloseModal$ = $(() => {
    showConsultaModal.value = false;
  });

  const onShowToast$ = $((p: { type: 'success' | 'error'; message: string }) => {
    toastMessage.value = p;
    setTimeout(() => {
      toastMessage.value = null;
    }, 5000);
  });

  if (!evento) {
    return (
      <div class="container mx-auto px-4 py-16 text-center">
        <h1 class="text-2xl font-bold mb-4">{_`Evento no encontrado`}</h1>
        <Link href={`/${currentLocale}/eventos`} class="text-red-600 underline">{_`Volver a eventos`}</Link>
      </div>
    );
  }

  return (
    <section class="py-8 md:py-16 bg-gray-50 min-h-screen">
      <div class="container mx-auto px-4 max-w-6xl">
        {/* Botón volver */}
        <div class="mb-6">
          <Link
            href={`/${currentLocale}/eventos`}
            class="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors group"
          >
            <LuArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{_`Volver a eventos`}</span>
          </Link>
        </div>

        {/* Contenedor principal con fondo blanco y sombra */}
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Imagen del evento */}
          <div class="w-full mb-8 md:mb-12">
            {evento.image ? (
              <div class="w-full flex justify-center items-center p-4 md:p-8">
                <img
                  src={evento.image}
                  srcset={evento.imageSrcSet || undefined}
                  alt={evento.imageAlt || evento.title}
                  width={evento.imageWidth || 1200}
                  height={evento.imageHeight || 630}
                  class="max-w-full h-auto rounded-xl shadow-xl"
                  loading="lazy"
                  decoding="async"
                  sizes="100vw"
                />
              </div>
            ) : (
              <div class="w-full flex justify-center items-center p-4 md:p-8 bg-gray-100 rounded-xl">
                <div class="text-gray-400 text-center">
                  <LuCalendar class="h-24 w-24 mx-auto mb-4" />
                  <p class="text-lg">Sin imagen disponible</p>
                </div>
              </div>
            )}
          </div>

          {/* Galería si está disponible */}
          {evento.galeria && evento.galeria.length > 0 && (
            <div class="mb-8 px-6 md:px-12">
              <h3 class="text-xl font-semibold mb-4">{_`Galería`}</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                {evento.galeria.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`${evento.title} - ${index + 1}`}
                    class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    loading="lazy"
                    width={400}
                    height={300}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Contenido del evento */}
          <div class="px-6 md:px-12 pb-8 md:pb-12">
            {/* Título */}
            <h1 class="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {evento.title}
            </h1>

            {/* Información del evento */}
            <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-8 pb-6 border-b border-gray-200">
              <div class="flex items-center gap-2 text-gray-700">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
                  <LuCalendar class="h-5 w-5" />
                </div>
                <span class="text-base md:text-lg font-medium">{evento.date}</span>
              </div>
              <div class="flex items-center gap-2 text-gray-700">
                <div class="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">
                  <LuMapPin class="h-5 w-5" />
                </div>
                <span class="text-base md:text-lg font-medium">{evento.location}</span>
              </div>
            </div>

            {/* Descripción */}
            <div class="mb-8">
              <div class="text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {evento.description}
              </div>
            </div>

            {/* Botón de acción */}
            <div class="pt-4">
              <Modal
                title={_`Consultar sobre este evento`}
                description={_`Completa el formulario y te responderemos a la brevedad sobre cualquier consulta relacionada con este evento.`}
                showFooter={false}
                triggerClass="btn inline-flex items-center justify-center px-8 py-4 font-semibold text-base transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 active:translate-y-0"
                triggerText={_`Consultar`}
                showSig={showConsultaModal}
              >
                <EventoConsultaForm
                  onCloseModal$={onCloseModal$}
                  onShowToast$={onShowToast$}
                  eventoTitle={evento.title}
                />
              </Modal>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toastMessage.value && (
        <div class={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${toastMessage.value.type === 'success'
          ? 'bg-green-600 text-white'
          : 'bg-red-600 text-white'
          }`}>
          <p>{toastMessage.value.message}</p>
        </div>
      )}
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const evento = resolveValue(useEvento);
  const siteName = "Mutual Cultural Círculo Italiano Joven Italia";

  if (!evento) {
    return {
      title: _`Evento no encontrado - ${siteName}`,
      meta: [
        {
          name: "description",
          content: _`El evento solicitado no fue encontrado.`,
        },
      ],
    };
  }

  const baseUrl = url.origin;
  const pageUrl = url.href;
  const imageUrl = evento.image || `${baseUrl}/images/placeholder-evento.jpg`;

  // Limpiar descripción para meta tags (remover markdown y emojis)
  const cleanDescription = evento.description
    .replace(/\*\*/g, '') // Remover markdown bold
    .replace(/\*/g, '') // Remover markdown italic
    .replace(/#{1,6}\s/g, '') // Remover markdown headers
    .replace(/>\s/g, '') // Remover markdown blockquotes
    .replace(/\n/g, ' ') // Remover saltos de línea
    .trim();

  const description = cleanDescription.length > 160
    ? cleanDescription.substring(0, 157) + '...'
    : cleanDescription;

  return {
    title: `${evento.title} - ${siteName}`,
    meta: [
      {
        name: "description",
        content: description,
      },
      // Open Graph / Facebook
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: pageUrl,
      },
      {
        property: "og:title",
        content: evento.title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:image",
        content: imageUrl,
      },
      {
        property: "og:image:width",
        content: evento.imageWidth?.toString() || "1200",
      },
      {
        property: "og:image:height",
        content: evento.imageHeight?.toString() || "630",
      },
      {
        property: "og:site_name",
        content: siteName,
      },
      {
        property: "og:locale",
        content: "es_AR",
      },
      // Twitter Card
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:url",
        content: pageUrl,
      },
      {
        name: "twitter:title",
        content: evento.title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:image",
        content: imageUrl,
      },
      // Additional meta tags
      {
        name: "author",
        content: siteName,
      },
    ],
  };
};
