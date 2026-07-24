<template>
  <div class="
    bg-white 
    rounded-xl 
    shadow-md 
    hover:shadow-lg 
    transition-all 
    duration-300 
    hover:-translate-y-1
    border border-gray-100
    p-6
    h-full
  ">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-xl font-bold text-gray-800">
        {{ item.title }}
      </h3>
      <span v-if="item.category" class="
        text-xs 
        font-semibold 
        px-3 py-1 
        rounded-full 
        bg-indigo-50 
        text-indigo-600
        border border-indigo-100
      ">
        {{ item.category }}
      </span>
    </div>
    <p class="text-gray-600 leading-relaxed text-sm">
      {{ item.description }}
    </p>
  </div>
</template>

<script setup lang="ts">

import type { DictionaryEntry } from '@myorg/shared-types';

defineProps<{
  item: DictionaryEntry;
}>();
</script>