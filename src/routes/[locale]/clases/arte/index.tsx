import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import { LuPalette, LuBrush, LuPencil } from "@qwikest/icons/lucide";

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col">
            <main class="flex-1">
                {/* Hero Section */}
                <section class="relative bg-purple-700 py-20 text-white overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <div class="container relative mx-auto px-4 text-center">
                        <h1 class="text-5xl font-bold mb-6">{_`Taller de Arte`}</h1>
                        <p class="text-xl text-purple-100 max-w-2xl mx-auto">
                            {_`Explora tu creatividad y desarrolla tus habilidades artísticas en un ambiente inspirador.`}
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section class="py-20 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
                            <div class="text-center p-6 rounded-2xl bg-purple-50 hover:shadow-lg transition-all">
                                <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <LuPalette class="w-8 h-8" />
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-4">{_`Pintura`}</h3>
                                <p class="text-gray-600">{_`Técnicas de óleo, acrílico y acuarela para todos los niveles.`}</p>
                            </div>

                            <div class="text-center p-6 rounded-2xl bg-purple-50 hover:shadow-lg transition-all">
                                <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <LuBrush class="w-8 h-8" />
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-4">{_`Dibujo`}</h3>
                                <p class="text-gray-600">{_`Fundamentos del dibujo, perspectiva y figura humana.`}</p>
                            </div>

                            <div class="text-center p-6 rounded-2xl bg-purple-50 hover:shadow-lg transition-all">
                                <div class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <LuPencil class="w-8 h-8" />
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-4">{_`Creatividad`}</h3>
                                <p class="text-gray-600">{_`Talleres libres para explorar diferentes materiales y expresiones.`}</p>
                            </div>
                        </div>

                        <div class="mt-16 text-center">
                            <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                                {_`Nuestros talleres están abiertos a todas las edades. ¡Ven a descubrir el artista que llevas dentro!`}
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Taller de Arte - Círculo Italiano`,
    meta: [
        {
            name: "description",
            content: _`Talleres de arte, pintura y dibujo en el Círculo Italiano de Miramar.`,
        },
    ],
};
