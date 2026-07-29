<template>
  <v-card 
    :href="item.href" 
    :to="item.route"
    class="h-full w-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl"
    variant="elevated"
    elevation="2"
    :aria-label="`View details for ${item.title}`"
    color="surface"
  >
    <div class="p-6 flex flex-col h-full">
      <div class="flex justify-between items-start mb-4 flex-shrink-0">
        <h3 class="text-3xl font-weight-bold text-on-surface">
          {{ item.title }}
        </h3>

        <v-chip 
          v-if="item.category" 
          size="small" 
          color="primary" 
          variant="tonal"
          class="ml-2"
        >
          {{ item.category }}
        </v-chip>
      </div>

      <!-- Just use the class -->
      <p class="text-body-2 text-on-surface-variant flex-grow-1 leading-relaxed">
        {{ item.description }}
      </p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  
  import { VCard, VChip } from 'vuetify/components';
  import type { DictionaryEntry } from '@myorg/shared-types';
  defineProps<{ item: DictionaryEntry & { href?: string; route?: string; }; }>();
</script>

