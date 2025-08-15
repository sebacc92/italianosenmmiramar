import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { LuCheck, LuFileText, LuHelpCircle, LuInfo } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { Accordion } from "~/components/ui/accordion/accordion";
import DocumentosParaCiudadaniaItalianaImg from "~/media/documentos_para_ciudadania_italiana.png?jsx";
import { _ } from "compiled-i18n";

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col">
            <main class="flex-1">
                {/* Hero Section */}
                <section class="bg-gradient-to-r from-red-600 via-white to-green-600 py-16">
                    <div class="container mx-auto px-4">
                        <div class="text-center">
                            <h1 class="mb-4 text-4xl font-bold">{_`Trámites de Ciudadanía Italiana`}</h1>
                            <p class="mx-auto mb-6 max-w-2xl text-lg">
                                {_`Te acompañamos en todo el proceso para obtener tu ciudadanía italiana`}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold">{_`Nuestros Servicios`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">
                                {_`Ofrecemos asesoramiento completo para facilitar tu trámite de ciudadanía`}
                            </p>
                        </div>

                        <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                            <div class="border rounded shadow-sm">
                                <div class="p-6 border-b">
                                    <LuInfo class="h-10 w-10 text-green-600 mb-2" />
                                    <h3 class="text-xl font-medium">{_`Asesoramiento`}</h3>
                                </div>
                                <div class="p-6">
                                    <p class="text-gray-600">
                                        {_`Te orientamos sobre los requisitos, documentación necesaria y pasos a seguir para iniciar tu trámite.`}
                                    </p>
                                </div>
                            </div>

                            <div class="border rounded shadow-sm">
                                <div class="p-6 border-b">
                                    <LuFileText class="h-10 w-10 text-red-600 mb-2" />
                                    <h3 class="text-xl font-medium">{_`Gestión de Documentos`}</h3>
                                </div>
                                <div class="p-6">
                                    <p class="text-gray-600">
                                        {_`Te ayudamos con la búsqueda, traducción y legalización de documentos necesarios para tu trámite.`}
                                    </p>
                                </div>
                            </div>

                            <div class="border rounded shadow-sm">
                                <div class="p-6 border-b">
                                    <LuHelpCircle class="h-10 w-10 text-green-600 mb-2" />
                                    <h3 class="text-xl font-medium">{_`Seguimiento`}</h3>
                                </div>
                                <div class="p-6">
                                    <p class="text-gray-600">
                                        {_`Realizamos el seguimiento de tu trámite y te mantenemos informado sobre su estado y próximos pasos.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section class="py-16 bg-gray-100">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold">{_`Proceso de Ciudadanía`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">
                                {_`Conoce los pasos para obtener tu ciudadanía italiana`}
                            </p>
                        </div>

                        <div class="mx-auto max-w-3xl">
                            <div class="relative border-l border-green-600 pl-8 pb-12">
                                <div class="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                                    1
                                </div>
                                <div>
                                    <h3 class="mb-2 text-xl font-bold">{_`Evaluación de elegibilidad`}</h3>
                                    <p class="text-gray-600">
                                        {_`Analizamos tu caso para determinar si cumples con los requisitos para solicitar la ciudadanía italiana por descendencia.`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative border-l border-green-600 pl-8 pb-12">
                                <div class="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                                    2
                                </div>
                                <div>
                                    <h3 class="mb-2 text-xl font-bold">{_`Recopilación de documentos`}</h3>
                                    <p class="text-gray-600">
                                        {_`Te ayudamos a reunir todos los documentos necesarios: partidas de nacimiento, matrimonio y defunción de tus antepasados italianos.`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative border-l border-green-600 pl-8 pb-12">
                                <div class="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                                    3
                                </div>
                                <div>
                                    <h3 class="mb-2 text-xl font-bold">{_`Traducción y legalización`}</h3>
                                    <p class="text-gray-600">
                                        {_`Gestionamos la traducción oficial al italiano y la legalización de todos los documentos requeridos.`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative border-l border-green-600 pl-8 pb-12">
                                <div class="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                                    4
                                </div>
                                <div>
                                    <h3 class="mb-2 text-xl font-bold">{_`Preparación del expediente`}</h3>
                                    <p class="text-gray-600">
                                        {_`Organizamos toda la documentación según los requisitos del consulado italiano correspondiente.`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative pl-8">
                                <div class="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white">
                                    5
                                </div>
                                <div>
                                    <h3 class="mb-2 text-xl font-bold">{_`Presentación y seguimiento`}</h3>
                                    <p class="text-gray-600">
                                        {_`Te asesoramos en la presentación de la solicitud y realizamos el seguimiento hasta la obtención de tu ciudadanía.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Requirements Section */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="grid gap-8 md:grid-cols-2 items-center max-w-5xl mx-auto">
                            <div>
                                <h2 class="mb-6 text-3xl font-bold">{_`Requisitos`}</h2>
                                <div class="space-y-4">
                                    <div class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-1" />
                                        <p>
                                            {_`Tener un antepasado italiano que haya emigrado a Argentina después de la unificación de Italia (1861).`}
                                        </p>
                                    </div>
                                    <div class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-1" />
                                        <p>{_`Demostrar la línea de descendencia directa a través de documentación oficial.`}</p>
                                    </div>
                                    <div class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-1" />
                                        <p>
                                            {_`El antepasado italiano no debe haber renunciado a su ciudadanía antes del nacimiento del siguiente descendiente en la línea.`}
                                        </p>
                                    </div>
                                    <div class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-1" />
                                        <p>
                                            {_`Presentar partidas de nacimiento, matrimonio y defunción de todos los ascendientes en la línea de descendencia.`}
                                        </p>
                                    </div>
                                    <div class="flex items-start gap-2">
                                        <LuCheck class="h-5 w-5 text-green-600 mt-1" />
                                        <p>
                                            {_`Todos los documentos deben estar legalizados y traducidos al italiano por un traductor oficial.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="relative">
                                <DocumentosParaCiudadaniaItalianaImg />
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section class="py-16 bg-gray-100">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold">{_`Preguntas Frecuentes`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">
                                {_`Resolvemos tus dudas sobre el trámite de ciudadanía italiana`}
                            </p>
                        </div>

                        <Accordion.Root class="mx-auto max-w-3xl" collapsible behavior="single">
                            <Accordion.Item class="border rounded bg-white mb-2">
                                <Accordion.Trigger class="px-6 py-4">
                                    {_`¿Quiénes pueden solicitar la ciudadanía italiana?`}
                                </Accordion.Trigger>
                                <Accordion.Content class="px-6 pb-4">
                                    {_`Cualquier persona que pueda demostrar su descendencia de un ciudadano italiano, sin límite de generaciones, siempre que la línea de transmisión no se haya interrumpido.`}
                                </Accordion.Content>
                            </Accordion.Item>

                            <Accordion.Item class="border rounded bg-white mb-2">
                                <Accordion.Trigger class="px-6 py-4">
                                    {_`¿Cuánto tiempo toma el proceso?`}
                                </Accordion.Trigger>
                                <Accordion.Content class="px-6 pb-4">
                                    {_`El tiempo varía según cada caso, pero generalmente puede tomar entre 1 y 3 años desde la presentación de la solicitud hasta la obtención de la ciudadanía.`}
                                </Accordion.Content>
                            </Accordion.Item>

                            <Accordion.Item class="border rounded bg-white mb-2">
                                <Accordion.Trigger class="px-6 py-4">
                                    {_`¿Qué documentos necesito?`}
                                </Accordion.Trigger>
                                <Accordion.Content class="px-6 pb-4">
                                    {_`Necesitarás partidas de nacimiento, matrimonio y defunción de todos tus ascendientes en la línea italiana, desde tu antepasado italiano hasta ti. Todos deben estar legalizados y traducidos al italiano.`}
                                </Accordion.Content>
                            </Accordion.Item>

                            <Accordion.Item class="border rounded bg-white mb-2">
                                <Accordion.Trigger class="px-6 py-4">
                                    {_`¿Puedo tramitar la ciudadanía si mi antepasado italiano se naturalizó argentino?`}
                                </Accordion.Trigger>
                                <Accordion.Content class="px-6 pb-4">
                                    {_`Depende de cuándo se naturalizó. Si lo hizo después del nacimiento del siguiente descendiente en la línea, aún puedes solicitar la ciudadanía. Si fue antes, la línea de transmisión se interrumpió.`}
                                </Accordion.Content>
                            </Accordion.Item>

                            <Accordion.Item class="border rounded bg-white mb-2">
                                <Accordion.Trigger class="px-6 py-4">
                                    {_`¿Qué beneficios tiene la ciudadanía italiana?`}
                                </Accordion.Trigger>
                                <Accordion.Content class="px-6 pb-4">
                                    {_`La ciudadanía italiana te permite residir, trabajar y estudiar en cualquier país de la Unión Europea, viajar sin restricciones por Europa, y transmitir la ciudadanía a tus descendientes.`}
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion.Root>
                    </div>
                </section>

                {/* CTA Section */}
                <section class="py-16 bg-gradient-to-r from-green-600 via-white to-red-600">
                    <div class="container mx-auto px-4">
                        <div class="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-lg">
                            <div class="text-center">
                                <h2 class="mb-4 text-3xl font-bold">{_`¿Listo para iniciar tu trámite?`}</h2>
                                <p class="mb-6 text-gray-600">
                                    {_`Contáctanos para una evaluación gratuita de tu caso y comenzar el proceso hacia tu ciudadanía italiana.`}
                                </p>
                                <Button look="primary" size="lg" class="bg-green-600 hover:bg-green-700">
                                    <Link href="/contacto?asunto=tramites">{_`Solicitar asesoramiento`}</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Trámites de Ciudadanía Italiana - Círculo Italiano Joven Italia`,
    meta: [
        {
            name: "description",
            content: _`Asesoramiento completo para obtener tu ciudadanía italiana. Te ayudamos con la gestión de documentos, traducciones, legalizaciones y seguimiento de tu trámite.`,
        },
    ],
};
