<!-- apps/your-app/src/views/Configure.vue -->
<template>
  <div>
    <!-- ✅ PageHeader already has v-card, use it directly -->
    <PageHeader title="Configuration" 
                subtitle="Learn to externalize configuration, secure sensitive settings, and attach persistent storage using Kubernetes features on Azure Kubernetes Service." />

    <!-- ✅ Content: Use a separate div or v-card -->
    <div class="bg-surface-container rounded-lg pa-4">
      <p class="text-body-1 text-onSurface">
        This is the configure page.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PageHeader } from '@org/ui-design-system'
</script>
