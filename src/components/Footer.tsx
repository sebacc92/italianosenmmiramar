import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Logo from '~/media/logo.png?w=96&h=96&jsx';
import { _ } from "compiled-i18n";
import { LuMapPin, LuPhone, LuMail, LuFacebook, LuInstagram, LuClock } from "@qwikest/icons/lucide";

export default component$(() => {
    const currentYear = new Date().getFullYear();

    return (
        <footer class="bg-gray-900 text-white pt-16 pb-8">
            <div class="container mx-auto px-4">
                <div class="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-12">

                    {/* Brand Column */}
                    <div class="space-y-6">
                        <div class="flex items-center gap-3">
                            <div class="bg-white/10 p-2 rounded-full backdrop-blur-sm">
                                <Logo
                                    alt="Círculo Italiano Miramar Logo"
                                    class="h-14 w-14"
                                />
                            </div>
                            <div>
                                <h3 class="font-bold text-lg leading-tight">Círculo Italiano</h3>
                                <p class="text-xs text-gray-400 uppercase tracking-widest">Miramar • Joven Italia</p>
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm leading-relaxed">
                            {_`Desde 1889, preservando la cultura italiana y construyendo comunidad en Miramar. Un legado de tradición, solidaridad y futuro.`}
                        </p>
                        <div class="flex gap-4">
                            <a
                                href="https://www.facebook.com/circuloitalianomiramar"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="bg-white/5 hover:bg-[#1877F2] p-2 rounded-full transition-all duration-300 hover:-translate-y-1"
                                aria-label="Facebook"
                            >
                                <LuFacebook class="h-5 w-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/circuloitalianomiramar"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="bg-white/5 hover:bg-[#E4405F] p-2 rounded-full transition-all duration-300 hover:-translate-y-1"
                                aria-label="Instagram"
                            >
                                <LuInstagram class="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 class="text-lg font-bold mb-6 relative inline-block">
                            {_`Enlaces Rápidos`}
                            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-green-600 rounded-full"></span>
                        </h4>
                        <ul class="space-y-3 text-sm">
                            <li>
                                <Link href="/autoridades" class="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2">
                                    <span class="w-1 h-1 bg-green-500 rounded-full"></span>
                                    {_`Autoridades`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/nosotros" class="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2">
                                    <span class="w-1 h-1 bg-white rounded-full"></span>
                                    {_`Nuestra Historia`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/servicios" class="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2">
                                    <span class="w-1 h-1 bg-red-500 rounded-full"></span>
                                    {_`Servicios`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/eventos" class="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2">
                                    <span class="w-1 h-1 bg-green-500 rounded-full"></span>
                                    {_`Eventos`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/asociate" class="text-gray-400 hover:text-white hover:pl-2 transition-all duration-200 flex items-center gap-2">
                                    <span class="w-1 h-1 bg-white rounded-full"></span>
                                    {_`Asociate`}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 class="text-lg font-bold mb-6 relative inline-block">
                            {_`Servicios`}
                            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-white rounded-full"></span>
                        </h4>
                        <ul class="space-y-3 text-sm">
                            <li>
                                <Link href="/clases" class="text-gray-400 hover:text-white transition-colors">
                                    {_`Cursos de Idioma Italiano`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/tramites" class="text-gray-400 hover:text-white transition-colors">
                                    {_`Asesoría Ciudadanía`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/alquiler-salones" class="text-gray-400 hover:text-white transition-colors">
                                    {_`Alquiler de Salones`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/cultura" class="text-gray-400 hover:text-white transition-colors">
                                    {_`Actividades Culturales`}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 class="text-lg font-bold mb-6 relative inline-block">
                            {_`Contacto`}
                            <span class="absolute -bottom-2 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
                        </h4>
                        <ul class="space-y-4 text-sm">
                            <li class="flex items-start gap-3 text-gray-400">
                                <LuMapPin class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                <span>Calle 24 nº 1214<br />Miramar, Buenos Aires (7607)</span>
                            </li>
                            <li class="flex items-center gap-3 text-gray-400">
                                <LuPhone class="h-5 w-5 text-white shrink-0" />
                                <a href="tel:2291433766" class="hover:text-white transition-colors">2291 433766</a>
                            </li>
                            <li class="flex items-center gap-3 text-gray-400">
                                <LuMail class="h-5 w-5 text-red-500 shrink-0" />
                                <a href="mailto:italianos@miramarense.com.ar" class="hover:text-white transition-colors">italianos@miramarense.com.ar</a>
                            </li>
                            <li class="flex items-start gap-3 text-gray-400">
                                <LuClock class="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                <span>Lunes a Viernes<br />16:00 - 20:00 hs</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div class="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>
                        © {currentYear} Mutual Cultural Círculo Italiano Joven Italia. {_`Todos los derechos reservados.`}
                    </p>
                    <div class="flex items-center gap-6">
                        <Link href="/privacidad" class="hover:text-white transition-colors">{_`Política de Privacidad`}</Link>
                        <Link href="/terminos" class="hover:text-white transition-colors">{_`Términos de Uso`}</Link>
                    </div>
                </div>

                {/* Tricolor Line Bottom */}
                <div class="w-full h-1 bg-gradient-to-r from-[#009246] via-white to-[#CE2B37] mt-8 opacity-50"></div>
            </div>
        </footer>
    );
});
