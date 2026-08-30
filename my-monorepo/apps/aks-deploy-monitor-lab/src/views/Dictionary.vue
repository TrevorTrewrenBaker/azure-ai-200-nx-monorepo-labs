<script setup lang="ts">
  import dictionaryData from '../data/dictionaryData.json';
  import type { DictionaryEntry } from '@myorg/shared-types';
  import { DictionaryCard } from '@org/ui-design-system';


  // Define your data using the imported type
  const items: DictionaryEntry[] = dictionaryData as DictionaryEntry[]; 
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      Azure Kubernetes Service Module Dictionary
    </h1>

    <div class="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
      <!-- 4. Use the Component in the Template -->
      <DictionaryCard 
        v-for="item in items" 
        :key="item.id" 
        :item="item" 
      />
    </div>
  </div>
</template>