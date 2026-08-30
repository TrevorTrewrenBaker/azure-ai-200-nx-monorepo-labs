<script setup lang="ts">
  import podsData from '../data/core-concepts-content/podsData.json';
  
  import type { ContentCardEntry } from '@myorg/shared-types';
  import { PageHeader, SectionHeader, ContentCard } from '@org/ui-design-system'

  const podsItems: ContentCardEntry[] = podsData as ContentCardEntry[]; 
  
</script>

<template>
  <main class="bg-background">
      <PageHeader title="Core Concepts" subtitle="The building blocks of Kubernetes — pods, deployments, services, and how they fit together" />
      <SectionHeader title="Pods & Deployments" subtitle="Understand pod lifecycle and deployment strategies." />
      <ContentCard
        title="Pods"
        subtitle="Pods are the smallest deployable units of computing that you can create and manage in kubernetes"
        :items="podsItems"/>

      <SectionHeader title="Services & Networking" />
      <SectionHeader title="Probes (Liveness vs Readiness)" />
    </main>
</template>

