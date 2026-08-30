<template>
  <div class="mb-6 pb-3 border-b border-onSurfaceVariant/20">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-semibold md:text-2xl text-onSurface">
          <slot name="title">{{ title }}</slot>
        </h2>
        <p v-if="subtitle || $slots.subtitle" class="mt-1 text-sm text-onSurfaceVariant">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>

      <div v-if="$slots.actions" class="shrink-0">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SectionHeader' })

interface Props {
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
})
</script>