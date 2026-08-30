<!-- apps/aks-deploy-monitor-lab/src/app/App.vue -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { computed, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

// Keep <html> class in sync with isDark
watch(isDark, (dark) => {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', dark);
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('app-theme', dark ? 'dark' : 'light');
  }
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = window.localStorage.getItem('app-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      isDark.value = savedTheme === 'dark';
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true;
    }
    document.documentElement.classList.toggle('dark', isDark.value);
  }
});

const links = [
  { text: 'Home', to: '/' },
  { text: 'Core Concepts', to: "/coreconcepts"},
  { text: 'Security', to: "/security"},
  { text: 'AKS', to: "/aks"},
  { text: 'Deploy', to: '/deploy' },
  { text: 'Configure', to: '/configure' },
  { text: 'Monitor', to: '/monitor' },
  { text: 'Dictionary', to: '/dictionary' },
];

const isActive = (to: string) => computed(() => route.path === to);
</script>

<template>
  <div class="min-h-screen bg-background text-onBackground">
    <!-- App bar -->
    <header class="flex items-center h-14 px-4 bg-primary text-onPrimary shadow">
      <span class="font-bold text-lg whitespace-nowrap">
        AKS Deploy Monitor Lab
      </span>

      <nav class="flex ml-8 gap-1 overflow-x-auto">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="px-3 py-2 text-sm rounded-md transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
          :class="{ 'bg-white/15 font-semibold': route.path === link.to }"
        >
          {{ link.text }}
        </RouterLink>
      </nav>

      <button
        type="button"
        class="ml-auto px-3 py-1.5 text-sm rounded-md border border-white/30 hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
        @click="toggleTheme"
      >
        {{ isDark ? 'Light mode' : 'Dark mode' }}
      </button>
    </header>

    <!-- Main content -->
    <main class="bg-background">
      <div style="min-height: calc(100vh - 56px);">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Optional: Add custom styles here */
</style>