<script setup lang="ts">
import { useTabStore } from '@/stores/tabStore'
import { useRouter } from 'vue-router'

const tabStore = useTabStore()
const router = useRouter()

const clickTab = (tabPath: string) => {
  tabStore.setActive(tabPath)
  router.push(tabPath)
}

const closeTab = (e: Event, tabPath: string) => {
  e.stopPropagation()
  tabStore.removeTab(tabPath)
  if (tabStore.activePath !== tabPath) return
  if (tabStore.tabs.length) {
    router.push(tabStore.activePath)
  }
}
</script>

<template>
  <div class="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 space-x-2 overflow-x-auto">
    <div
      v-for="tab in tabStore.tabs"
      :key="tab.path"
      class="flex items-center px-3 py-1 rounded cursor-pointer transition-colors"
      :class="{
        'bg-white dark:bg-gray-700 text-blue-600 font-semibold shadow': tab.path === tabStore.activePath,
        'hover:bg-gray-200 dark:hover:bg-gray-700': tab.path !== tabStore.activePath
      }"
      @click="clickTab(tab.path)"
    >
      <span class="truncate max-w-[120px]">{{ tab.title }}</span>
      <button class="ml-2 text-xs text-gray-500 hover:text-red-500" @click.stop="closeTab($event, tab.path)">×</button>
    </div>
  </div>
</template>
