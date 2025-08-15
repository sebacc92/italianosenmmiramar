import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import Img1 from "~/media/story1.jpeg?jsx"
import Img2 from "~/media/story2.jpeg?jsx"
import Img3 from "~/media/story3.jpeg?jsx"
import Img4 from "~/media/story4.jpeg?jsx"
import Img5 from "~/media/story5.jpeg?jsx"
import Img6 from "~/media/story6.jpeg?jsx"

export default component$(() => {
    return (
        <div class="flex min-h-screen flex-col bg-gray-50">
            <main class="flex-1">
                {/* Hero Section */}
                <section class="bg-gradient-to-r from-green-600/80 via-white to-red-600/80 py-20 md:py-24">
                    <div class="container mx-auto px-4">
                        <div class="text-center">
                            <h1 class="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">{_`Nuestra Historia`}</h1>
                            <p class="mx-auto mb-6 max-w-2xl text-lg text-gray-600 md:text-xl">{_`136 años acompañando a la ciudad de Miramar 🇦🇷🇮🇹`}</p>
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section class="py-16">
                    <div class="container mx-auto px-4">
                        <div class="mb-10 text-center">
                            <h2 class="text-2xl font-semibold text-gray-700 mb-2">{_`Un Recorrido Visual`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">{_`Revive momentos clave de nuestra trayectoria.`}</p>
                        </div>
                        <div class="mx-auto max-w-3xl">
                            <div class="relative overflow-hidden rounded-lg shadow-lg border border-gray-200">
                                <div class="aspect-video">
                                    <iframe 
                                        class="absolute top-0 left-0 w-full h-full"
                                        src="https://www.youtube.com/embed/R_BO4w1h7AE" 
                                        title={_`Historia del Círculo Italiano Joven Italia`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullscreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Origins Section */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="grid gap-12 md:grid-cols-2 items-center max-w-5xl mx-auto">
                            <div>
                                <h2 class="mb-6 text-3xl font-bold text-gray-800">{_`Nuestros orígenes`}</h2>
                                <div class="space-y-5 text-gray-700">
                                    <p>
                                        {_`nuestros_origenes_p1`}
                                    </p>
                                    <p>
                                        {_`En sus inicios, la sociedad funcionaba mediante una cuota mensual que cubría gastos de enfermedad y medicamentos para sus socios. Esta estructura operó durante décadas, pero con la llegada de las obras sociales, su propósito original fue perdiendo relevancia.`}
                                    </p>
                                    <p>
                                        {_`Después de la Segunda Guerra Mundial, una nueva ola de inmigración italiana llegó a Miramar, lo que dio origen el 29 de junio de 1959 al Círculo Italiano de Miramar, bajo la presidencia de Alberto Caroso. Esta nueva institución se enfocó en el aspecto social y cultural, organizando reuniones, almuerzos, cenas y diversas actividades para la comunidad italiana.`}
                                    </p>
                                </div>
                            </div>
                            <div class="relative h-[400px] flex justify-center items-center">
                                <img
                                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NiEgbBGLEnpWXV5RvzgV6n1MOyUvJo.png"
                                    alt={_`136 años Círculo Italiano`}
                                    class="object-contain h-full max-h-[350px] rounded-md shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section class="py-16 bg-gray-100">
                    <div class="container mx-auto px-4">
                        <h2 class="mb-12 text-center text-3xl font-bold text-gray-800">{_`Línea de tiempo`}</h2>

                        <div class="mx-auto max-w-3xl">
                            <div class="relative border-l-2 border-green-600 pl-10 pb-10">
                                <div class="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-green-600 border-2 border-white"></div>
                                <div class="mb-8">
                                    <h3 class="mb-2 text-xl font-semibold text-green-700">1889</h3>
                                    <p class="text-gray-600">
                                        {_`timelone_1889`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative border-l-2 border-green-600 pl-10 pb-10">
                                <div class="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-green-600 border-2 border-white"></div>
                                <div class="mb-8">
                                    <h3 class="mb-2 text-xl font-semibold text-green-700">1959</h3>
                                    <p class="text-gray-600">
                                        {_`29 de junio - Formación del Círculo Italiano de Miramar, presidido por Alberto Caroso, como respuesta a la nueva ola de inmigración italiana posterior a la Segunda Guerra Mundial. Se inician reuniones sociales, almuerzos, cenas y celebraciones de cumpleaños de socios.`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative border-l-2 border-green-600 pl-10 pb-10">
                                <div class="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-green-600 border-2 border-white"></div>
                                <div class="mb-8">
                                    <h3 class="mb-2 text-xl font-semibold text-green-700">2000</h3>
                                    <p class="text-gray-600">
                                        {_`timelone_2000`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative border-l-2 border-green-600 pl-10 pb-10">
                                <div class="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-green-600 border-2 border-white"></div>
                                <div class="mb-8">
                                    <h3 class="mb-2 text-xl font-semibold text-green-700">2002</h3>
                                    <p class="text-gray-600">
                                        {_`Junio - Inicio de los trabajos de renovación en el antiguo edificio de la Joven Italia, con el objetivo de dejar un importante legado cultural a la ciudad.`}
                                    </p>
                                </div>
                            </div>
                            
                            <div class="relative border-l-2 border-green-600 pl-10 pb-10">
                                <div class="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-green-600 border-2 border-white"></div>
                                <div class="mb-8">
                                    <h3 class="mb-2 text-xl font-semibold text-green-700">2005</h3>
                                    <p class="text-gray-600">
                                        {_`timeline_2005`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative border-l-2 border-green-600 pl-10 pb-10">
                                <div class="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-green-600 border-2 border-white"></div>
                                <div class="mb-8">
                                    <h3 class="mb-2 text-xl font-semibold text-green-700">2009</h3>
                                    <p class="text-gray-600">
                                        {_`Venta del edificio del Círculo Italiano e inicio de la construcción de un segundo piso en la sede de Joven Italia, con nuevas aulas y un salón adicional.`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative border-l-2 border-green-600 pl-10 pb-10">
                                <div class="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-green-600 border-2 border-white"></div>
                                <div class="mb-8">
                                    <h3 class="mb-2 text-xl font-semibold text-green-700">2010</h3>
                                    <p class="text-gray-600">
                                        {_`19 de agosto - Inauguración del salón Giuseppe Verdi en el segundo piso, completando una importante etapa de expansión para la institución.`}
                                    </p>
                                </div>
                            </div>

                            <div class="relative pl-10">
                                <div class="absolute -left-[11px] top-0 h-5 w-5 rounded-full bg-green-600 border-2 border-white"></div>
                                <div>
                                    <h3 class="mb-2 text-xl font-semibold text-green-700">2024</h3>
                                    <p class="text-gray-600">
                                        {_`Celebración de los 136 años de historia, reafirmando nuestro compromiso con la promoción de la cultura italiana en Miramar y continuando con los sueños por cumplir que impulsan nuestra institución.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Legacy Section */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold text-gray-800">{_`Nuestro Legado Cultural`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">
                                {_`Un pilar cultural para Miramar a lo largo de las décadas`}
                            </p>
                        </div>

                        <div class="max-w-3xl mx-auto">
                            <div>
                                <h3 class="mb-4 text-2xl font-bold text-gray-800 text-center md:text-left">{_`Un espacio para la comunidad`}</h3>
                                <div class="space-y-4 text-gray-700">
                                    <p>
                                        {_`Desde su formación, nuestra subcomisión de cultura ha trabajado profesionalmente en la programación de eventos culturales anuales como la Semana de la Cultura, proporcionando un espacio donde artistas, grupos e instituciones de la ciudad pueden mostrar sus talentos.`}
                                    </p>
                                    <p>
                                        {_`Hemos establecido un salón de exposiciones mensuales permanentes en nuestro hall de entrada, donde talentosos artistas locales pueden presentar sus obras, y organizamos regularmente conferencias, presentaciones de libros y talleres.`}
                                    </p>
                                    <p>
                                        {_`Nuestro cóctel de moda anual, que comenzó como un pequeño evento, se ha convertido en un acontecimiento insignia de la ciudad, contando con figuras de primera línea en el mundo de la moda y recaudando fondos para instituciones locales necesitadas.`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section class="py-16 bg-gray-100">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold text-gray-800">{_`Nuestros Valores`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">
                                {_`Principios que han guiado nuestra institución a lo largo de estos 136 años`}
                            </p>
                        </div>

                        <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
                                <div class="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="text-2xl text-green-600">🤝</span>
                                </div>
                                <h3 class="mb-2 text-xl font-semibold text-gray-800">{_`Comunidad`}</h3>
                                <p class="text-gray-600">
                                    {_`Fomentamos el sentido de pertenencia y la unión entre los miembros de la comunidad italiana y local, desde nuestros orígenes como sociedad de socorros mutuos hasta hoy.`}
                                </p>
                            </div>

                            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
                                <div class="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="text-2xl text-green-600">🏛️</span>
                                </div>
                                <h3 class="mb-2 text-xl font-semibold text-gray-800">{_`Cultura`}</h3>
                                <p class="text-gray-600">
                                    {_`Preservamos y promovemos la rica cultura italiana a través de exposiciones, charlas, y eventos que enriquecen la vida cultural de Miramar.`}
                                </p>
                            </div>

                            <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
                                <div class="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="text-2xl text-green-600">📚</span>
                                </div>
                                <h3 class="mb-2 text-xl font-semibold text-gray-800">{_`Educación`}</h3>
                                <p class="text-gray-600">
                                    {_`Ofrecemos oportunidades de aprendizaje del idioma y la cultura italiana para todas las edades, contribuyendo al desarrollo intelectual de la comunidad.`}
                                </p>
                            </div>

                             <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
                                <div class="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="text-2xl text-green-600">🌉</span>
                                </div>
                                <h3 class="mb-2 text-xl font-semibold text-gray-800">{_`Integración`}</h3>
                                <p class="text-gray-600">
                                    {_`Construimos puentes entre la cultura italiana y argentina, enriqueciendo ambas comunidades, como lo demuestra nuestra exitosa fusión institucional en 2005.`}
                                </p>
                            </div>

                             <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
                                <div class="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="text-2xl text-green-600">🔄</span>
                                </div>
                                <h3 class="mb-2 text-xl font-semibold text-gray-800">{_`Tradición e Innovación`}</h3>
                                <p class="text-gray-600">
                                    {_`Respetamos nuestras raíces mientras nos adaptamos a los nuevos tiempos, como lo demuestra nuestra evolución de sociedad de socorros mutuos a centro cultural integral.`}
                                </p>
                            </div>

                           <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
                                <div class="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span class="text-2xl text-green-600">🤲</span>
                                </div>
                                <h3 class="mb-2 text-xl font-semibold text-gray-800">{_`Solidaridad`}</h3>
                                <p class="text-gray-600">
                                    {_`Apoyamos a nuestra comunidad como lo hicimos desde 1889, ahora mediante eventos benéficos como nuestro cóctel de moda anual que beneficia a instituciones locales.`}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Section */}
                <section class="py-16 bg-white">
                    <div class="container mx-auto px-4">
                        <div class="mb-12 text-center">
                            <h2 class="mb-2 text-3xl font-bold text-gray-800">{_`Galería Histórica`}</h2>
                            <p class="mx-auto max-w-2xl text-gray-600">{_`Un vistazo a nuestro pasado en imágenes`}</p>
                        </div>

                        <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
                            <div class="relative aspect-square overflow-hidden rounded-lg shadow-md group">
                                <Img1
                                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div class="relative aspect-square overflow-hidden rounded-lg shadow-md group">
                                <Img2
                                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div class="relative aspect-square overflow-hidden rounded-lg shadow-md group">
                                <Img3
                                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div class="relative aspect-square overflow-hidden rounded-lg shadow-md group">
                                <Img4
                                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div class="relative aspect-square overflow-hidden rounded-lg shadow-md group">
                                <Img5
                                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div class="relative aspect-square overflow-hidden rounded-lg shadow-md group">
                                <Img6
                                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section class="py-20 bg-gray-100">
                    <div class="container mx-auto px-4">
                        <div class="mx-auto max-w-3xl text-center">
                            <blockquote class="relative italic text-xl text-gray-700 mb-6 p-6 border-l-4 border-green-500 bg-white rounded-r-lg shadow">
                                <span class="absolute top-2 left-2 text-5xl text-green-300 opacity-50">“</span>
                                "{_`Una institución que vio nacer a una ciudad, y una ciudad que vio crecer a una institución, un orgullo para todos los italianos y para todos sus descendientes. Un sueño que fue lejano y utópico, pero que se volvió realidad a partir del esfuerzo de cientos de personas que dedicaron parte de sus vidas a lograr que se convierta en una realidad. Hoy son 136 años y son muchos, pero aún nos quedan sueños por cumplir.`}"
                                <span class="absolute bottom-2 right-2 text-5xl text-green-300 opacity-50">”</span>
                            </blockquote>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Nuestra Historia - Círculo Italiano Joven Italia`,
    meta: [
        {
            name: "description",
            content: _`Conoce los 113635 años de historia del Círculo Italiano Joven Italia de Miramar. Desde 1889 preservando y promoviendo la cultura italiana en la comunidad.`,
        },
    ],
};
