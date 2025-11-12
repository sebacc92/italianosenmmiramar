import { component$, useSignal, getLocale } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import Logo from '~/media/logo.png?w=96&h=96&jsx';
import { _, locales } from "compiled-i18n";
import { NavLink } from "./NavLink";
import { LuChevronDown, LuFacebook, LuInstagram, LuLanguages, LuMail, LuPhone } from '@qwikest/icons/lucide';

export default component$(() => {
  const currentLocale = getLocale();
  type NavigationItem = {
    name: any;
    href: string;
    dropdown?: boolean;
    items?: { name: any; href: string }[];
  };

  const navigation: NavigationItem[] = [
    { name: _`Inicio`, href: `/${currentLocale}` },
    { name: _`Nosotros`, href: `/${currentLocale}/nosotros` },
    { name: _`Servicios`, href: `/${currentLocale}/servicios` },
    { name: _`Eventos`, href: `/${currentLocale}/eventos` },
    // {
    //   name: _`Idiomas`,
    //   href: "#",
    //   dropdown: true,
    //   items: [
    //     { name: _`Clases de Italiano`, href: `/${currentLocale}/clases/italiano` },
    //     { name: _`Clases de Inglés`, href: `/${currentLocale}/clases/ingles` },
    //   ],
    // },
    { name: _`Asociate`, href: `/${currentLocale}/asociate` },
    { name: _`Contáctanos`, href: `/${currentLocale}/contacto` },
  ]
  const mobileMenuOpen = useSignal(false);
  const showLanguageDropdown = useSignal<boolean>(false);
  const languageNamesShort: Record<string, string> = {
    'es': 'ES',
    'en': 'EN',
    'it': 'IT',
  };
  const languageNames: Record<string, string> = {
    'es': 'Español',
    'en': 'English',
    'it': 'Italiano',
  };

  return (
    <header class="w-full">
      {/* Top bar - solo decorativo */}
      <div class="h-[7px] bg-gradient-to-r from-[#009246] via-white to-[#CE2B37]"></div>

      {/* Main header with logo and navigation */}
      <div class="bg-white border-b">
        <div class="container mx-auto px-3 py-3">
          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <Link href={`/${currentLocale}`} class="flex items-center gap-2 md:gap-4">
                <Logo
                  alt="Círculo Italiano Miramar Logo"
                  class="rounded-full w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 transition-all"
                />
                <div class="block">
                  <p class="text-sm sm:text-lg md:text-2xl lg:text-2xl font-bold leading-tight whitespace-normal md:whitespace-nowrap max-w-[180px] md:max-w-none">
                    Mutual Cultural Círculo Italiano Joven Italia
                  </p>
                  <p class="text-[10px] sm:text-xs md:text-sm font-medium tracking-wide text-gray-600 uppercase">Miramar - Buenos Aires</p>
                </div>
              </Link>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-3 text-[#CE2B37]">
                  <Link href="https://www.facebook.com/circuloitalianomiramar" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="transition-transform hover:-translate-y-0.5">
                    <LuFacebook class="h-5 w-5" />
                  </Link>
                  <Link href="https://www.instagram.com/circuloitalianomiramar" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="transition-transform hover:-translate-y-0.5">
                    <LuInstagram class="h-5 w-5" />
                  </Link>
                </div>
                <div class="hidden sm:flex flex-col text-xs md:text-sm text-right text-gray-600">
                  <a href="tel:2291451937" class="flex items-center justify-end gap-2 hover:text-[#CE2B37] transition-colors">
                    <LuPhone class="h-4 w-4 text-[#009246]" />
                    <span>2291 451937</span>
                  </a>
                </div>
                {/* Mobile menu button */}
                <button class="md:hidden p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50" aria-label="Menu" onClick$={() => mobileMenuOpen.value = true}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop navigation with language selector */}
            <div class="hidden md:block border-t border-gray-100 pt-3">
              <div class="relative flex items-center justify-center">
                <nav class="flex items-center justify-center font-bold gap-2">
                  {navigation.map((item) =>
                    item.dropdown ? (
                      <div key={item.name} class="relative group">
                        <button class="text-gray-700 text-sm px-4 py-2 transition-colors hover:text-primary flex items-center gap-1 whitespace-nowrap">
                          {item.name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-4 w-4"
                          >
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <div class="absolute left-0 top-full z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white py-2 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          {item.items?.map((subItem) => (
                            <NavLink
                              key={subItem.name}
                              href={subItem.href}
                              class="block px-4 py-2 text-md hover:!text-[#fff] hover:bg-[#009246]"
                              activeClass="!text-green-600"
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        key={item.name}
                        href={item.href}
                        class="text-gray-700 hover:!text-[#fff] hover:bg-[#009246] text-md py-2 px-4 whitespace-nowrap"
                        activeClass="!text-green-600"
                      >
                        {item.name}
                      </NavLink>
                    ),
                  )}
                </nav>

                {/* Language selector */}
                <div class="absolute right-0">
                  <div class="relative">
                    <button
                      onClick$={() => showLanguageDropdown.value = !showLanguageDropdown.value}
                      class="flex items-center justify-center p-2 text-[#CE2B37] hover:text-[#b52532] bg-white border border-gray-200 rounded-lg transition-colors cursor-pointer"
                      aria-label={_`Change language`}
                    >
                      <LuLanguages class="w-5 h-5" />
                      <span class="ml-1 text-sm">{languageNamesShort[currentLocale] || currentLocale}</span>
                      <LuChevronDown
                        class={`w-5 h-5 transition-transform duration-200 ${showLanguageDropdown.value ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>

                    {showLanguageDropdown.value && (
                      <div class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-20 animate-fadeIn border border-gray-200">
                        {locales.map((locale) => (
                          <a
                            key={locale}
                            href={`/${locale}${currentLocale === locale ? "" : `/${locale}`}`}
                            class={`block px-4 py-2 text-sm ${locale === currentLocale ?
                              'bg-[#009246]/10 text-[#009246] font-medium' :
                              'text-gray-700 hover:bg-gray-100'}`}
                          >
                            {languageNames[locale] || locale}
                            {locale === currentLocale && (
                              <span class="ml-2">✓</span>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {mobileMenuOpen.value && (
          <div class="fixed inset-0 z-50 bg-black/40 flex">
            <div class="bg-white w-64 max-w-full h-full shadow-lg p-6 flex flex-col gap-4 animate-slideInLeft">
              <button class="self-end mb-4" aria-label="Cerrar menú" onClick$={() => mobileMenuOpen.value = false}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Mobile language selector */}
              <div class="mb-4">
                <span class="block font-bold text-gray-700 mb-2">{_`Change language`}</span>
                <div class="flex flex-col gap-1">
                  {locales.map((locale) => (
                    <a
                      key={locale}
                      href={`/${locale}`}
                      class={`px-3 py-2 rounded text-sm ${locale === currentLocale ?
                        'bg-[#009246] text-white font-medium' :
                        'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {languageNames[locale] || locale}
                    </a>
                  ))}
                </div>
              </div>

              {navigation.map((item) =>
                item.dropdown ? (
                  <div key={item.name} class="group">
                    <span class="block font-bold text-gray-700 mb-1">{item.name}</span>
                    <div class="ml-2 flex flex-col gap-1">
                      {item.items?.map((subItem) => (
                        <NavLink
                          key={subItem.name}
                          href={subItem.href}
                          class="text-gray-600 py-1 px-2 rounded hover:bg-[#009246] hover:text-white"
                          activeClass="!text-green-600"
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={item.name}
                    href={item.href}
                    class="text-gray-700 font-bold py-2 px-2 rounded hover:bg-[#009246] hover:text-white"
                    activeClass="!text-green-600"
                  >
                    {item.name}
                  </NavLink>
                )
              )}
            </div>
            <div class="flex-1" onClick$={() => mobileMenuOpen.value = false}></div>
          </div>
        )}
      </div>
    </header>
  );
});
