<template>
  <div class="rounded-lg border border-surface-variant bg-surface overflow-hidden">
    <!-- Header -->
    <div 
      v-if="title" 
      class="flex items-center justify-between px-4 py-3 border-b border-on-surface-variant/20 bg-surface-container-high"
    >
      <div class="flex items-center gap-3">
        <h3 class="font-mono text-sm font-semibold text-on-surface">
          {{ title }}
        </h3>
        <span 
          v-if="badge" 
          class="px-2 py-0.5 text-xs font-medium rounded border"
          :class="badgeClass"
        >
          {{ badge }}
        </span>
      </div>
      <button
        @click="copyToClipboard"
        class="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded transition-all duration-200"
        :class="[
          copied 
            ? 'bg-success text-on-success' 
            : 'bg-surface-variant text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
        ]"
      >
        <span v-if="copied">✓</span>
        <span v-else>📋</span>
        {{ copied ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Code Content -->
    <pre 
      class="yaml-code p-4 overflow-x-auto font-mono text-sm leading-[1.6] bg-surface text-on-surface"
    >
      <code 
        v-html="highlightedCode" 
        class="block"
      ></code>
    </pre>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

const props = withDefaults(defineProps<{
  code: string;
  title?: string;
  badge?: string;
}>(), {
  title: 'YAML',
});

const copied = ref(false);
const prismReady = ref(false);
let Prism: any = null;

// Badge styling using Tailwind classes
const badgeClass = computed(() => {
  if (!props.badge) return '';
  
  if (props.badge.includes('Recommended') || props.badge.includes('Best')) {
    return 'bg-success/20 text-success border-success/30';
  } else if (props.badge.includes('Warning') || props.badge.includes('Not Recommended')) {
    return 'bg-error/20 text-error border-error/30';
  } else if (props.badge.includes('Flexible')) {
    return 'bg-accent/20 text-accent border-accent/30';
  }
  return 'bg-surface-variant text-on-surface-variant border-on-surface-variant/20';
});

// Copy to clipboard function
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea');
      textarea.value = props.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr);
      alert('Failed to copy to clipboard. Please copy manually.');
    }
  }
};

// Load Prism for syntax highlighting
onMounted(async () => {
  if (props.code) {
    try {
      const prismModule = await import('prismjs');
      Prism = prismModule.default;
      // prismjs component files (e.g. prism-yaml.js) are written as classic
      // scripts that mutate a global `Prism` object — they are not real ES
      // modules. We must expose our Prism instance globally before importing
      // them, or the component silently no-ops and Prism.languages.yaml
      // never gets populated.
      (window as any).Prism = Prism;
      await import('prismjs/components/prism-yaml');
      prismReady.value = true;
    } catch (error) {
      console.warn('Failed to load Prism:', error);
    }
  }
});

// Highlight code
const highlightedCode = computed(() => {
  // Read prismReady so this computed re-runs once Prism finishes loading
  if (!prismReady.value || !Prism || !props.code) return props.code;
  
  try {
    return Prism.highlight(props.code, Prism.languages.yaml, 'yaml');
  } catch (error) {
    console.warn('Failed to highlight code:', error);
    return props.code;
  }
});
</script>

<!-- 
  Industry Standard: Scoped styles for component-specific CSS
  This prevents Prism.js overrides from leaking to other components
-->
<style scoped>
.yaml-code {
  scrollbar-width: thin;
  scrollbar-color: var(--color-surface-variant) transparent;
}

.yaml-code::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.yaml-code::-webkit-scrollbar-track {
  background: transparent;
}

.yaml-code::-webkit-scrollbar-thumb {
  background: var(--color-surface-variant);
  border-radius: 3px;
}

.yaml-code::-webkit-scrollbar-thumb:hover {
  background: var(--color-on-surface-variant);
}

/* Prism.js token overrides
   NOTE: these must use :deep() because the token spans are injected via
   v-html and never receive Vue's scoped data-v-xxxx attribute, so plain
   scoped selectors would silently never match them. */
:deep(.token.comment),
:deep(.token.prolog),
:deep(.token.doctype),
:deep(.token.cdata) {
  color: var(--color-on-surface-variant) !important;
  opacity: 0.7;
}

:deep(.token.punctuation) {
  color: var(--color-on-surface) !important;
}

:deep(.token.property),
:deep(.token.tag),
:deep(.token.boolean),
:deep(.token.number),
:deep(.token.constant),
:deep(.token.symbol),
:deep(.token.deleted) {
  color: var(--color-primary) !important;
}

:deep(.token.selector),
:deep(.token.attr-name),
:deep(.token.string),
:deep(.token.char),
:deep(.token.builtin),
:deep(.token.inserted) {
  color: var(--color-success) !important;
}

:deep(.token.operator),
:deep(.token.entity),
:deep(.token.url),
:deep(.language-css .token.string),
:deep(.style .token.string) {
  color: var(--color-on-surface) !important;
}

:deep(.token.atrule),
:deep(.token.attr-value),
:deep(.token.keyword) {
  color: var(--color-secondary) !important;
}

:deep(.token.function),
:deep(.token.class-name) {
  color: var(--color-accent) !important;
}

:deep(.token.regex),
:deep(.token.important),
:deep(.token.variable) {
  color: var(--color-warning) !important;
}
</style>