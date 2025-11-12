import { component$, useStylesScoped$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeAction$, Form, zod$, z } from "@builder.io/qwik-city";
import { _ } from "compiled-i18n";
import styles from './styles.css?inline';
import salonMichaelAngelloSrc from '~/media/salones/IMG_20250502_191442.jpg?url';
import salonGiuseppeVerdiSrc from '~/media/salones/IMG_20250502_191252.jpg?url';

export const useReservaAction = routeAction$(
    async (reserva) => {
        // Here you would integrate with your backend service
        // For now, just return success and the data
        console.log("Reserva recibida:", reserva);
        return {
            success: true,
            reserva
        };
    },
    zod$({
        nombre: z.string().min(2, _`Por favor ingrese su nombre`),
        apellido: z.string().min(2, _`Por favor ingrese su apellido`),
        email: z.string().email(_`Por favor ingrese un correo electrónico válido`),
        salon: z.enum(["Salón Michael Angello (1er Piso - 280 personas)", "Salón Guiseppe Verdi (2do Piso - 90 personas)"], {
            errorMap: () => ({ message: _`Por favor seleccione un salón` })
        }),
        mensaje: z.string().min(10, _`Por favor describa el evento o consulta`)
    })
);

export default component$(() => {
    useStylesScoped$(styles)
    const reservaAction = useReservaAction();
    const imagenSalonSeleccionado = useSignal(salonGiuseppeVerdiSrc);

    return (
        <div class="container mx-auto px-4 py-8">
            <div class="gradient-header flex flex-col items-center justify-center text-white py-20 rounded-lg mb-10">
                <h1 class="text-4xl md:text-5xl font-bold mb-4 text-center">{_`Alquiler de salones`}</h1>
                <p class="text-xl text-center max-w-2xl">{_`Espacios ideales para sus eventos sociales, corporativos y culturales`}</p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">{_`Rellene el formulario de contacto para reservar alguno de nuestros salones.`}</h2>
                    <p class="text-gray-600 mb-6">{_`Si necesita alquilar uno de nuestros elegantes salones para su evento o celebración, haga contacto con nuestro equipo. Le ofrecemos asesoramiento personalizado para hacer de su evento un momento inolvidable.`}</p>
                    
                    <div class="salon-image mb-6 relative overflow-hidden rounded-lg shadow-2xl">
                        <img 
                            src={imagenSalonSeleccionado.value}
                            alt={_`Salón seleccionado`}
                            width="1000"
                            height="667"
                            class="w-full h-auto transition-transform duration-700 hover:scale-105"
                        />
                        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                            <h3 class="text-white text-xl font-bold">{_`Tradición italiana en cada detalle`}</h3>
                        </div>
                    </div>

                    <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-primary mt-8">
                        <h3 class="text-xl font-bold text-gray-800 mb-3">{_`¿Por qué elegirnos?`}</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <span>{_`Ubicación privilegiada en el corazón de Miramar`}</span>
                            </li>
                            <li class="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <span>{_`Espacios amplios con iluminación natural`}</span>
                            </li>
                            <li class="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <span>{_`Equipamiento audiovisual de última generación`}</span>
                            </li>
                            <li class="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <span>{_`Ambiente de elegancia y tradición italiana`}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <h3 class="text-xl font-bold text-center text-gray-800 mb-6 pb-3 border-b">{_`Solicitud de Reserva`}</h3>
                    <Form action={reservaAction} class="space-y-4">
                        <div>
                            <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">{_`Tu nombre *`}</label>
                            <input 
                                type="text" 
                                id="nombre" 
                                name="nombre" 
                                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
                                required
                            />
                            {reservaAction.value?.fieldErrors?.nombre && (
                                <p class="text-red-500 text-sm mt-1">{reservaAction.value.fieldErrors.nombre}</p>
                            )}
                        </div>
                        
                        <div>
                            <label for="apellido" class="block text-sm font-medium text-gray-700 mb-1">{_`Tu apellido *`}</label>
                            <input 
                                type="text" 
                                id="apellido" 
                                name="apellido" 
                                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                            {reservaAction.value?.fieldErrors?.apellido && (
                                <p class="text-red-500 text-sm mt-1">{reservaAction.value.fieldErrors.apellido}</p>
                            )}
                        </div>
                        
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">{_`Correo electrónico *`}</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                            {reservaAction.value?.fieldErrors?.email && (
                                <p class="text-red-500 text-sm mt-1">{reservaAction.value.fieldErrors.email}</p>
                            )}
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">{_`¿Qué salón te interesa alquilar? *`}</label>
                            <div class="space-y-3">
                                <label class="flex items-center p-3 border rounded-md hover:bg-gray-50 transition cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="salon" 
                                        value="Salón Michael Angello (1er Piso - 280 personas)" 
                                        class="mr-3 text-primary h-4 w-4" 
                                        required
                                        onChange$={() => imagenSalonSeleccionado.value = salonGiuseppeVerdiSrc}
                                        checked
                                    />
                                    <div>
                                        <span class="font-medium">{_`Salón Michael Angello`}</span>
                                        <p class="text-sm text-gray-500">{_`1er Piso - Capacidad: 280 personas`}</p>
                                    </div>
                                </label>
                                <label class="flex items-center p-3 border rounded-md hover:bg-gray-50 transition cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="salon" 
                                        value="Salón Guiseppe Verdi (2do Piso - 90 personas)" 
                                        class="mr-3 text-primary h-4 w-4" 
                                        required
                                        onChange$={() => imagenSalonSeleccionado.value = salonMichaelAngelloSrc}
                                    />
                                    <div>
                                        <span class="font-medium">{_`Salón Guiseppe Verdi`}</span>
                                        <p class="text-sm text-gray-500">{_`2do Piso - Capacidad: 90 personas`}</p>
                                    </div>
                                </label>
                            </div>
                            {reservaAction.value?.fieldErrors?.salon && (
                                <p class="text-red-500 text-sm mt-1">{reservaAction.value.fieldErrors.salon}</p>
                            )}
                        </div>
                        
                        <div>
                            <label for="mensaje" class="block text-sm font-medium text-gray-700 mb-1">{_`Introduce tu mensaje *`}</label>
                            <textarea 
                                id="mensaje" 
                                name="mensaje" 
                                rows={5} 
                                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder={_`Describe tu evento, fecha deseada, servicios adicionales que necesitas...`}
                                required
                            ></textarea>
                            {reservaAction.value?.fieldErrors?.mensaje && (
                                <p class="text-red-500 text-sm mt-1">{reservaAction.value.fieldErrors.mensaje}</p>
                            )}
                        </div>
                        
                        <div>
                            <button 
                                type="submit" 
                                class="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-opacity-90 transition duration-200 flex items-center justify-center cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
                                </svg>
                                <span>{_`Enviar Solicitud`}</span>
                            </button>
                        </div>

                        {reservaAction.value?.success && (
                            <div class="p-4 bg-green-100 text-green-800 rounded-md mt-4">
                                <div class="flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                    </svg>
                                    <div>
                                        <p class="font-medium">{_`¡Gracias por tu mensaje!`}</p>
                                        <p class="text-sm">{_`Nos pondremos en contacto contigo pronto para confirmar los detalles de tu reserva.`}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
            
            <div class="contact-info bg-gray-50 p-8 rounded-lg shadow-sm space-y-6 mb-12">
                <h3 class="text-2xl font-bold text-center text-gray-800 mb-2">{_`Información de Contacto`}</h3>
                <p class="text-center text-gray-600 mb-6">{_`También nos puede contactar de Lunes a Viernes de 10 a 17hs.`}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                        <div class="bg-primary/10 p-3 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h4 class="text-lg font-semibold mb-2">{_`Teléfono`}</h4>
                        <p class="text-gray-700 mb-2">2291 451937</p>
                        <a href="tel:2291451937" class="text-primary hover:underline text-sm">{_`Llamar ahora`}</a>
                    </div>
                    
                    <div class="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                        <div class="bg-primary/10 p-3 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h4 class="text-lg font-semibold mb-2">{_`Email`}</h4>
                        <p class="text-gray-700 mb-2 break-all">italianos@miramarense.com.ar</p>
                        <a href="mailto:italianos@miramarense.com.ar" class="text-primary hover:underline text-sm">{_`Enviar email`}</a>
                    </div>
                    
                    <div class="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center">
                        <div class="bg-primary/10 p-3 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h4 class="text-lg font-semibold mb-2">{_`Dirección`}</h4>
                        <p class="text-gray-700 mb-2">{_`Calle 24 nº 1214, Miramar, Buenos Aires 7607`}</p>
                        <a href="https://maps.google.com/?q=Calle 24 1214, Miramar, Buenos Aires 7607" target="_blank" class="text-primary hover:underline text-sm">{_`Ver en mapa`}</a>
                    </div>
                </div>
            </div>
            
            {/* Gallery section with our salons */}
            <div class="salon-gallery mt-10 mb-12">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">{_`Nuestros Salones`}</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="salon-card bg-white rounded-lg overflow-hidden shadow-lg">
                        <div class="salon-image h-64 sm:h-80 overflow-hidden">
                            <img 
                                src={salonGiuseppeVerdiSrc}
                                alt={_`Salón Michael Angello`}
                                width="1350"
                                height="900"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-3">
                                <h3 class="text-2xl font-bold text-gray-800">{_`Salón Michael Angello`}</h3>
                                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{_`1er Piso`}</span>
                            </div>
                            <div class="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-gray-600">{_`Capacidad: 280 personas`}</span>
                            </div>
                            <p class="text-gray-600 mb-4">{_`Nuestro salón principal es perfecto para eventos grandes como bodas, conferencias y galas. Con amplios ventanales que proporcionan luz natural y vistas a la ciudad.`}</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{_`Bodas`}</span>
                                <span class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{_`Conferencias`}</span>
                                <span class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{_`Eventos corporativos`}</span>
                            </div>
                            <button class="w-full bg-white border border-primary text-primary font-medium py-2 rounded-md hover:bg-primary hover:text-white transition duration-200 cursor-pointer">{_`Más información`}</button>
                        </div>
                    </div>
                    
                    <div class="salon-card bg-white rounded-lg overflow-hidden shadow-lg">
                        <div class="salon-image h-64 sm:h-80 overflow-hidden">
                            <img 
                                src={salonMichaelAngelloSrc}
                                alt={_`Salón Guiseppe Verdi`}
                                width="1350"
                                height="900"
                                class="w-full h-full object-cover"
                            />
                        </div>
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-3">
                                <h3 class="text-2xl font-bold text-gray-800">{_`Salón Guiseppe Verdi`}</h3>
                                <span class="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{_`2do Piso`}</span>
                            </div>
                            <div class="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                                <span class="text-gray-600">{_`Capacidad: 90 personas`}</span>
                            </div>
                            <p class="text-gray-600 mb-4">{_`Un espacio íntimo y elegante ideal para eventos de mediano tamaño como cumpleaños, reuniones familiares y encuentros corporativos.`}</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{_`Cumpleaños`}</span>
                                <span class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{_`Reuniones`}</span>
                                <span class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{_`Eventos sociales`}</span>
                            </div>
                            <button class="w-full bg-white border border-primary text-primary font-medium py-2 rounded-md hover:bg-primary hover:text-white transition duration-200 cursor-pointer">{_`Más información`}</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-gray-50 p-8 rounded-lg">
                <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">{_`Preguntas Frecuentes`}</h2>
                
                <div class="space-y-4">
                    <div class="bg-white p-5 rounded-lg shadow-sm">
                        <h4 class="text-lg font-semibold mb-2">{_`¿Cómo puedo reservar un salón?`}</h4>
                        <p class="text-gray-600">{_`Puede realizar una reserva completando el formulario en esta página, llamándonos directamente o visitando nuestra secretaría. Le recomendamos reservar con al menos 2 meses de anticipación.`}</p>
                    </div>
                    
                    <div class="bg-white p-5 rounded-lg shadow-sm">
                        <h4 class="text-lg font-semibold mb-2">{_`¿Ofrecen servicio de catering?`}</h4>
                        <p class="text-gray-600">{_`Contamos con una lista de proveedores de catering recomendados, pero también puede traer su propio servicio. Consulte por nuestras opciones de menú italiano tradicional.`}</p>
                    </div>
                    
                    <div class="bg-white p-5 rounded-lg shadow-sm">
                        <h4 class="text-lg font-semibold mb-2">{_`¿Qué instalaciones y equipamiento incluyen?`}</h4>
                        <p class="text-gray-600">{_`Nuestros salones incluyen sistema de sonido básico, proyector, mesas y sillas. Por un costo adicional puede solicitar iluminación especial, decoración y equipamiento audiovisual avanzado.`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const head: DocumentHead = {
    title: _`Alquiler de Salones - Círculo Italiano Miramar`,
    meta: [
        {
            name: "description",
            content: _`Alquile nuestros elegantes salones para sus eventos y celebraciones. Salón Michael Angello para 280 personas y Salón Guiseppe Verdi para 90 personas.`,
        },
    ],
};
