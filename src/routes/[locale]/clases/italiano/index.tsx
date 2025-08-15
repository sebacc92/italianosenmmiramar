import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { LuCheck } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import ClasesItalianoImg from "~/media/clases-italiano.jpeg?jsx";
import { _ } from "compiled-i18n";

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col">
            <main class="flex-1">
                {/* Hero Section */}
                <section class="bg-green-600 py-16 text-white">
                    <div class="container mx-auto px-4">
                        <div class="grid gap-8 md:grid-cols-2 items-center">
                            <div>
                                <h1 class="mb-4 text-4xl font-bold">{_`Clases de Italiano`}</h1>
                                <p class="mb-6 text-lg">
                                    {_`Aprende italiano y vive la dolce vita con nuestros diferentes niveles y propuestas para todas las edades.`}
                                </p>
                                <div class="flex flex-col gap-3">
                                    <div class="flex items-center gap-2">
                                        <LuCheck class="h-5 w-5" />
                                        <span>{_`Profesores nativos y certificados`}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <LuCheck class="h-5 w-5" />
                                        <span>{_`Grupos reducidos`}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <LuCheck class="h-5 w-5" />
                                        <span>{_`Material didáctico incluido`}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <LuCheck class="h-5 w-5" />
                                        <span>{_`Inscripciones abiertas hasta el 4 de abril`}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-center">
                                <ClasesItalianoImg
                                    style={{ height: "600px", maxWidth: "500px" }}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Levels Section */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold">{_`Nuestros Niveles`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">
                                {_`Ofrecemos diferentes niveles adaptados a tus necesidades y objetivos`}
                            </p>
                        </div>

                        <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                            <div class="border rounded shadow-sm">
                                <div class="p-6 border-b">
                                    <h3 class="text-xl font-medium">Iniziale</h3>
                                    <p class="text-sm text-gray-500">{_`Para principiantes`}</p>
                                </div>
                                <div class="p-6">
                                    <ul class="space-y-2">
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Introducción al idioma italiano`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Vocabulario básico y expresiones cotidianas`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Gramática fundamental`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Conversación básica`}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="p-6 pt-0">
                                    <Button look="primary" class="w-full bg-red-600 hover:bg-red-700">
                                        <Link href="/contacto?curso=iniziale">{_`Inscribirme`}</Link>
                                    </Button>
                                </div>
                            </div>

                            <div class="border rounded shadow-sm">
                                <div class="p-6 border-b">
                                    <h3 class="text-xl font-medium">Livello Intermedio</h3>
                                    <p class="text-sm text-gray-500">{_`Para estudiantes con conocimientos previos`}</p>
                                </div>
                                <div class="p-6">
                                    <ul class="space-y-2">
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Ampliación de vocabulario`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Gramática avanzada`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Conversación fluida`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Comprensión de textos`}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="p-6 pt-0">
                                    <Button look="primary" class="w-full bg-red-600 hover:bg-red-700">
                                        <Link href="/contacto?curso=intermedio">{_`Inscribirme`}</Link>
                                    </Button>
                                </div>
                            </div>

                            <div class="border rounded shadow-sm">
                                <div class="p-6 border-b">
                                    <h3 class="text-xl font-medium">Cittadinanza</h3>
                                    <p class="text-sm text-gray-500">{_`Enfocado en trámites de ciudadanía`}</p>
                                </div>
                                <div class="p-6">
                                    <ul class="space-y-2">
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Vocabulario específico para trámites`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Comprensión de documentos oficiales`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Preparación para entrevistas`}</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                            <span>{_`Cultura italiana contemporánea`}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="p-6 pt-0">
                                    <Button look="primary" class="w-full bg-red-600 hover:bg-red-700">
                                        <Link href="/contacto?curso=cittadinanza">{_`Inscribirme`}</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Kids Section */}
                <section class="py-16 bg-gray-100">
                    <div class="container mx-auto px-4">
                        <div class="grid gap-8 md:grid-cols-2 items-center max-w-5xl mx-auto">
                            <div>
                                <h2 class="mb-4 text-3xl font-bold">{_`Clases para los más chiquitos`}</h2>
                                <p class="mb-6 text-gray-600">
                                    {_`También ofrecemos clases especiales para niños en turno mañana, con metodologías lúdicas y adaptadas a su edad.`}
                                </p>
                                <ul class="mb-6 space-y-3">
                                    <li class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                        <span>{_`Aprendizaje a través del juego`}</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                        <span>{_`Canciones y cuentos en italiano`}</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                        <span>{_`Actividades culturales`}</span>
                                    </li>
                                    <li class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-0.5" />
                                        <span>{_`Grupos por edades`}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold">{_`Preguntas Frecuentes`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">
                                {_`Resolvemos tus dudas sobre nuestras clases de italiano`}
                            </p>
                        </div>

                        <div class="mx-auto max-w-3xl space-y-6">
                            <div class="border rounded p-6">
                                <h3 class="text-lg font-medium mb-2">{_`¿Cuándo comienzan las clases?`}</h3>
                                <p class="text-gray-600">
                                    {_`El ciclo lectivo 2025 comenzó el 17 de marzo, pero las inscripciones están abiertas hasta el 4 de abril.`}
                                </p>
                            </div>

                            <div class="border rounded p-6">
                                <h3 class="text-lg font-medium mb-2">{_`¿Necesito conocimientos previos?`}</h3>
                                <p class="text-gray-600">
                                    {_`No para el nivel Iniziale. Para los otros niveles, realizamos una evaluación para ubicarte en el grupo adecuado según tus conocimientos.`}
                                </p>
                            </div>

                            <div class="border rounded p-6">
                                <h3 class="text-lg font-medium mb-2">{_`¿Cuál es el costo de las clases?`}</h3>
                                <p class="text-gray-600">
                                    {_`Los costos varían según el nivel y si eres socio o no. Contáctanos para obtener información detallada sobre los precios actuales.`}
                                </p>
                            </div>

                            <div class="border rounded p-6">
                                <h3 class="text-lg font-medium mb-2">{_`¿Qué materiales necesito?`}</h3>
                                <p class="text-gray-600">
                                    {_`El material didáctico básico está incluido. Te indicaremos si necesitas algún libro o recurso adicional según el nivel.`}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section class="bg-green-600 py-16 text-white">
                    <div class="container mx-auto px-4 text-center">
                        <h2 class="mb-4 text-3xl font-bold">{_`¿Listo para aprender italiano?`}</h2>
                        <p class="mx-auto mb-8 max-w-2xl text-lg">
                            {_`No pierdas esta oportunidad y sumate ya. Inscripciones abiertas hasta el 4 de abril.`}
                        </p>
                        <Button look="outline" size="lg" class="bg-white text-green-600 hover:bg-white/90">
                            <Link href="/contacto">{_`Inscríbete ahora`}</Link>
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Clases de Italiano - Círculo Italiano Joven Italia`,
    meta: [
        {
            name: "description",
            content: _`Aprende italiano con profesores certificados. Todos los niveles disponibles para niños y adultos.`,
        },
    ],
};
