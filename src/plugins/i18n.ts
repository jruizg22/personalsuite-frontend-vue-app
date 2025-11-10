import {createI18n} from 'vue-i18n'
import {messages} from "@/locales";

/**
 * Vue I18n instance for the application.
 *
 * This instance is configured with:
 * - `legacy: false` to enable Composition API (`useI18n`) usage.
 * - `locale`: the default locale of the app (`es_ES`).
 * - `fallbackLocale`: the locale used if a translation is missing (`en_US`).
 * - `messages`: the translation messages imported from `locales/index.ts`.
 *
 * Usage in components with Composition API:
 * ```ts
 * import { useI18n } from 'vue-i18n'
 * const { t } = useI18n()
 * console.log(t('common.start')) // Translated string
 * ```
 */
export const i18n = createI18n({
    legacy: false,
    locale: 'es_ES',
    fallbackLocale: 'en_US',
    messages,
})