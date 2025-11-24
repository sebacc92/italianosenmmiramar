import { component$ } from "@builder.io/qwik";
import { type DocumentHead, Link } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import { LuArrowRight, LuLanguages } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import ClasesItalianoImg from "~/media/clases-italiano.jpeg?jsx";

export default component$(() => {
    return (
        <div class="flex min-h-[calc(100vh-80px)] flex-col bg-gray-50">
            <main class="flex-1 container mx-auto px-4 py-12 flex flex-col justify-center">
                <div class="text-center mb-12">
                    <div class="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4">
                        <LuLanguages class="w-8 h-8" />
                    </div>
                    <h1 class="text-4xl font-bold text-gray-900 mb-4">{_`Nuestros Idiomas`}</h1>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        {_`Elegí el idioma que querés aprender y sumate a nuestra comunidad.`}
                    </p>
                </div>

                <div class="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto w-full">
                    {/* Italian Card */}
                    <Link href="italiano" class="group">
                        <Card.Root class="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-green-200 hover:border-green-400">
                            <div class="relative h-48 overflow-hidden">
                                <div class="absolute inset-0 bg-green-900/20 group-hover:bg-green-900/10 transition-colors z-10"></div>
                                <ClasesItalianoImg class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                                    <span class="text-white font-bold text-lg">{_`Italiano`}</span>
                                </div>
                            </div>
                            <Card.Content class="p-6">
                                <div class="mb-4">
                                    <h3 class="text-2xl font-bold text-gray-900 mb-2">{_`Aprende Italiano`}</h3>
                                    <p class="text-gray-600">
                                        {_`Descubrí la lengua de tus raíces. Cursos presenciales para todos los niveles, desde inicial hasta conversación.`}
                                    </p>
                                </div>
                                <div class="flex items-center text-green-600 font-medium group-hover:translate-x-2 transition-transform">
                                    {_`Ver cursos`} <LuArrowRight class="ml-2 w-4 h-4" />
                                </div>
                            </Card.Content>
                        </Card.Root>
                    </Link>

                    {/* English Card */}
                    <Link href="ingles" class="group">
                        <Card.Root class="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-blue-200 hover:border-blue-400">
                            <div class="relative h-48 overflow-hidden bg-blue-900 flex items-center justify-center">
                                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60 group-hover:opacity-70 transition-opacity"></div>
                                <div class="absolute inset-0 bg-blue-900/30 z-10"></div>
                                <div class="relative z-20 text-white text-center">
                                    <span class="text-5xl font-bold tracking-wider">ENGLISH</span>
                                </div>
                            </div>
                            <Card.Content class="p-6">
                                <div class="mb-4">
                                    <h3 class="text-2xl font-bold text-gray-900 mb-2">{_`Aprende Inglés`}</h3>
                                    <p class="text-gray-600">
                                        {_`El idioma universal. Mejorá tus oportunidades laborales y académicas con nuestros cursos dinámicos.`}
                                    </p>
                                </div>
                                <div class="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                                    {_`Ver cursos`} <LuArrowRight class="ml-2 w-4 h-4" />
                                </div>
                            </Card.Content>
                        </Card.Root>
                    </Link>
                </div>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Idiomas - Círculo Italiano`,
    meta: [
        {
            name: "description",
            content: _`Cursos de Italiano e Inglés en Miramar. Inscríbete ahora.`,
        },
    ],
};
