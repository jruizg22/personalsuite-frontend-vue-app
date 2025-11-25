import type {Variant} from 'vuetify/lib/composables/variant'

/**
 * Props definition for a generic button component.
 *
 * These properties allow customizing the button label,
 * appearance, behavior, and interaction feedback.
 */
export interface ButtonProps {
    /**
     * Text content displayed inside the button.
     * If omitted, the button may render with slot content or remain empty.
     */
    text?: string

    /**
     * Color applied to the button.
     * Accepts Vuetify color names (e.g., `"primary"`, `"success"`)
     * or custom CSS color values.
     */
    color?: string

    /**
     * Visual variant of the button, as defined by Vuetify.
     * Examples include `"flat"`, `"tonal"`, `"outlined"`, etc.
     */
    variant?: Variant

    /**
     * Enables or disables the ripple effect when the button is pressed.
     * Defaults to `true` in Vuetify unless overridden.
     */
    ripple?: boolean
}