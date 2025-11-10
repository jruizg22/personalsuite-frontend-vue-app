/**
 * i18n messages object for the application.
 *
 * This file imports the common translation JSON files for each locale
 * and organizes them under locale codes.
 *
 * Structure:
 * - Each locale key (e.g., `en_US`, `es_ES`) contains a `common` namespace.
 * - The `common` namespace holds all general UI strings used across the app.
 *
 * Example usage with vue-i18n:
 * ```ts
 * import { createI18n } from 'vue-i18n'
 * import { messages } from './locales'
 *
 * const i18n = createI18n({
 *   locale: 'en_US',
 *   fallbackLocale: 'es_ES',
 *   messages,
 * })
 * ```
 */

import commonEnUs from './en_US.json'
import commonEsEs from './es_ES.json'

import mediaTrackerEnUs from '@media-tracker/locales/en_US.json'
import mediaTrackerEsEs from '@media-tracker/locales/es_ES.json'

/**
 * i18n messages object for the application.
 *
 * Contains the translations for all supported locales, organized by namespace.
 *
 * @example
 * import { messages } from './locales'
 * console.log(messages.en_US.common.start) // "Start"
 */
export const messages = {
    /** English (United States) translations */
    en_US: {
        /** Common namespace containing general UI strings */
        common: commonEnUs,
        /** Media Tracker namespace */
        mediaTrackerEnUs: mediaTrackerEnUs,
    },
    /** Spanish (Spain) translations */
    es_ES: {
        /** Common namespace containing general UI strings */
        common: commonEsEs,
        /** Media Tracker namespace */
        mediaTrackerEsEs: mediaTrackerEsEs,
    },
} as const;