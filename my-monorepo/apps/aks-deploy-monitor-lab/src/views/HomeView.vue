<template>
  <main class="bg-background">
    <div class="max-w-7xl mx-auto p-6">

  <PageHeader
        title="Azure Kubernetes Service Lab"
        subtitle="Learn Kubernetes terminology, deployment, configuration, and monitoring."
      />

      <!-- Cluster Overview -->
      <div class="mb-8 rounded-lg shadow bg-surface border-l-4 border-success">
        <div class="p-6">
          <div class="flex flex-wrap items-center gap-6">
            <div class="flex items-center basis-full md:basis-1/3">
              <Boxes class="w-8 h-8 mr-3 text-primary" />
              <div>
                <div class="text-sm text-onSurfaceVariant">Cluster</div>
                <div class="text-lg font-bold text-onSurface">aks-dev-cluster</div>
              </div>
              <span class="ml-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-success text-white">
                <CheckCircle class="w-3.5 h-3.5" />
                Healthy
              </span>
            </div>

            <div class="grid grid-cols-3 gap-4 basis-full md:basis-2/3">
              <div>
                <div class="text-sm text-onSurfaceVariant">Nodes</div>
                <div class="text-lg font-bold text-onSurface">3</div>
              </div>
              <div>
                <div class="text-sm text-onSurfaceVariant">Pods</div>
                <div class="text-lg font-bold text-onSurface">12</div>
              </div>
              <div>
                <div class="text-sm text-onSurfaceVariant">Namespaces</div>
                <div class="text-lg font-bold text-onSurface">4</div>
              </div>
            </div>
          </div>

          <hr class="my-4 border-surfaceVariant" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div class="flex items-center justify-between text-sm text-onSurface">
                <span class="flex items-center gap-1">
                  <Cpu class="w-4 h-4" />
                  CPU Usage
                </span>
                <span class="font-bold">80%</span>
              </div>
              <div class="mt-1 h-2 rounded-full bg-surfaceVariant overflow-hidden">
                <div class="h-full bg-primary rounded-full" style="width: 80%" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between text-sm text-onSurface">
                <span class="flex items-center gap-1">
                  <MemoryStick class="w-4 h-4" />
                  Memory Usage
                </span>
                <span class="font-bold">60%</span>
              </div>
              <div class="mt-1 h-2 rounded-full bg-surfaceVariant overflow-hidden">
                <div class="h-full bg-success rounded-full" style="width: 60%" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="h-full rounded-lg shadow bg-surface hover:shadow-lg transition-shadow"
        >
          <div class="p-6 text-center">
            <component :is="feature.icon" class="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 class="text-lg font-bold text-onSurface">{{ feature.title }}</h3>
            <p class="text-sm text-onSurfaceVariant mt-2">
              {{ feature.description }}
            </p>
            <hr class="my-3 border-surfaceVariant" />
            <div class="flex items-center justify-between">
              <span class="text-xs text-onSurfaceVariant inline-flex items-center gap-1">
                <CheckCircle class="w-3.5 h-3.5 text-success" />
                Ready
              </span>
              <button
                type="button"
                class="text-sm text-primary font-medium inline-flex items-center gap-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-1"
              >
                {{ feature.actionLabel }}
                <ArrowRight class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Events -->
      <div class="mt-8 rounded-lg shadow bg-surface">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-bold text-onSurface flex items-center gap-2">
              <Clock class="w-5 h-5" />
              Recent Cluster Events
            </h3>
            <button
              type="button"
              class="text-sm text-primary font-medium hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-1"
            >
              View All
            </button>
          </div>
          <ul class="mt-2 divide-y divide-surfaceVariant">
            <li
              v-for="event in recentEvents"
              :key="event.id"
              class="py-2 text-sm text-onSurface"
            >
              <span class="text-xs text-onSurfaceVariant">{{ event.time }}</span>
              <span class="ml-2">{{ event.message }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Dictionary Quick Reference -->
      <div class="mt-8 rounded-lg bg-surfaceVariant">
        <div class="p-6">
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center basis-full md:basis-2/3">
              <BookOpen class="w-7 h-7 mr-3 text-primary" />
              <div>
                <div class="text-sm text-onSurfaceVariant">Quick Reference</div>
                <div class="text-base text-onSurface">
                  <strong>Pod:</strong> The smallest deployable unit in Kubernetes
                </div>
              </div>
            </div>
            <div class="basis-full md:basis-1/3 md:text-right">
              <button
                type="button"
                class="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-primary text-primary font-medium hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <Search class="w-4 h-4" />
                Search Dictionary
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { PageHeader } from '@org/ui-design-system';
import {
  Boxes,
  CheckCircle,
  Cpu,
  MemoryStick,
  ArrowRight,
  Clock,
  BookOpen,
  Search,
  Rocket,
  Settings,
  LayoutDashboard,
} from 'lucide-vue-next';

interface Feature {
  title: string;
  description: string;
  icon: unknown;
  actionLabel: string;
}

interface RecentEvent {
  id: number;
  time: string;
  message: string;
}

const features: Feature[] = [
  {
    title: 'Deploy Applications',
    description:
      'Deploy containerized applications to AKS with simple commands',
    icon: Rocket,
    actionLabel: 'Deploy Now',
  },
  {
    title: 'Configure Resources',
    description: 'Manage ConfigMaps, Secrets, and persistent storage',
    icon: Settings,
    actionLabel: 'Configure',
  },
  {
    title: 'Monitor Deployments',
    description: 'Track pod status, service health, and cluster metrics',
    icon: LayoutDashboard,
    actionLabel: 'Monitor',
  },
];

const recentEvents: RecentEvent[] = [
  {
    id: 1,
    time: '10:32 AM',
    message: 'Pod api-7d8f9 restarted (CrashLoopBackOff)',
  },
  {
    id: 2,
    time: '10:15 AM',
    message: 'Deployment frontend scaled to 3 replicas',
  },
  {
    id: 3,
    time: '09:45 AM',
    message: "Namespace 'dev' created",
  },
];
</script>