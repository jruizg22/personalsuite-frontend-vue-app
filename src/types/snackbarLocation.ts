/**
 * Defines the possible screen positions where a snackbar can be displayed.
 *
 * These values correspond to the standard positional options typically
 * supported by UI frameworks, allowing placement along edges or corners
 * of the viewport.
 */
export type SnackbarLocation =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'