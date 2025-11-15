/**
 * Converts a snake_case string to camelCase.
 *
 * @param {string} str - The input string in snake_case.
 * @returns {string} The converted string in camelCase.
 *
 * @example
 * snakeToCamel('first_name') // 'firstName'
 */
export function snakeToCamel(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * Converts a camelCase string to snake_case.
 *
 * @param {string} str - The input string in camelCase.
 * @returns {string} The converted string in snake_case.
 *
 * @example
 * camelToSnake('firstName') // 'first_name'
 */
export function camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}


/**
 * Recursively converts all object keys (and nested keys) from snake_case to camelCase.
 *
 * @template T
 * @param {T} data - The input data (object, array, or primitive).
 * @returns {T} A new object/array with all keys converted to camelCase.
 *
 * @example
 * const obj = { first_name: 'John', last_name: 'Doe' }
 * deepSnakeToCamel(obj) // { firstName: 'John', lastName: 'Doe' }
 */
export function deepSnakeToCamel<T>(data: T): T {
    if (Array.isArray(data)) {
        return data.map(item => deepSnakeToCamel(item)) as T
    }

    if (data !== null && typeof data === 'object') {
        const result: any = {}

        for (const [key, value] of Object.entries(data)) {
            result[snakeToCamel(key)] = deepSnakeToCamel(value)
        }

        return result
    }

    return data
}

/**
 * Recursively converts all object keys (and nested keys) from camelCase to snake_case.
 *
 * @template T
 * @param {T} data - The input data (object, array, or primitive).
 * @returns {T} A new object/array with all keys converted to snake_case.
 *
 * @example
 * const obj = { firstName: 'John', lastName: 'Doe' }
 * deepCamelToSnake(obj) // { first_name: 'John', last_name: 'Doe' }
 */
export function deepCamelToSnake<T>(data: T): T {
    if (Array.isArray(data)) {
        return data.map(item => deepCamelToSnake(item)) as T
    }

    if (data !== null && typeof data === 'object') {
        const result: any = {}

        for (const [key, value] of Object.entries(data)) {
            result[camelToSnake(key)] = deepCamelToSnake(value)
        }

        return result
    }

    return data
}
