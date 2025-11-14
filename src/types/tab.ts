import type {MdiIcon} from '@/types'
import type {Component} from 'vue'

/**
 * Interface representing a single tab in a Tabs component.
 *
 * Each tab has:
 * - A unique identifier (`tabId`) used for `v-model` binding and keying.
 * - A label (`label`) which is an i18n key translated via `vue-i18n`.
 * - An optional icon (`icon`) displayed before the label.
 * - A `component` that will be dynamically rendered when the tab is active.
 *
 * ### Properties
 * @property {string} tabId - Unique identifier for the tab. Used as the `v-model` value and `key` in lists.
 * @property {string} label - i18n key for the tab label. The Tabs component will translate this using `vue-i18n`.
 * @property {Component} component - Vue component to render when this tab is active.
 * @property {MdiIcon} [icon] - Optional icon to display before the tab label. Must be one of the allowed Material Design Icons (`MdiIcon` type).
 *
 * ### Example
 * ```ts
 * import { ChannelsTab, VideosTab } from '@/components/tabs'
 *
 * const tabs: Tab[] = [
 *   { tabId: 'channels', label: 'mediaTracker.channels', component: ChannelsTab, icon: 'mdi-account-group' },
 *   { tabId: 'videos', label: 'mediaTracker.videos', component: VideosTab, icon: 'mdi-video' }
 * ];
 * ```
 *
 * @remarks
 * - The `component` can be any Vue component and will be mounted/unmounted dynamically when switching tabs.
 * - The `icon` is optional; if omitted, the tab will display only the label.
 */
export interface Tab {
    /** Unique identifier for the tab. Used as the `v-model` value and `key` in lists. */
    tabId: string;
    /** i18n key for the tab label. The Tabs component will translate this using `vue-i18n`. */
    label: string;
    /** Vue component to render when this tab is active. */
    component: Component;
    /** Optional icon to display before the tab label. Must be one of the allowed Material Design Icons (`MdiIcon` type). */
    icon?: MdiIcon;
}