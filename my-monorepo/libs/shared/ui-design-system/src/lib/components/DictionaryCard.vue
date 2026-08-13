<template>
  <div class="h-full w-full rounded-lg overflow-hidden bg-surface shadow-md transition-all 
          duration-300 hover:shadow-lg hover:-translate-y-1">
    <div class="p-6 vertical-align flex-col h-full">
        <h3 class="text-3xl font-bold text-on-surface">
          {{ item.title }}
        </h3>

      <p class="text-sm text-on-surface-variant leading-relaxed flex-grow mt-2">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { DictionaryEntry } from '@myorg/shared-types';
  defineProps<{ item: DictionaryEntry & { href?: string; route?: string; }; }>();
</script>

