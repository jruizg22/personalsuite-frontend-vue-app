/**
 * `ImportMetaEnv` interface
 *
 * Defines the environment variables accessible in a Vite project.
 *
 * ### Properties
 * @property {string} VITE_API_BASE_URL - The base URL for API requests.
 * @property {string} VITE_API_KEY - The API key to authenticate requests.
 *
 * ### Example
 * ```ts
 * const apiUrl = import.meta.env.VITE_API_BASE_URL
 * const apiKey = import.meta.env.VITE_API_KEY
 * ```
 */
interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string
    readonly VITE_API_KEY: string
}

/**
 * `ImportMeta` interface
 *
 * Extends the default `ImportMeta` type to include Vite environment variables.
 *
 * ### Properties
 * @property {ImportMetaEnv} env - The environment variables defined in Vite.
 *
 * ### Example
 * ```ts
 * console.log(import.meta.env.VITE_API_BASE_URL)
 * ```
 */
interface ImportMeta {
    readonly env: ImportMetaEnv
}