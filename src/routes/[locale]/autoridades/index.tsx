import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";

const BASE_URL = import.meta.env.VITE_STRAPI_URL;

// Interfaces para Strapi
interface StrapiAutoridad {
    id: number;
    documentId: string;
    nombre_completo: string;
    cargo: string;
    categoria: "consejo_directivo" | "tribunal_honor" | "presidente_honorario";
    orden: number;
    foto: {
        url: string;
        formats?: {
            thumbnail?: { url: string };
            small?: { url: string };
        };
    } | null;
}

interface AutoridadFormateada {
    id: string;
    nombre: string;
    cargo: string;
    categoria: string;
    foto: string | null;
}

// Utils
function absolutize(url: string): string {
    const baseUrl = BASE_URL.replace(/\/$/, "");
    return url.startsWith("http") ? url : `${baseUrl}${url}`;
}

// Loader
export const useAutoridades = routeLoader$(async () => {
    try {

        const res = await fetch(`${BASE_URL}/api/autoridades`);
        console.log('res', res);

        // Fallback si no existe el endpoint o falla
        if (!res.ok) {
            console.warn("Failed to fetch autoridades, using fallback data");
            return getFallbackData();
        }

        const data = (await res.json()) as { data: StrapiAutoridad[] };

        if (!data.data || data.data.length === 0) {
            return getFallbackData();
        }

        return data.data.map((a) => ({
            id: a.documentId || a.id.toString(),
            nombre: a.nombre_completo,
            cargo: a.cargo,
            categoria: a.categoria,
            foto: a.foto ? absolutize(a.foto.formats?.small?.url || a.foto.url) : null,
        }));
    } catch (error) {
        console.error("Error fetching autoridades:", error);
        return getFallbackData();
    }
});

// Datos estáticos de respaldo por si falla Strapi o aún no hay datos
function getFallbackData(): AutoridadFormateada[] {
    return [
        // Consejo Directivo
        { id: "1", nombre: "Dr. Marco Bianchi", cargo: "Presidente", categoria: "consejo_directivo", foto: null },
        { id: "2", nombre: "Dr. Alberto Rossi", cargo: "Vicepresidente Primero", categoria: "consejo_directivo", foto: null },
        { id: "3", nombre: "Sr. Ricardo Lombardi", cargo: "Vicepresidente Segundo", categoria: "consejo_directivo", foto: null },
        { id: "4", nombre: "Dr. Gabriel Marconi", cargo: "Secretario", categoria: "consejo_directivo", foto: null },
        { id: "5", nombre: "Dr. Leonardo Ferrari", cargo: "Prosecretario", categoria: "consejo_directivo", foto: null },
        { id: "6", nombre: "Dr. Claudio Moretti", cargo: "Tesorero", categoria: "consejo_directivo", foto: null },
        { id: "7", nombre: "Sr. Gustavo Esposito", cargo: "Protesorero", categoria: "consejo_directivo", foto: null },
        { id: "8", nombre: "Sr. Paolo Romano", cargo: "Vocal Titular", categoria: "consejo_directivo", foto: null },
        { id: "9", nombre: "Ing. Lorenzo Martini", cargo: "Vocal Titular", categoria: "consejo_directivo", foto: null },
        { id: "10", nombre: "Lic. Andrea Conti", cargo: "Vocal Titular", categoria: "consejo_directivo", foto: null },
        { id: "11", nombre: "Sr. Roberto Marino", cargo: "Vocal Titular", categoria: "consejo_directivo", foto: null },
        { id: "12", nombre: "Lic. Valentina Ricci", cargo: "Vocal Suplente", categoria: "consejo_directivo", foto: null },
        { id: "13", nombre: "Dr. Massimo Caruso", cargo: "Vocal Suplente", categoria: "consejo_directivo", foto: null },
        { id: "14", nombre: "Lic. Sofia Greco", cargo: "Vocal Suplente", categoria: "consejo_directivo", foto: null },
        { id: "15", nombre: "Lic. Federico Longo", cargo: "Vocal Suplente", categoria: "consejo_directivo", foto: null },
        { id: "16", nombre: "Dra. Elena Rizzo", cargo: "Revisora de Cuentas Titular", categoria: "consejo_directivo", foto: null },
        { id: "17", nombre: "Sr. Antonio Vitali", cargo: "Revisor de Cuentas Titular", categoria: "consejo_directivo", foto: null },
        { id: "18", nombre: "Prof. Laura Costa", cargo: "Revisor de Cuentas Suplente", categoria: "consejo_directivo", foto: null },

        // Tribunal de Honor
        { id: "19", nombre: "Lic. Silvio Santoro", cargo: "Presidente", categoria: "tribunal_honor", foto: null },
        { id: "20", nombre: "Dr. Matteo Fiorelli", cargo: "Vicepresidente", categoria: "tribunal_honor", foto: null },
        { id: "21", nombre: "Sra. Luciana Mancini", cargo: "Secretaria", categoria: "tribunal_honor", foto: null },
        { id: "22", nombre: "Dr. Stefano Bruno", cargo: "Vocal Titular", categoria: "tribunal_honor", foto: null },
        { id: "23", nombre: "Ing. Franco Colombo", cargo: "Vocal Suplente", categoria: "tribunal_honor", foto: null },

        // Presidente Honorario
        { id: "24", nombre: "Dr. Alessandro Galli", cargo: "Presidente Honorario", categoria: "presidente_honorario", foto: null },
    ];
}

export default component$(() => {
    const autoridades = useAutoridades();

    const consejoDirectivo = autoridades.value.filter(a => a.categoria === "consejo_directivo");
    const tribunalHonor = autoridades.value.filter(a => a.categoria === "tribunal_honor");
    const presidenteHonorario = autoridades.value.filter(a => a.categoria === "presidente_honorario");

    return (
        <div class="flex min-h-screen flex-col bg-gray-50">
            {/* Hero Header */}
            <section class="relative bg-gradient-to-br from-green-700 via-green-600 to-red-600 py-20 text-white overflow-hidden">
                <div class="absolute inset-0 bg-black/20"></div>
                <div class="container relative mx-auto px-4 text-center">
                    <h1 class="mb-4 text-4xl font-bold md:text-5xl drop-shadow-md">{_`Autoridades`}</h1>
                    <p class="mx-auto max-w-2xl text-xl text-white/90 font-medium">
                        {_`Consejo Directivo del Círculo Italiano`}
                    </p>
                    <p class="mt-2 text-sm text-white/80 uppercase tracking-wider">{_`Período 2025-2026`}</p>
                </div>
            </section>

            <main class="container mx-auto px-4 py-12 max-w-5xl">

                {/* Presidente Honorario */}
                {presidenteHonorario.length > 0 && (
                    <section class="mb-16">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="h-px flex-1 bg-gray-300"></div>
                            <h2 class="text-2xl font-bold text-gray-800 uppercase tracking-wide text-center">{_`Presidente Honorario`}</h2>
                            <div class="h-px flex-1 bg-gray-300"></div>
                        </div>
                        <div class="flex justify-center">
                            {presidenteHonorario.map((autoridad) => (
                                <div key={autoridad.id} class="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center max-w-md w-full transform hover:-translate-y-1 transition-transform duration-300">
                                    <div class="mb-4 relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-green-50 shadow-inner bg-gray-100">
                                        {autoridad.foto ? (
                                            <img src={autoridad.foto} alt={autoridad.nombre} class="h-full w-full object-cover" />
                                        ) : (
                                            <div class="flex h-full w-full items-center justify-center text-gray-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <h3 class="text-xl font-bold text-gray-900">{autoridad.nombre}</h3>
                                    <p class="text-green-700 font-medium mt-1">{autoridad.cargo}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Consejo Directivo */}
                <section class="mb-16">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="h-px flex-1 bg-gray-300"></div>
                        <h2 class="text-2xl font-bold text-gray-800 uppercase tracking-wide text-center">{_`Consejo Directivo`}</h2>
                        <div class="h-px flex-1 bg-gray-300"></div>
                    </div>

                    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {consejoDirectivo.map((autoridad) => (
                            <div key={autoridad.id} class="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                                <div class="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 border-2 border-gray-50 group-hover:border-green-100 transition-colors">
                                    {autoridad.foto ? (
                                        <img src={autoridad.foto} alt={autoridad.nombre} class="h-full w-full object-cover" />
                                    ) : (
                                        <div class="flex h-full w-full items-center justify-center text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p class="text-xs font-bold uppercase tracking-wider text-green-600 mb-0.5">{autoridad.cargo}</p>
                                    <h3 class="font-semibold text-gray-900 leading-tight">{autoridad.nombre}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tribunal de Honor */}
                <section>
                    <div class="flex items-center gap-4 mb-8">
                        <div class="h-px flex-1 bg-gray-300"></div>
                        <h2 class="text-2xl font-bold text-gray-800 uppercase tracking-wide text-center">{_`Tribunal de Honor`}</h2>
                        <div class="h-px flex-1 bg-gray-300"></div>
                    </div>

                    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                        {tribunalHonor.map((autoridad) => (
                            <div key={autoridad.id} class="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                                <div class="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gray-100 border-2 border-gray-50 group-hover:border-red-100 transition-colors">
                                    {autoridad.foto ? (
                                        <img src={autoridad.foto} alt={autoridad.nombre} class="h-full w-full object-cover" />
                                    ) : (
                                        <div class="flex h-full w-full items-center justify-center text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p class="text-xs font-bold uppercase tracking-wider text-red-600 mb-0.5">{autoridad.cargo}</p>
                                    <h3 class="font-semibold text-gray-900 leading-tight">{autoridad.nombre}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Autoridades - Círculo Italiano Miramar`,
    meta: [
        {
            name: "description",
            content: _`Conozca a los miembros del Consejo Directivo, Tribunal de Honor y autoridades del Círculo Italiano de Miramar.`,
        },
    ],
};
