import {component$, getLocale} from '@builder.io/qwik'
import {locales} from 'compiled-i18n'
import { LuLanguages } from '@qwikest/icons/lucide'
import { Button } from './ui/button/button'

export const LocaleSelector = component$(() => {
	const currentLocale = getLocale()
	
	return (
		<div class="relative group">
			<Button look="ghost" size="icon" tabIndex={0} aria-label="Select language">
				<LuLanguages class="h-5 w-5" />
			</Button>
			<div class="absolute right-0 mt-2 hidden group-focus-within:block group-hover:block bg-base-100 border rounded shadow-lg z-50 min-w-[120px]">
				{locales.map(locale => {
					const isCurrent = locale === currentLocale
					return (
						<a
							key={locale}
							href={`/${locale}`}
							aria-disabled={isCurrent}
							class={`block px-4 py-2 hover:bg-accent text-sm ${
								isCurrent 
									? 'bg-accent text-primary font-semibold pointer-events-none' 
									: 'text-muted-foreground'
							}`}
						>
							{locale === "es" ? "🇪🇸 Español" : "🇺🇸 English"}
						</a>
					)
				})}
			</div>
		</div>
	)
})