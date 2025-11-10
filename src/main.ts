/**
 * Entry point of the Vue 3 application.
 *
 * This file sets up and mounts the main App component.
 * The following plugins and libraries are integrated:
 * - Pinia: state management
 * - Vuetify: Material Design UI framework
 * - vue-i18n: internationalization
 * - Vue Router: client-side routing
 */

import {createApp} from 'vue'
import App from '@/App.vue'
import {createPinia} from 'pinia'
import {i18n, vuetify} from '@/plugins'
import router from '@/router'

/**
 * Creates the main Vue application instance.
 */
const app = createApp(App)

/**
 * Registers Pinia for global state management.
 */
app.use(createPinia())

/**
 * Registers Vuetify as the UI framework plugin.
 */
app.use(vuetify)

/**
 * Registers vue-i18n for internationalization support.
 */
app.use(i18n)

/**
 * Registers Vue Router for client-side routing.
 */
app.use(router)

/**
 * Mounts the application to the DOM element with id "app".
 */
app.mount('#app')