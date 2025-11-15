import axios, {type AxiosInstance} from 'axios'
import {deepCamelToSnake, deepSnakeToCamel} from '@/utils'

/**
 * `api` Axios instance
 *
 * A pre-configured Axios instance for communicating with the backend API.
 * Includes automatic snake_case ↔ camelCase conversion for requests and responses,
 * and attaches the API key from environment variables to request headers.
 *
 * ### Configuration
 * - `baseURL`: taken from `import.meta.env.VITE_API_BASE_URL`
 * - `timeout`: 10 seconds
 * - `headers['X-API-Key']`: taken from `import.meta.env.VITE_API_KEY`
 *
 * ### Request Interceptors
 * - Converts `config.data` and `config.params` from camelCase to snake_case
 *   using the `deepCamelToSnake` utility before sending the request.
 *
 * ### Response Interceptors
 * - Converts `response.data` from snake_case to camelCase using `deepSnakeToCamel`.
 * - Logs errors to the console and rejects the promise.
 *
 * ### Example Usage
 * ```ts
 * import { api } from '@/api'
 *
 * // GET request
 * const users = await api.get('/users')
 *
 * // POST request with camelCase keys in JS, automatically converted
 * const newUser = await api.post('/users', { firstName: 'John', lastName: 'Doe' })
 * ```
 *
 * ### Notes
 * - Ensure `VITE_API_BASE_URL` and `VITE_API_KEY` are defined in your environment variables.
 * - Automatic conversion utilities (`deepCamelToSnake` / `deepSnakeToCamel`) help
 *   keep frontend code idiomatic (camelCase) while backend expects snake_case.
 * - Errors are logged to the console; consider adding more sophisticated error handling in production.
 */
export const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10_000,
    headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
    }
})

api.interceptors.request.use(config => {
    if (config.data) {
        config.data = deepCamelToSnake(config.data)
    }
    if (config.params) {
        config.params = deepCamelToSnake(config.params)
    }
    return config
})

api.interceptors.response.use(
    response => {
        if (response.data) {
            response.data = deepSnakeToCamel(response.data)
        }
        return response
    },
    error => {
        console.error('API error:', error)
        return Promise.reject(error)
    }
)