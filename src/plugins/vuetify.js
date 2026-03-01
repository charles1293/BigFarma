/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'bigFarmaTheme',
    themes: {
      bigFarmaTheme: {
        dark: false,
        colors: {
          primary: '#2E7D32',    // vert pharmacie
          secondary: '#66BB6A',
          accent: '#A5D6A7',
          background: '#F1F8E9',
          surface: '#FFFFFF',
          error: '#D32F2F',
          info: '#1976D2',
          success: '#388E3C',
          warning: '#FFA000',
        },
      },
    },
  },
})
