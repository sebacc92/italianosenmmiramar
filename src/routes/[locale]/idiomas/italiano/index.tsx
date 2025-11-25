import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, Form, zod$, z } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import { LuCheck } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Textarea } from "~/components/ui/textarea/textarea";
import ClasesItalianoImg from "~/media/clases-italiano.jpeg?jsx";
import HeroItaliaImg from "~/media/hero-italia.avif";

export const useSubmitPreInscripcion = routeAction$(
    async (data) => {
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Pre-inscripción recibida:", data);
        return { success: true };
    },
    zod$({
        nombre: z.string().min(1, "El nombre es requerido"),
        email: z.string().email("Email inválido"),
        telefono: z.string().min(1, "El teléfono es requerido"),
        nivel: z.string().min(1, "Selecciona un nivel"),
        comentarios: z.string().optional(),
    })
);

const CURSOS = [
    {
        titulo: "Italiano Iniziale",
        nivel: "Principiante (A1)",
        horario: "Lunes y Miércoles 18:00 - 19:30",
        profesor: "Giulia Rossi",
    },
    {
        titulo: "Italiano Intermedio",
        nivel: "Intermedio (B1)",
        horario: "Martes y Jueves 19:00 - 20:30",
        profesor: "Marco Bianchi",
    },
    {
        titulo: "Conversazione",
        nivel: "Avanzado (C1)",
        horario: "Viernes 18:00 - 20:00",
        profesor: "Francesca Romano",
    },
];

export default component$(() => {
    const action = useSubmitPreInscripcion();

    return (
        <div class="flex min-h-screen flex-col">
            <main class="flex-1">
                {/* Hero Section */}
                <section class="relative py-20 text-white overflow-hidden">
                    {/* Background Image & Overlay */}
                    <div class="absolute inset-0 z-0">
                        <img
                            src={HeroItaliaImg}
                            alt="Hero Italia"
                            class="w-full h-full object-cover"
                        />
                        <div class="absolute inset-0 bg-black/50"></div>
                    </div>

                    <div class="container relative z-10 mx-auto px-4">
                        <div class="grid gap-12 md:grid-cols-2 items-center">
                            <div class="space-y-6">
                                <h1 class="text-5xl font-bold leading-tight">
                                    {_`Descubrí la cultura italiana a través de su idioma`}
                                </h1>
                                <p class="text-xl text-green-50">
                                    {_`Ciclo lectivo 2026. Inscripciones abiertas para todos los niveles.`}
                                </p>
                                <Button class="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6 h-auto">
                                    <a href="#pre-inscripcion">{_`Reservar mi vacante`}</a>
                                </Button>
                            </div>
                            <div class="hidden md:flex justify-center">
                                <div class="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <ClasesItalianoImg class="object-cover h-[500px] w-[400px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cursos Grid */}
                <section class="py-20 bg-gray-50">
                    <div class="container mx-auto px-4">
                        <div class="text-center mb-16">
                            <h2 class="text-3xl font-bold text-gray-900 mb-4">{_`Nuestros Cursos`}</h2>
                            <p class="text-gray-600 max-w-2xl mx-auto">{_`Explora nuestra oferta académica diseñada para acompañarte en cada paso de tu aprendizaje.`}</p>
                        </div>

                        <div class="grid gap-8 md:grid-cols-3">
                            {CURSOS.map((curso, index) => (
                                <Card.Root key={index} class="bg-white hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-green-600">
                                    <Card.Header>
                                        <Card.Title class="text-xl">{curso.titulo}</Card.Title>
                                        <Card.Description>{curso.nivel}</Card.Description>
                                    </Card.Header>
                                    <Card.Content class="space-y-4">
                                        <div class="flex items-center gap-2 text-sm text-gray-600">
                                            <span class="font-medium">{_`Horario:`}</span> {curso.horario}
                                        </div>
                                        <div class="flex items-center gap-2 text-sm text-gray-600">
                                            <span class="font-medium">{_`Profesor:`}</span> {curso.profesor}
                                        </div>
                                    </Card.Content>
                                </Card.Root>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Formulario Pre-inscripción */}
                <section id="pre-inscripcion" class="py-20 bg-white">
                    <div class="container mx-auto px-4 max-w-2xl">
                        <div class="text-center mb-10">
                            <h2 class="text-3xl font-bold text-gray-900 mb-2">{_`Reserva tu vacante - Ciclo 2026`}</h2>
                            <p class="text-gray-600">{_`Completa el formulario y nos pondremos en contacto contigo.`}</p>
                        </div>

                        <Card.Root class="p-6 md:p-8 shadow-xl border-green-100">
                            {action.value?.success ? (
                                <div class="text-center py-12 space-y-4">
                                    <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <LuCheck class="w-8 h-8" />
                                    </div>
                                    <h3 class="text-2xl font-bold text-gray-900">{_`¡Pre-inscripción enviada!`}</h3>
                                    <p class="text-gray-600">{_`Gracias por tu interés. Te contactaremos pronto para confirmar tu vacante.`}</p>
                                    <Button
                                        look="outline"
                                        onClick$={() => { window.location.reload(); }}
                                    >
                                        {_`Enviar otra consulta`}
                                    </Button>
                                </div>
                            ) : (
                                <Form action={action} class="space-y-6">
                                    <div class="space-y-2">
                                        <Label for="nombre">{_`Nombre y Apellido`}</Label>
                                        <Input name="nombre" id="nombre" placeholder="Ej. Juan Pérez" />
                                        {action.value?.failed && action.value.fieldErrors?.nombre && (
                                            <p class="text-sm text-red-500">{action.value.fieldErrors.nombre}</p>
                                        )}
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="email">{_`Email`}</Label>
                                        <Input name="email" id="email" type="email" placeholder="tu@email.com" />
                                        {action.value?.failed && action.value.fieldErrors?.email && (
                                            <p class="text-sm text-red-500">{action.value.fieldErrors.email}</p>
                                        )}
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="telefono">{_`Teléfono / WhatsApp`}</Label>
                                        <Input name="telefono" id="telefono" type="tel" placeholder="+54 9 ..." />
                                        {action.value?.failed && action.value.fieldErrors?.telefono && (
                                            <p class="text-sm text-red-500">{action.value.fieldErrors.telefono}</p>
                                        )}
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="nivel">{_`Nivel de interés`}</Label>
                                        <select
                                            name="nivel"
                                            id="nivel"
                                            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="" disabled selected>{_`Selecciona un nivel`}</option>
                                            <option value="principiante">{_`Principiante (Sin conocimientos)`}</option>
                                            <option value="conocimientos_previos">{_`Con conocimientos previos`}</option>
                                        </select>
                                        {action.value?.failed && action.value.fieldErrors?.nivel && (
                                            <p class="text-sm text-red-500">{action.value.fieldErrors.nivel}</p>
                                        )}
                                    </div>

                                    <div class="space-y-2">
                                        <Label for="comentarios">{_`Comentarios (Opcional)`}</Label>
                                        <Textarea name="comentarios" id="comentarios" placeholder={_`¿Alguna duda o consulta específica?`} />
                                    </div>

                                    <Button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white" disabled={action.isRunning}>
                                        {action.isRunning ? _`Enviando...` : _`Enviar Pre-inscripción`}
                                    </Button>
                                </Form>
                            )}
                        </Card.Root>
                    </div>
                </section>
            </main>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Clases de Italiano 2026 - Círculo Italiano`,
    meta: [
        {
            name: "description",
            content: _`Inscríbete al ciclo lectivo 2026 de nuestras clases de italiano. Todos los niveles.`,
        },
    ],
};
