import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import { LuHeart, LuStethoscope, LuApple } from "@qwikest/icons/lucide";

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col">
            <main class="flex-1">
                {/* Hero Section */}
                <section class="relative bg-green-600 py-20 text-white overflow-hidden">
                    <div class="absolute inset-0 bg-black/10"></div>
                    <div class="container relative mx-auto px-4 text-center">
                        <h1 class="text-5xl font-bold mb-6">{_`Nutrición y Salud`}</h1>
                        <p class="text-xl text-green-50 max-w-2xl mx-auto">
                            {_`Cuidando el bienestar de nuestros socios y la comunidad.`}
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section class="py-20 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="max-w-4xl mx-auto text-center">
                            <div class="mb-12">
                                <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <LuApple class="w-10 h-10" />
                                </div>
                                <h2 class="text-3xl font-bold text-gray-900 mb-6">{_`Consultorio Nutricional`}</h2>
                                <p class="text-xl text-gray-600 leading-relaxed">
                                    {_`Consultorio de nutricionista disponible para socios con aranceles preferenciales. Un espacio pensado para acompañarte en el camino hacia una vida más saludable, con asesoramiento profesional y personalizado.`}
                                </p>
                            </div>

                            <div class="grid gap-8 md:grid-cols-2 mt-16">
                                <div class="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                    <LuHeart class="w-8 h-8 text-red-500 mx-auto mb-4" />
                                    <h3 class="text-lg font-bold text-gray-900 mb-2">{_`Beneficio para Socios`}</h3>
                                    <p class="text-gray-600">{_`Accede a tarifas especiales presentando tu carnet de socio al día.`}</p>
                                </div>
                                <div class="p-6 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                    <LuStethoscope class="w-8 h-8 text-blue-500 mx-auto mb-4" />
                                    <h3 class="text-lg font-bold text-gray-900 mb-2">{_`Atención Profesional`}</h3>
                                    <p class="text-gray-600">{_`Licenciados en nutrición especializados en diferentes áreas.`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Nutrición y Salud - Círculo Italiano`,
    meta: [
        {
            name: "description",
            content: _`Consultorio de nutrición y salud en el Círculo Italiano de Miramar. Beneficios para socios.`,
        },
    ],
};
