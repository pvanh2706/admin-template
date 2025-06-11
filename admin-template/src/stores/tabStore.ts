import { defineStore } from 'pinia'

export interface TabItem {
  title: string
  path: string
  name: string
}

export const useTabStore = defineStore('tab', {
  state: () => ({
    tabs: [] as TabItem[],
    activePath: ''
  }),
  actions: {
    addTab(tab: TabItem) {
      const exists = this.tabs.find(t => t.path === tab.path)
      if (!exists) this.tabs.push(tab)
      this.activePath = tab.path
    },
    removeTab(path: string) {
      const index = this.tabs.findIndex(t => t.path === path)
      if (index !== -1) {
        this.tabs.splice(index, 1)
        if (this.activePath === path) {
          const next = this.tabs[index] || this.tabs[index - 1]
          this.activePath = next?.path || ''
        }
      }
    },
    setActive(path: string) {
      this.activePath = path
    }
  }
})
