<template>
  <div class="mb-6 p-6 pb-3 border-b border-onSurfaceVariant/20">
    <h3 class="text-lg font-semibold text-onSurface">
      {{ title }}
    </h3>
    <p v-if="subtitle" class="mt-1 text-sm text-onSurfaceVariant">
      {{ subtitle }}
    </p>

    <ul v-if="items.length" class="mt-4 space-y-3">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-start gap-2 text-sm"
      >
        <span aria-hidden="true" class="text-onSurface mt-0.5">•</span>
        <div>
          <span class="font-medium text-onSurface">
            {{ item.title }}
          </span>
          <p v-if="item.description" class="text-onSurfaceVariant mt-0.5">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { ContentCardEntry } from '@myorg/shared-types';

defineOptions({ name: 'ContentCard' })

defineProps<{
  title: string;
  subtitle?: string;
  items: ContentCardEntry[];
}>();
</script>