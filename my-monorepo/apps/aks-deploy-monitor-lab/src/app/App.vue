<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { computed, onMounted, watch } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);

const toggleTheme = () => {
  if (isDark.value) {
    theme.global.name.value = 'azure-light';
  } else {
    theme.global.name.value = 'azure-dark';
  }
};

// FIX: Use (window as any) to bypass TypeScript checks
onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = (window as any).localStorage.getItem('app-theme');
    if (savedTheme && ['azure-light', 'azure-dark'].includes(savedTheme)) {
      theme.global.name.value = savedTheme;
    } else if ((window as any).matchMedia('(prefers-color-scheme: dark)').matches) {
      theme.global.name.value = 'azure-dark';
    }
  }
});

watch(theme.global.name, (newTheme) => {
  if (typeof window !== 'undefined') {
    (window as any).localStorage.setItem('app-theme', newTheme);
  }
});

const links = [
  { text: 'Home', to: '/' },
  { text: 'About', to: '/about' },
  { text: 'Dictionary', to: '/dictionary' },
];
</script>

<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-app-bar-title>Azure AI Lab Monitor</v-app-bar-title>
      <template #append>
        <v-btn icon @click="toggleTheme">
          <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <nav class="d-flex gap-4 mb-4">
          <RouterLink 
            v-for="link in links" 
            :key="link.to" 
            :to="link.to"
            class="text-decoration-none"
          >
            {{ link.text }}
          </RouterLink>
        </nav>

        <!-- This is where your routed views will appear -->
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Optional: Add custom styles here */
</style>