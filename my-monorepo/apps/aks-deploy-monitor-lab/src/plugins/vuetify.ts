// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases } from 'vuetify/iconsets/mdi' 

// Azure Color Palette (WCAG Compliant)
// plugins/vuetify.ts
const azureLightColors = {
  primary: '#0078D4',
  secondary: '#00BCF4',
  accent: '#8F4CDB',
  error: '#D13438',
  info: '#0067B4',
  success: '#107C10',
  warning: '#FFC107',
  background: '#F3F2F1',
  surface: '#FFFFFF',
  'surface-variant': '#E1DFDD',
  'surface-container': '#F9F9F9', 
  'surface-container-high': '#F3F2F1',
  'on-primary': '#FFFFFF',
  'on-secondary': '#FFFFFF',
  'on-surface': '#201F1E',
  'on-surface-variant': '#49454F',
  'on-background': '#201F1E',
  'on-error': '#FFFFFF',
  'on-info': '#FFFFFF',
  'on-success': '#FFFFFF',
  'on-warning': '#000000',
}

const azureDarkColors = {
  primary: '#0078D4',
  secondary: '#00BCF4',
  accent: '#D13438',
  error: '#F14C4C',
  info: '#00B2E8',
  success: '#30D158',
  warning: '#FFD60A',
  background: '#201F1E',
  surface: '#1C1B1F',
  'surface-variant': '#49454F',
  'surface-container': '#2D2D2D', 
  'surface-container-high': '#383838', 
  'on-primary': '#FFFFFF',
  'on-secondary': '#000000',
  'on-surface': '#FFFFFF',
  'on-surface-variant': '#E1DFDD',
  'on-background': '#E1DFDD',
  'on-error': '#000000',
  'on-info': '#000000',
  'on-success': '#000000',
  'on-warning': '#000000',
}

// ... rest of your createVuetify config

export default createVuetify({
  components,
  directives,

  // Icons: Using 'mdi' (Material Design Icons)
  icons: {
    defaultSet: 'mdi',
    aliases: {
      ...aliases,
      // Optional: Add custom aliases if needed
      // 'azure-cloud': 'mdi-cloud',
    },
    sets: {
      // The 'mdi' set is already registered by default in Vuetify 3
      // No need to explicitly map it unless you have custom sets
    },
  },

  // Theme Configuration
  theme: {
    defaultTheme: 'azure-light',
    themes: {
      'azure-light': {
        dark: false,
        colors: azureLightColors,
        variables: {
          'focus-color': '#005A9E', // Darker blue for focus rings
        },
      },
      'azure-dark': {
        dark: true,
        colors: azureDarkColors,
        variables: {
          'focus-color': '#00B2E8',
        },
      },
    },
  },

  // Accessibility Defaults
  defaults: {
    VBtn: {
      density: 'comfortable', // Larger touch targets
      variant: 'flat',
      elevation: 0,
    },
    VCard: {
      elevation: 1,
      variant: 'flat',
    },
    VInput: {
      hideDetails: false, // Keep labels visible
    },
  },
})