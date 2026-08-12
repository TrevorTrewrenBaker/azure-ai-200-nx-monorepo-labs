<template>
  <header class="p-6 mb-8 rounded-lg shadow-md bg-primary text-on-primary">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold md:text-3xl text-on-primary">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p class="mt-2 text-sm md:text-base text-on-primary opacity-95">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>

      <!-- optional right-side content: badge, icon, "last updated", etc. -->
      <div v-if="$slots.actions" class="shrink-0">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineOptions({ name: 'PageHeader' })

interface Props {
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
})
</script>