import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import { LuBuilding, LuFileText } from "@qwikest/icons/lucide";

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col bg-gray-50">
            <main class="flex-1">
                {/* Hero Section */}
                <section class="relative overflow-hidden bg-green-700 py-20 text-white">
                    <div class="absolute inset-0 bg-[url('/media/pattern.png')] opacity-10"></div>
                    <div class="container relative mx-auto px-4 text-center">
                        <h1 class="mb-4 text-4xl font-bold md:text-5xl">{_`Nuestros Servicios`}</h1>
                        <p class="mx-auto max-w-2xl text-lg text-green-100">
                            {_`Descubre los beneficios y servicios que ofrecemos a nuestros socios y a la comunidad.`}
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section class="py-16">
                    <div class="container mx-auto px-4">
                        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">

                            {/* Alquiler de Salones */}
                            <Link
                                href="alquiler-salones"
                                class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100"
                            >
                                <div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                                    <LuBuilding class="h-8 w-8" />
                                </div>
                                <h3 class="mb-3 text-xl font-bold text-gray-900">{_`Alquiler de Salones`}</h3>
                                <p class="text-gray-600">
                                    {_`Espacios versátiles y equipados para tus eventos sociales, corporativos y culturales.`}
                                </p>
                                <div class="mt-6 flex items-center text-sm font-medium text-green-600 group-hover:text-green-700">
                                    {_`Ver detalles`}
                                    <svg class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>

                            {/* Trámites Consulares */}
                            <Link
                                href="tramites"
                                class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100"
                            >
                                <div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-600 group-hover:text-white">
                                    <LuFileText class="h-8 w-8" />
                                </div>
                                <h3 class="mb-3 text-xl font-bold text-gray-900">{_`Trámites y Ciudadanía`}</h3>
                                <p class="text-gray-600">
                                    {_`Asesoramiento y gestión de trámites consulares, ciudadanía italiana y pasaportes.`}
                                </p>
                                <div class="mt-6 flex items-center text-sm font-medium text-red-600 group-hover:text-red-700">
                                    {_`Más información`}
                                    <svg class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>

                            {/* Clases de Idioma (Placeholder for now) */}
                            <Link
                                href="clases"
                                class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100"
                            >
                                <div class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                </div>
                                <h3 class="mb-3 text-xl font-bold text-gray-900">{_`Cursos de Idiomas`}</h3>
                                <p class="text-gray-600">
                                    {_`Aprende italiano e inglés con nuestros cursos presenciales y online para todos los niveles.`}
                                </p>
                                <div class="mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                                    {_`Ver cursos`}
                                    <svg class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>

                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
});
