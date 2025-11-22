/**
 * DateType
 *
 * A string literal type used to define the formatting style for dates
 * in components such as `DateColumn.vue`.
 *
 * Possible values:
 * - `'short'`  : Short date format, e.g., 12/31/23
 * - `'medium'` : Medium date format, e.g., Dec 31, 2023
 * - `'long'`   : Long date format, e.g., December 31, 2023
 * - `'full'`   : Full date format, including weekday, e.g., Sunday, December 31, 2023
 *
 * Usage:
 * ```ts
 * import type { DateType } from '@/types'
 *
 * const format: DateType = 'long'
 * ```
 *
 * This type is typically used with `vue-i18n`'s `datetimeFormats`
 * to ensure consistent, locale-aware date formatting.
 */
export type DateType = 'short' | 'long' | 'medium' | 'full'