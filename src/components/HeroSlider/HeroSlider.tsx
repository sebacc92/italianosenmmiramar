import { component$, useSignal, useVisibleTask$, $, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./hero-slider.css?inline";
import { _ } from "compiled-i18n";
import Slide1 from '~/media/slides/slide1.jpg?jsx';
import Slide2 from '~/media/slides/slide2.jpg?jsx';
import Slide3 from '~/media/slides/slide3.jpg?jsx';
import Slide4 from '~/media/slides/slide4.jpg?jsx';
import Slide5 from '~/media/slides/slide5.jpg?jsx';
import Slide6 from '~/media/slides/slide6.jpg?jsx';

// Type definition for slides
interface Slide {
    id: number;
    title: string;
    description: string;
    image: any; // Cambiado a any para componentes
    ctaLink: string;
    ctaText: string;
}

// Slides con imágenes locales optimizadas
const slides: Slide[] = [
    {
        id: 1,
        title: "Bienvenidos al Círculo Italiano",
        description: "Acompañando a la ciudad de Miramar hace 136 años con cultura, tradición y comunidad.",
        image: Slide1,
        ctaLink: "/historia",
        ctaText: "Conocer nuestra historia",
    },
    {
        id: 2,
        title: "Clases de Italiano",
        description: "Aprende el idioma de Dante con profesores nativos y certificación internacional.",
        image: Slide2,
        ctaLink: "/clases/italiano",
        ctaText: "Ver cursos disponibles",
    },
    {
        id: 3,
        title: "Eventos Culturales",
        description: "Descubre nuestro calendario de eventos, exposiciones, charlas y actividades.",
        image: Slide3,
        ctaLink: "/eventos",
        ctaText: "Ver próximos eventos",
    },
    {
        id: 4,
        title: "Trámites de Ciudadanía Italiana",
        description: "Te asesoramos y acompañamos en el proceso para obtener tu ciudadanía italiana.",
        image: Slide4,
        ctaLink: "/tramites",
        ctaText: "Ver asesoría",
    },
    {
        id: 5,
        title: "Alquiler de Salones",
        description: "Espacios ideales para eventos sociales, culturales y educativos en Miramar.",
        image: Slide5,
        ctaLink: "/alquiler-salones",
        ctaText: "Consultar disponibilidad",
    },
    {
        id: 6,
        title: "Sumate como Socio",
        description: "Formá parte de nuestra comunidad y accedé a beneficios exclusivos.",
        image: Slide6,
        ctaLink: "/contacto",
        ctaText: "Hazte socio",
    },
];

const TimeOUT = 10000; // 6 seconds

export default component$(() => {
    useStylesScoped$(styles);

    const currentSlide = useSignal(0);
    const totalSlides = slides.length;

    // Auto slide functionality
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
        const interval = setInterval(() => {
            currentSlide.value = (currentSlide.value + 1) % totalSlides;
        }, TimeOUT); // Change slide every 6 seconds

        // Cleanup on unmount
        cleanup(() => clearInterval(interval));
    });

    // Navigation handlers
    const nextSlide = $(() => {
        currentSlide.value = (currentSlide.value + 1) % totalSlides;
    });

    const prevSlide = $(() => {
        currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides;
    });

    const goToSlide = $((index: number) => {
        currentSlide.value = index;
    });

    return (
        <div class="slider-container w-full h-[500px] md:h-[600px] relative">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    class={`slide ${index === currentSlide.value ? "active" : ""}`}
                >
                    <slide.image alt={slide.title} class="slide-image" />
                    <div class="absolute inset-0 bg-black/40"></div>
                    <div class="slide-content px-4 md:px-12 lg:container mx-auto">
                        <div class="max-w-lg bg-black/70 p-6 md:p-8 rounded-lg shadow-lg backdrop-blur-sm">
                            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-lg">
                                {slide.title}
                            </h2>
                            <p class="text-base md:text-lg text-white/95 mb-6 drop-shadow">
                                {slide.description}
                            </p>
                            <Link
                                href={slide.ctaLink}
                                class="inline-block px-6 py-3 bg-[#CE2B37] hover:bg-[#b52532] text-white text-sm md:text-base font-medium rounded-md transition-colors shadow-md"
                            >
                                {slide.ctaText}
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation buttons */}
            <button
                onClick$={prevSlide}
                class="nav-button prev"
                aria-label={_`Previous slide`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <button
                onClick$={nextSlide}
                class="nav-button next"
                aria-label={_`Next slide`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-8 w-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>

            {/* Slide indicators */}
            <div class="indicators">
                {slides.map((__, index) => (
                    <button
                        key={index}
                        onClick$={() => goToSlide(index)}
                        class={`indicator border-2 border-white/70 ${index === currentSlide.value ? "active" : "bg-white/30"
                            }`}
                        aria-label={_`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
});