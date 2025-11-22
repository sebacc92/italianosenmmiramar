import { component$ } from "@builder.io/qwik";

export const MaintenancePage = component$(() => {
    return (
        <div class="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
            <div class="max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
                <div class="relative">
                    <div class="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 animate-pulse"></div>
                    <div class="relative bg-card p-8 rounded-2xl border border-border shadow-xl">
                        <div class="flex justify-center mb-6">
                            <div class="p-3 bg-primary/10 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="48"
                                    height="48"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="text-primary w-12 h-12"
                                >
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <path d="M12 18v-6" />
                                    <path d="M12 12h.01" />
                                </svg>
                            </div>
                        </div>

                        <h1 class="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            Sitio en Mantenimiento
                        </h1>

                        <p class="text-muted-foreground mb-6 text-lg">
                            Estamos trabajando en mejoras para brindarte una mejor experiencia. Pronto volveremos con novedades.
                        </p>

                        <div class="flex justify-center space-x-2">
                            <div class="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div class="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div class="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>

                <div class="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Italianos en Miramar
                </div>
            </div>
        </div>
    );
});
