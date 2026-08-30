# create_vue_nx_app.ps1
# Creates a Vue 3 + TS + Vite + Tailwind + TanStack app in an NX Monorepo

param(
    [Parameter(Mandatory=$true, HelpMessage="Enter the name of your new app (e.g., portal-client)")]
    [string]$AppName
)

# --- CONFIGURATION & NAVIGATION ---

# 1. Get the directory where this script lives
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 2. Calculate the Project Root (Go UP 2 levels from scripts\Front_End)
# Path: .../my-monorepo/scripts/Front_End  -> Up 2 -> .../my-monorepo
$rootDir = Split-Path -Parent (Split-Path -Parent $scriptDir)

Write-Host "🚀 Script Location: $scriptDir" -ForegroundColor Gray
Write-Host "📂 Project Root: $rootDir" -ForegroundColor Cyan

# 3. CRITICAL: Change to the Root Directory immediately
Set-Location $rootDir

# Verify we are in the right place
if (-not (Test-Path "nx.json") -and -not (Test-Path "package.json")) {
    Write-Host "❌ Error: 'nx.json' or 'package.json' not found in root ($rootDir)." -ForegroundColor Red
    Write-Host "   This script must run from inside an existing NX workspace root." -ForegroundColor Red
    Write-Host "   Are you sure this is the correct path? Aborting." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Successfully navigated to project root." -ForegroundColor Green

# --- PREREQUISITES CHECK ---

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Error: Node.js is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# Check Nx CLI
if (-not (Get-Command nx -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Nx CLI not found. Installing globally..." -ForegroundColor Yellow
    npm install -g nx
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Nx. Please install manually: npm install -g nx" -ForegroundColor Red
        exit 1
    }
}

# --- APP GENERATION ---

$appsFolder = "apps"
$projectPath = Join-Path $appsFolder $AppName

Write-Host "🏗️  Generating Vue 3 + TypeScript + Vite app: $AppName" -ForegroundColor Green

# Ensure 'apps' folder exists
if (-not (Test-Path $appsFolder)) {
    New-Item -ItemType Directory -Path $appsFolder | Out-Null
    Write-Host "📁 Created 'apps' folder." -ForegroundColor Gray
}

# Generate the app using @nxext/vite
# Note: If @nxext/vite is not installed in the root, install it first
if (-not (Test-Path "node_modules/@nxext")) {
    Write-Host "📦 Installing @nxext/vite plugin..." -ForegroundColor Cyan
    npm install -D @nxext/vite
}

# Run the generator
nx g @nxext/vite:app $AppName --directory=$appsFolder --style=css --unitTestRunner=vitest --e2eTestRunner=playwright --strict --skipGit

if (-not (Test-Path $projectPath)) {
    Write-Host "❌ App generation failed. Check errors above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ App scaffolded successfully." -ForegroundColor Green

# --- CONFIGURATION & DEPENDENCIES ---

# Navigate into the new app
Set-Location $projectPath
Write-Host "📂 Configuring app in: $projectPath" -ForegroundColor Gray

# Install additional dependencies
Write-Host "📦 Installing Tailwind, TanStack, Vue Router, Pinia, Testing libs..." -ForegroundColor Cyan
npm install vue-router@4 pinia @tanstack/vue-query
npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-vue vitest @vitest/ui playwright @playwright/test @testing-library/vue @testing-library/jest-dom

# Initialize Tailwind
npx tailwindcss init -p

# 1. Configure Tailwind
$tailwindConfig = @"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
"@
Set-Content -Path "tailwind.config.js" -Value $tailwindConfig

# 2. Configure Vite
$viteConfig = @"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
"@
Set-Content -Path "vite.config.ts" -Value $viteConfig

# 3. Configure Vitest
$vitestConfig = @"
import { defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default defineConfig({
  ...viteConfig,
  test: {
    ...viteConfig.test,
    environment: 'jsdom',
    globals: true,
  },
})
"@
Set-Content -Path "vitest.config.ts" -Value $vitestConfig

# 4. Create Setup Files & Styles
New-Item -ItemType Directory -Path "src/styles" -Force | Out-Null
New-Item -ItemType File -Path "src/setupTests.ts" -Force | Out-Null

Set-Content -Path "src/setupTests.ts" -Value "import '@testing-library/jest-dom'"

$globalsCss = @"
@tailwind base;
@tailwind components;
@tailwind utilities;
"@
Set-Content -Path "src/styles/globals.css" -Value $globalsCss

# 5. Update main.ts
$mainTs = @"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/globals.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
  ],
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
"@
Set-Content -Path "src/main.ts" -Value $mainTs

# 6. Create Home View
New-Item -ItemType Directory -Path "src/views" -Force | Out-Null
$homeVue = @"
<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold text-blue-600 mb-4">Welcome to $AppName</h1>
    <p class="text-gray-600">Vue 3 + TypeScript + Tailwind + TanStack Query</p>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>
"@
Set-Content -Path "src/views/Home.vue" -Value $homeVue

# 7. Update tsconfig.json for Vitest types
$tsConfigPath = "tsconfig.json"
if (Test-Path $tsConfigPath) {
    $tsConfig = Get-Content $tsConfigPath -Raw | ConvertFrom-Json
    if (-not $tsConfig.compilerOptions.types) {
        $tsConfig.compilerOptions.types = @()
    }
    if ($tsConfig.compilerOptions.types -notcontains "vite/client") {
        $tsConfig.compilerOptions.types += "vite/client"
    }
    if ($tsConfig.compilerOptions.types -notcontains "vitest/globals") {
        $tsConfig.compilerOptions.types += "vitest/globals"
    }
    $tsConfig | ConvertTo-Json -Depth 100 | Set-Content $tsConfigPath
}

# --- FINISH ---

# Return to root
Set-Location $rootDir

Write-Host "🎉 SUCCESS! App '$AppName' created in '$appsFolder'." -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. cd $appsFolder/$AppName"
Write-Host "  2. npm run dev        (Start dev server)"
Write-Host "  3. npm run test       (Run unit tests)"
Write-Host "  4. npm run test:e2e   (Run E2E tests)"
Write-Host ""