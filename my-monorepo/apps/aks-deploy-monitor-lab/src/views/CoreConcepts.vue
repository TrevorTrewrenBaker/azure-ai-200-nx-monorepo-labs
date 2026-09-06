<script setup lang="ts">
  import podsData from '../data/core-concepts-content/podsData.json';
  import podsUsageData from '../data/core-concepts-content/podsUsageData.json';
  import simplePodYaml from '../data/core-concepts-content/simple-pod.yaml?raw';
  
  import type { ContentCardEntry, YamlExample } from '@myorg/shared-types';
  import { PageHeader, SectionHeader, ContentCard, YamlDisplay } from '@org/ui-design-system'

  const yamlExample: YamlExample = {
    id: 1,
    title: 'Simple Pod with Resource Limits',
    description: 'A basic Pod running nginx:1.14.2 with CPU and memory limits to prevent noisy neighbor issues',
    fileName: 'simple-pod.yaml',
    code: simplePodYaml,
  };

  const podsItems: ContentCardEntry[] = podsData as ContentCardEntry[]; 
  const podsUsageItems: ContentCardEntry[] = podsUsageData as ContentCardEntry[]; 
</script>

<template>
  <main class="bg-background min-h-screen">
    <PageHeader 
      title="Core Concepts" 
      subtitle="The building blocks of Kubernetes — pods, deployments, services, and how they fit together" 
    />
    
    <div class="md:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader 
        title="Pods & Deployments" 
        subtitle="Understand pod lifecycle and deployment strategies." 
      />
      
      <div class="space-y-8">
        <ContentCard
          title="Pods"
          subtitle="Useful information on Pods in Kubernetes"
          :items="podsItems"
        />

        <ContentCard 
          title="Pods Usage"
          subtitle="Pods in a Kubernetes cluster are used in two main ways:"
          :items="podsUsageItems"
        />
      </div>

      <!-- YAML Example Section -->
      <SectionHeader 
        class="mt-12"
        title="Using Pods" 
        subtitle="Example of a Pod which consists of a container running the image nginx:1.14.2" 
      />
      
      <div class="mt-4 space-y-4">
        <div class="p-4 rounded-lg bg-surface-container-high border border-on-surface-variant/20">
          <h4 class="text-sm font-semibold text-on-surface mb-2">⚠️ Important</h4>
          <p class="text-sm text-on-surface-variant">
            One or more containers do not have resources specified. This can cause noisy neighbor issues.
            Always define <strong>requests</strong> (minimum guaranteed) and <strong>limits</strong> (maximum allowed)
            to ensure fair resource allocation.
          </p>
        </div>

        <div>
          <p class="text-sm text-on-surface-variant mb-2">
            To create the Pod shown above, run the following command:
          </p>
          <div class="command-box p-3 rounded-lg bg-surface-container-high border border-on-surface-variant/20">
            <code class="text-sm font-mono text-on-surface">
              kubectl apply -f https://k8s.io/examples/pods/simple-pod.yaml
            </code>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <YamlDisplay
          :code="yamlExample.code"
          :title="yamlExample.fileName"
          badge="Recommended"
        />
        <p class="text-sm text-on-surface-variant mt-2">
          {{ yamlExample.description }}
        </p>
      </div>

      <SectionHeader class="mt-12" title="Services & Networking" />
      <SectionHeader class="mt-8" title="Probes (Liveness vs Readiness)" />
    </div>
  </main>
</template>