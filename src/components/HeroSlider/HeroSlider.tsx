import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { _, getLocale } from "compiled-i18n";

export default component$(({ title, description }: { title: string, description: string }) => {
    const currentLocale = getLocale();
    return (
        <section class="relative w-full min-h-[calc(100dvh-120px)] md:min-h-[calc(100dvh-160px)] flex items-center justify-center text-center">
            {/* Background image */}
            <img 
                src="/images/exterior_institucion.jpg" 
                alt="Sede del Círculo Italiano" 
                class="absolute inset-0 h-full w-full object-cover"
            />
            
            {/* Gradient overlay for better text readability */}
            <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>

            {/* Content - Centered vertically and horizontally */}
            <div class="relative z-10 w-full px-4 md:px-8 lg:px-12">
                <div class="container mx-auto">
                    <div class="flex justify-center">
                        <div class="max-w-4xl">
                            {/* Card with glassmorphism effect */}
                            <div class="bg-black/25 backdrop-blur-sm border border-white/20 p-8 md:p-10 lg:p-12 rounded-2xl shadow-2xl">
                                {/* Italian flag accent */}
                                <div class="flex gap-2 justify-center mb-6">
                                    <div class="flex">
                                        <span class="w-4 h-6 bg-[#009246] rounded-l"></span>
                                        <span class="w-4 h-6 bg-white"></span>
                                        <span class="w-4 h-6 bg-[#CE2B37] rounded-r"></span>
                                    </div>
                                    <div class="flex">
                                        <span class="w-4 h-6 bg-[#6EC6F1] rounded-l"></span>
                                        <span class="w-4 h-6 bg-white"></span>
                                        <span class="w-4 h-6 bg-[#6EC6F1] rounded-r"></span>
                                    </div>
                                </div>

                                <p class="text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.3em] text-white/70 mb-3">
                                    {_`Fundado el 28 de Abril de 1889`}
                                </p>

                                <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
                                    {title}
                                </h1>
                                
                                <p class="text-white/90 text-base sm:text-lg lg:text-xl mb-8 leading-relaxed">
                                    {description}
                                </p>
                                
                                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link 
                                        href={`/${currentLocale}/eventos`} 
                                        class="group px-6 py-3.5 bg-white/95 hover:bg-white text-gray-900 rounded-lg text-sm md:text-base font-medium shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 border border-white/50"
                                    >
                                        <span class="flex items-center gap-2">
                                            {_`Ver próximos eventos`}
                                            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle scroll indicator */}
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                <svg class="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
});