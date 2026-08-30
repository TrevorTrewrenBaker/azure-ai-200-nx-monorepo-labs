<template>
  <header class="w-full rounded-lg overflow-hidden bg-surface transition-all duration-300">
    <div class="p-6">
      <h1 class="text-onSurface text-3xl font-bold leading-[1.05]">
        <slot name="title">{{ title }}</slot>
      </h1>
      <h2 class="text-xl text-onSurfaceVariant leading-relaxed mt-2">
        <slot name="subtitle">{{ subtitle }}</slot>
      </h2>
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