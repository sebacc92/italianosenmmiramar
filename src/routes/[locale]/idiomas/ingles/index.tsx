import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, Form, zod$, z } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import { LuCheck, LuGraduationCap, LuClock, LuUser, LuSparkles } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui/button/button";
import { Card } from "~/components/ui/card/card";
import { Input } from "~/components/ui/input/input";
import { Label } from "~/components/ui/label/label";
import { Textarea } from "~/components/ui/textarea/textarea";
import HeroInglesImg from "~/media/hero-ingles.avif";

export const useSubmitPreInscripcionIngles = routeAction$(
  async (data) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Pre-inscripción Inglés recibida:", data);
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

const CURSOS_INGLES = [
  {
    titulo: "English Course",
    nivel: "All Levels",
    horario: "Lunes y Miércoles 18:00 - 19:30",
    profesor: "Sarah Johnson",
    icon: LuGraduationCap,
  },
];

export default component$(() => {
  const action = useSubmitPreInscripcionIngles();

  return (
    <div class="flex min-h-screen flex-col">
      <main class="flex-1">
        {/* Hero Section */}
        <section class="relative py-24 md:py-32 text-white overflow-hidden">
          {/* Background Image & Gradient Overlay */}
          <div class="absolute inset-0 z-0">
            <img
              src={HeroInglesImg}
              alt="Hero English"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-black/60"></div>
          </div>

          <div class="container relative z-10 mx-auto px-4">
            <div class="grid gap-12 md:grid-cols-2 items-center">
              <div class="space-y-8">
                <div class="inline-block">
                  <span class="bg-blue-500/20 text-blue-100 px-4 py-2 rounded-full text-sm font-semibold border border-blue-400/30 backdrop-blur-sm">
                    {_`Ciclo 2026`}
                  </span>
                </div>
                <h1 class="text-5xl md:text-6xl font-bold leading-tight">
                  {_`Aprende Inglés y conéctate con el mundo`}
                </h1>
                <p class="text-xl md:text-2xl text-blue-50 leading-relaxed">
                  {_`Cursos dinámicos para todas las edades y niveles. Desarrollá tus habilidades de comunicación global.`}
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                  <Button class="bg-white text-blue-700 hover:bg-blue-50 hover:scale-105 transition-all text-lg px-8 py-6 h-auto shadow-xl">
                    <a href="#pre-inscripcion" class="flex items-center gap-2">
                      <LuSparkles class="w-5 h-5" />
                      {_`Reservar mi vacante`}
                    </a>
                  </Button>
                  <Button class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all text-lg px-8 py-6 h-auto">
                    <a href="/idiomas/italiano">{_`Ver clases de Italiano`}</a>
                  </Button>
                </div>
              </div>
              <div class="hidden md:flex justify-center">
                <div class="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 bg-blue-800 h-[500px] w-[400px] flex items-center justify-center">
                  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
                  <span class="relative z-10 text-6xl font-bold text-white tracking-widest">ENGLISH</span>
                  <div class="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cursos Grid */}
        <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div class="container mx-auto px-4">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">{_`Nuestros Cursos`}</h2>
              <p class="text-lg text-gray-600 max-w-2xl mx-auto">{_`Programas diseñados para desarrollar tus habilidades de comunicación efectiva.`}</p>
            </div>

            <div class="flex justify-center">
              {CURSOS_INGLES.map((curso, index) => {
                const Icon = curso.icon;
                return (
                  <Card.Root key={index} class="bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-t-blue-600 group max-w-md w-full">
                    <Card.Header class="space-y-3">
                      <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon class="w-6 h-6" />
                      </div>
                      <Card.Title class="text-xl font-bold">{curso.titulo}</Card.Title>
                      <Card.Description class="text-sm font-medium">{curso.nivel}</Card.Description>
                    </Card.Header>
                    <Card.Content class="space-y-3">
                      <div class="flex items-start gap-2 text-sm text-gray-600">
                        <LuClock class="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span class="text-xs leading-relaxed">{curso.horario}</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm text-gray-600">
                        <LuUser class="w-4 h-4 flex-shrink-0" />
                        <span class="text-xs">{curso.profesor}</span>
                      </div>
                    </Card.Content>
                  </Card.Root>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section class="py-20 bg-gradient-to-br from-blue-50 via-sky-50 to-blue-50">
          <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">{_`Aranceles y Matrícula`}</h2>
            <p class="text-gray-600 mb-12">{_`Precios accesibles para toda la comunidad`}</p>

            <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              <div class="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-xl border-2 border-blue-400 relative overflow-hidden transform hover:scale-105 transition-all">
                <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div class="absolute top-4 right-4">
                  <span class="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">{_`Beneficio`}</span>
                </div>
                <h3 class="text-xl font-bold text-white mb-4">{_`Socios`}</h3>
                <p class="text-5xl font-bold text-white mb-2">$15.000</p>
                <p class="text-sm text-blue-100">{_`Mensual`}</p>
                <div class="mt-6 pt-6 border-t border-blue-400/30">
                  <p class="text-sm text-blue-50">{_`Ahorrá $3.000 por mes`}</p>
                </div>
              </div>
              <div class="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all">
                <h3 class="text-xl font-bold text-gray-700 mb-4">{_`No Socios`}</h3>
                <p class="text-5xl font-bold text-gray-900 mb-2">$18.000</p>
                <p class="text-sm text-gray-500">{_`Mensual`}</p>
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <p class="text-sm text-gray-600">{_`Precio regular`}</p>
                </div>
              </div>
              <div class="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all">
                <h3 class="text-xl font-bold text-gray-700 mb-4">{_`Inscripción`}</h3>
                <p class="text-5xl font-bold text-gray-900 mb-2">$10.000</p>
                <p class="text-sm text-gray-500">{_`Pago único anual`}</p>
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <p class="text-sm text-gray-600">{_`Una sola vez al año`}</p>
                </div>
              </div>
            </div>

            <div class="max-w-3xl mx-auto space-y-6">
              <div class="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
                <div class="flex items-center justify-center gap-3 mb-2">
                  <LuSparkles class="w-6 h-6" />
                  <p class="text-2xl font-bold">{_`¡Reserva GRATUITA!`}</p>
                </div>
                <p class="text-blue-50">
                  {_`Reservá tu vacante sin costo. Nos comunicaremos en Marzo para confirmar tu inscripción.`}
                </p>
              </div>
              <p class="text-sm text-gray-500 italic bg-white/60 backdrop-blur-sm p-4 rounded-lg">
                {_`* Los precios mostrados corresponden al ciclo 2025 y están sujetos a posibles aumentos para el ciclo 2026.`}
              </p>
            </div>
          </div>
        </section>

        {/* Formulario Pre-inscripción */}
        <section id="pre-inscripcion" class="py-20 bg-white">
          <div class="container mx-auto px-4 max-w-2xl">
            <div class="text-center mb-10">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">{_`Reserva tu vacante - Ciclo 2026`}</h2>
              <p class="text-gray-600">{_`Completa el formulario para recibir más información sobre los cursos de inglés.`}</p>
            </div>

            <Card.Root class="p-6 md:p-8 shadow-xl border-blue-100">
              {action.value?.success ? (
                <div class="text-center py-12 space-y-4">
                  <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
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

                  <input type="hidden" name="nivel" value="unico" />

                  <div class="space-y-2">
                    <Label for="comentarios">{_`Comentarios (Opcional)`}</Label>
                    <Textarea name="comentarios" id="comentarios" placeholder={_`¿Alguna duda o consulta específica?`} />
                  </div>

                  <Button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={action.isRunning}>
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
  title: _`Clases de Inglés 2026 - Círculo Italiano`,
  meta: [
    {
      name: "description",
      content: _`Inscríbete al ciclo lectivo 2026 de nuestras clases de inglés. Todos los niveles.`,
    },
  ],
};
