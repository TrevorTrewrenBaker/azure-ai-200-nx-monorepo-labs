<!-- libs/shared/ui-design-system/src/lib/components/PageHeader.vue -->
<template>
  <header class="p-6 mb-8 rounded-lg shadow-md bg-primary text-on-primary">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold md:text-3xl text-on-primary">
          <slot name="title">{{ title }}</slot>
        </h1>
        <p
          v-if="$slots.subtitle || subtitle"
          class="mt-2 text-sm md:text-base text-onPrimary opacity-85"
        >
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>
      <div v-if="$slots.actions" class="flex gap-2">
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