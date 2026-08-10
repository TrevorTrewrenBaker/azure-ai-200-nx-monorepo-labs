<template>
  <div
    class="h-full w-full rounded-xl bg-surface shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    :aria-label="`View details for ${item.title}`"
  >
    <div class="p-6 flex flex-col h-full">
      <div class="flex justify-between items-start mb-4 flex-shrink-0">
        <h3 class="text-3xl font-bold text-onSurface">
          {{ item.title }}
        </h3>
      </div>

      <p class="text-sm text-onSurfaceVariant leading-relaxed flex-grow mt-2">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DictionaryEntry } from '@myorg/shared-types';
defineProps<{ item: DictionaryEntry & { href?: string; route?: string; }; }>();
</script>

