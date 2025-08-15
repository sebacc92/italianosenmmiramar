import { component$ } from "@builder.io/qwik";
import { _ } from "compiled-i18n";
import { Button } from "~/components/ui/button/button";

export default component$(() => {
  return (
    <section class="py-16 bg-white min-h-screen">
      <div class="container mx-auto px-4 max-w-2xl">
        <h1 class="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
          {_`Contacto`}
        </h1>
        <p class="mb-8 text-gray-700 text-center">
          {_`¿Tienes dudas, consultas o quieres comunicarte con la Mutual Cultural Círculo Italiano Joven Italia? Completa el formulario y te responderemos a la brevedad.`}
        </p>
        <form class="space-y-6 bg-gray-50 p-8 rounded-xl shadow-md border">
          <div>
            <label class="block mb-2 font-medium text-gray-700" for="nombre">
              {_`Nombre y apellido`}
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
              class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label class="block mb-2 font-medium text-gray-700" for="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label class="block mb-2 font-medium text-gray-700" for="asunto">
              {_`Asunto`}
            </label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <label class="block mb-2 font-medium text-gray-700" for="mensaje">
              {_`Mensaje`}
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              required
              class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>
          <div class="text-center">
            <Button type="submit" class="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-all border-2 border-green-700 px-8 py-2">
              {_`Enviar mensaje`}
            </Button>
          </div>
        </form>
        <div class="mt-10 text-center text-gray-600">
          <p class="mb-2">Mutual Cultural Círculo Italiano Joven Italia</p>
          <p class="mb-2">Calle 24 n°1214, Miramar, Buenos Aires</p>
          <p class="mb-2">Email: <a href="mailto:italianos@miramarense.com.ar" class="text-green-700 underline">italianos@miramarense.com.ar</a></p>
          <p>Teléfono: <a href="tel:+542294420000" class="text-green-700 underline">(02291) 42-0000</a></p>
        </div>
      </div>
    </section>
  );
});
