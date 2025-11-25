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

export const useAutoridades = routeLoader$(async ({ status }) => {
    try {

        const res = await fetch(`${BASE_URL}/api/autoridades`);

        if (!res.ok) {
            console.warn("Failed to fetch autoridades, using fallback data");
            status(500);
            return [];
        }

        const data = (await res.json()) as { data: StrapiAutoridad[] };

        if (!data.data || data.data.length === 0) {
            status(404);
            return [];
        }

        return data.data.map((a) => ({
            id: a.documentId || a.id.toString(),
            nombre: a.nombre_completo,
            cargo: a.cargo,
            orden: a.orden,
        }));
    } catch (error) {
        console.error("Error fetching autoridades:", error);
        status(500);
        return [];
    }
});

export default component$(() => {
    const autoridades = useAutoridades();
    const sortedAutoridades = autoridades.value.sort((a, b) => a.orden - b.orden);

    return (
        <div class="flex min-h-screen flex-col bg-gray-50">
            {/* Hero Header */}
            <section class="bg-gradient-to-r from-green-600/80 via-white to-red-600/80 py-20 md:py-24">
                <div class="container mx-auto px-4">
                    <div class="text-center">
                        <h1 class="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">{_`Autoridades`}</h1>
                        <p class="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">{_`Comisión Directiva del Círculo Italiano`}</p>
                    </div>
                </div>
            </section>

            <main class="container mx-auto px-4 py-16 max-w-5xl">
                {/* Comisión Directiva */}
                <section>
                    <div class="mb-12 text-center">
                        <h2 class="mb-2 text-3xl font-bold text-gray-800">{_`Comisión Directiva`}</h2>
                        <p class="text-gray-600 uppercase tracking-wider">{_`Período 2025-2026`}</p>
                    </div>

                    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedAutoridades.map((autoridad) => (
                            <div key={autoridad.id} class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
                                <p class="text-sm font-semibold text-green-600 mb-2 uppercase tracking-wide">{autoridad.cargo}</p>
                                <h3 class="text-lg font-bold text-gray-900">{autoridad.nombre}</h3>
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
