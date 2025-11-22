/**
 * Union type representing the allowed Material Design Icons (MDI)
 * used throughout the application.
 *
 * This type is intended for use in places such as:
 * - `RouteMeta.icon` in route definitions
 * - `v-list-item` `prepend-icon` / `append-icon` props
 * - Any component that accepts an MDI icon string
 *
 * Using this type ensures:
 * - Autocompletion in IDEs
 * - Type safety for icon strings
 *
 * Example usage:
 * ```ts
 * const routeIcon: MdiIcon = 'mdi-home';
 *
 * const menuItem = {
 *   title: 'Home',
 *   icon: routeIcon
 * }
 * ```
 */
export type MdiIcon =
    | 'mdi-home'
    | 'mdi-cog'
    | 'mdi-movie'
    | 'mdi-youtube'
    | 'mdi-play-circle'
    | 'mdi-movie-open'
    | 'mdi-account'
    | 'mdi-account-group'
    | 'mdi-view-dashboard'
    | 'mdi-magnify'