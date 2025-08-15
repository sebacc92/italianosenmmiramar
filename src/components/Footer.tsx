import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Logo from '~/media/logo.png?w=96&h=96&jsx';
import { _ } from "compiled-i18n";
import { LuMapPin, LuPhone, LuMail, LuFacebook, LuInstagram } from "@qwikest/icons/lucide";

export default component$(() => {
    return (
        <footer class="w-full bg-muted py-12">
            <div class="container mx-auto w-full px-4">
                <div class="grid gap-8 md:grid-cols-3">
                    <div class="flex flex-col items-start">
                        <div class="flex items-center gap-2">
                            <Logo
                                alt="Círculo Italiano Miramar Logo"
                                class="rounded-full"
                                style={{ width: '70px', height: '70px' }}
                            />
                            <div>
                                <p class="text-sm font-medium">Mutual Cultural</p>
                                <p class="text-xl font-bold">Círculo Italiano</p>
                                <p class="text-xs">Joven Italia - Miramar</p>
                            </div>
                        </div>
                        <p class="mt-4 text-sm text-muted-foreground">
                            {_`Acompañando a la ciudad de Miramar hace 136 años`}
                        </p>
                        <p class="flex gap-2 text-sm text-muted-foreground">
                            <span class="text-primary">🇦🇷</span>
                            <span class="text-primary">🇮🇹</span>
                        </p>
                    </div>

                    <div>
                        <h3 class="mb-4 text-lg font-bold">{_`Enlaces rápidos`}</h3>
                        <ul class="space-y-2">
                            <li>
                                <Link href="/clases" class="text-sm hover:text-primary">
                                    {_`Clases de Italiano`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/ingles" class="text-sm hover:text-primary">
                                    {_`Clases de Inglés`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/eventos" class="text-sm hover:text-primary">
                                    {_`Eventos y Muestras`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/tramites" class="text-sm hover:text-primary">
                                    {_`Trámites de Ciudadanía`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/historia" class="text-sm hover:text-primary">
                                    {_`Nuestra Historia`}
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" class="text-sm hover:text-primary">
                                    {_`Contacto`}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="mb-4 text-lg font-bold">{_`Contacto`}</h3>
                        <ul class="space-y-3">
                            <li class="flex items-center gap-2 text-sm">
                                <LuMapPin class="h-4 w-4 text-primary" />
                                <span>{_`Calle 24 nº 1214, Miramar, Buenos Aires 7607`}</span>
                            </li>
                            <li class="flex items-center gap-2 text-sm">
                                <LuPhone class="h-4 w-4 text-primary" />
                                <span>2291 451937</span>
                            </li>
                            <li class="flex items-center gap-2 text-sm">
                                <LuMail class="h-4 w-4 text-primary" />
                                <span>italianos@miramarense.com.ar</span>
                            </li>
                            <li class="mt-4 flex items-center gap-3">
                                <Link href="https://www.facebook.com/circuloitalianomiramar" target="_blank" rel="noopener noreferrer">
                                    <LuFacebook class="h-5 w-5 hover:text-primary" />
                                </Link>
                                <Link href="https://www.instagram.com/circuloitalianomiramar" target="_blank" rel="noopener noreferrer">
                                    <LuInstagram class="h-5 w-5 hover:text-primary" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
                    <p>
                        © {new Date().getFullYear()} {_`Mutual Cultural Círculo Italiano Joven Italia - Miramar`}. {_`Todos los derechos reservados`}.
                    </p>
                </div>
            </div>
        </footer>
    );
});
