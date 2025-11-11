import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { LuCalendar, LuClock, LuMapPin } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { _, getLocale } from "compiled-i18n";
import qs from 'qs';

const BASE_URL = import.meta.env.VITE_STRAPI_URL;

interface StrapiEvento {
    id: number;
    documentId: string;
    titulo: string;
    fecha: string;
    lugar: string;
    destacado: boolean;
    description: string;
    imagen_principal: {
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
    destacado: boolean;
    galeria?: Array<{ url: string }>;
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
function getStrapiImageUrl(imagen: StrapiEvento['imagen_principal'], size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'): string | null {
    if (!imagen) return null;
    
    const baseUrl = BASE_URL.replace(/\/$/, ''); // Remover trailing slash si existe
    const imageUrl = imagen.url.startsWith('http') ? imagen.url : `${baseUrl}${imagen.url}`;
    
    // Si hay formato específico solicitado y existe, usarlo
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
function getStrapiImageSrcSet(imagen: StrapiEvento['imagen_principal']): string | null {
    if (!imagen || !imagen.formats) return null;
    
    const baseUrl = BASE_URL.replace(/\/$/, '');
    const srcset: string[] = [];
    
    // Agregar cada formato disponible al srcset (de menor a mayor)
    if (imagen.formats.thumbnail) {
        const thumbnail = imagen.formats.thumbnail;
        const url = thumbnail.url.startsWith('http') 
            ? thumbnail.url 
            : `${baseUrl}${thumbnail.url}`;
        // Usar el width del formato si está disponible, sino un valor por defecto
        const width = thumbnail.width || 156;
        srcset.push(`${url} ${width}w`);
    }
    if (imagen.formats.small) {
        const small = imagen.formats.small;
        const url = small.url.startsWith('http') 
            ? small.url 
            : `${baseUrl}${small.url}`;
        const width = small.width || 500;
        srcset.push(`${url} ${width}w`);
    }
    if (imagen.formats.medium) {
        const medium = imagen.formats.medium;
        const url = medium.url.startsWith('http') 
            ? medium.url 
            : `${baseUrl}${medium.url}`;
        const width = medium.width || 750;
        srcset.push(`${url} ${width}w`);
    }
    if (imagen.formats.large) {
        const large = imagen.formats.large;
        const url = large.url.startsWith('http') 
            ? large.url 
            : `${baseUrl}${large.url}`;
        const width = large.width || 1000;
        srcset.push(`${url} ${width}w`);
    }
    
    // Agregar la imagen original como fallback (mayor resolución)
    const originalUrl = imagen.url.startsWith('http') ? imagen.url : `${baseUrl}${imagen.url}`;
    if (imagen.width) {
        srcset.push(`${originalUrl} ${imagen.width}w`);
    } else if (imagen.formats?.large?.width) {
        // Si no hay width en la original pero hay en large, usar ese + algún margen
        const largeWidth = imagen.formats.large.width;
        srcset.push(`${originalUrl} ${Math.round(largeWidth * 1.5)}w`);
    } else {
        srcset.push(`${originalUrl} 1920w`);
    }
    
    return srcset.length > 0 ? srcset.join(', ') : null;
}

// RouteLoader para obtener eventos de Strapi
export const useEventos = routeLoader$(async () => {
    try {
        const query = qs.stringify({
            populate: '*',
            sort: ['fecha:desc'], // Ordenar por fecha descendente (más reciente primero)
        }, { encodeValuesOnly: true });
        
        const res = await fetch(`${BASE_URL}/api/eventos?${query}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch eventos from Strapi: ${res.status}`);
        }
        
        const data = await res.json() as { data: StrapiEvento[] };
        
        // Mapear eventos de Strapi al formato que necesitamos
        const eventosFormateados: EventoFormateado[] = data.data.map((evento) => {
            const fechaObj = new Date(evento.fecha);
            const imageUrl = getStrapiImageUrl(evento.imagen_principal, 'medium');
            const imageLargeUrl = getStrapiImageUrl(evento.imagen_principal, 'large') || 
                                  getStrapiImageUrl(evento.imagen_principal, 'original');
            const imageSrcSet = getStrapiImageSrcSet(evento.imagen_principal);
            
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
                destacado: evento.destacado,
                galeria: evento.galeria?.map(img => ({
                    url: img.url.startsWith('http') ? img.url : `${BASE_URL.replace(/\/$/, '')}${img.url}`
                })),
            };
        });
        
        // Ordenar por fecha (más reciente primero) - ya viene ordenado de Strapi, pero lo reordenamos por si acaso
        eventosFormateados.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
        
        return eventosFormateados;
    } catch (error) {
        console.error('Error fetching eventos:', error);
        return [];
    }
});

export default component$(() => {
    const currentLocale = getLocale();
    const eventosSignal = useEventos();
    const eventos = eventosSignal.value;
    
    // Obtener la fecha de hoy, normalizada a medianoche para comparar solo fechas (sin hora)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Clasificar eventos en próximos y pasados basándose en la fecha actual
    const eventosProximos = eventos.filter(e => {
        const fecha = new Date(e.dateObj);
        fecha.setHours(0, 0, 0, 0);
        return fecha >= today;
    });
    
    const eventosPasados = eventos.filter(e => {
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
                        <h2 class="text-2xl font-bold mb-8 text-green-700">{_`Próximos eventos`}</h2>
                        <div class="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
                            {eventosProximos.length === 0 && (
                                <p class="col-span-2 text-gray-500">{_`No hay eventos próximos.`}</p>
                            )}
                            {eventosProximos.map((evento) => (
                                <div key={evento.id} class="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div class="relative h-64 flex items-center justify-center bg-gray-100">
                                        {evento.image ? (
                                            <img 
                                                src={evento.image} 
                                                srcset={evento.imageSrcSet || undefined}
                                                alt={evento.imageAlt || evento.title} 
                                                width={evento.imageWidth || 800} 
                                                height={evento.imageHeight || 600} 
                                                class="w-full h-full object-cover object-top" 
                                                loading="lazy"
                                                decoding="async"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                                                <LuCalendar class="h-16 w-16" />
                                            </div>
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
                                        <div class="mb-4 text-gray-600 line-clamp-3">{evento.description}</div>
                                        <div class="flex items-center gap-2 text-sm text-gray-600">
                                            <LuMapPin class="h-4 w-4" />
                                            <span>{evento.location}</span>
                                        </div>
                                    </div>
                                    <div class="p-6 pt-0">
                                        <Button look="primary" class="bg-green-600 hover:bg-green-700">
                                            <Link href={`/${currentLocale}/eventos/${evento.id}`}>{_`Más información`}</Link>
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
                                        {evento.image ? (
                                            <img 
                                                src={evento.image} 
                                                srcset={evento.imageSrcSet || undefined}
                                                alt={evento.imageAlt || evento.title} 
                                                width={evento.imageWidth || 800} 
                                                height={evento.imageHeight || 600} 
                                                class="w-full h-full object-cover object-top" 
                                                loading="lazy"
                                                decoding="async"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                                                <LuCalendar class="h-16 w-16" />
                                            </div>
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
                                        <div class="mb-4 text-gray-600 line-clamp-3">{evento.description}</div>
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
                                    {eventos.map((evento) => (
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
                                                <Link href={`/${currentLocale}/eventos/${evento.id}`}>{_`Ver`}</Link>
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
                            <Link href={`/${currentLocale}/contacto?asunto=proyecto`}>{_`Presentar proyecto`}</Link>
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
