<template>
    <div class="flex flex-col h-screen" :class="[fontClass, textSizeClass]"
        :style="{ backgroundColor: mainBg, color: mainText }">
        <AppHeader :isMobile="isMobile" :layoutDirection="layoutDirection" :activeMenu="activeMenu" :menuBg="headerBg"
            :menuText="headerText" :primaryColor="primaryColor" :headerBgColor="headerBg" :headerTextColor="headerText"
            v-model:isDark="isDark" v-model:font="font" v-model:textSize="textSize" @select="handleMenuSelect"
            @toggleDark="toggleDarkMode" @showColorConfig="colorDialogVisible = true"
            @openDrawer="drawerVisible = true" />

        <div class="flex flex-1 overflow-hidden">
            <AppAside :isMobile="isMobile" :layoutDirection="layoutDirection" :activeMenu="activeMenu"
                :collapsed="collapsed" :asideBgColor="asideBg" :asideTextColor="asideText" :asideHoverColor="asideHover"
                :primaryColor="primaryColor" @select="handleMenuSelect" />

            <main class="flex-1 overflow-auto p-4">
                <slot />
            </main>
        </div>

        <AppDrawerMenu v-model="drawerVisible" :activeMenu="activeMenu" :collapsed="collapsed" :menuBg="asideBg"
            :menuText="asideText" :primaryColor="primaryColor" @select="handleMenuSelect" />

        <ThemeConfigDialog v-model="colorDialogVisible" v-model:headerBg="headerBg" v-model:headerText="headerText"
            v-model:mainBg="mainBg" v-model:mainText="mainText" v-model:asideBg="asideBg" v-model:asideText="asideText"
            v-model:asideHover="asideHover" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppHeader from './AppHeader.vue'
import AppAside from './AppAside.vue'
import AppDrawerMenu from './AppDrawerMenu.vue'
import ThemeConfigDialog from './ThemeConfigDialog.vue'
import { useWindowSize } from '@vueuse/core'

const activeMenu = ref('1')
const isDark = ref(false)
const font = ref<'sans' | 'serif' | 'mono'>('sans')
const textSize = ref<'text-sm' | 'text-base' | 'text-lg'>('text-base')

const fontClass = computed(() => {
    return {
        sans: 'font-sans',
        serif: 'font-serif',
        mono: 'font-mono',
    }[font.value]
})
const textSizeClass = computed(() => textSize.value)

const layoutDirection = ref<'horizontal' | 'vertical'>('vertical')
const collapsed = ref(false)

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)
const drawerVisible = ref(false)

const headerBg = ref('#ffffff')
const headerText = ref('#000000')
const mainBg = ref('#f5f5f5')
const mainText = ref('#333333')
const asideBg = ref('#001529')
const asideText = ref('#ffffff')
const asideHover = ref('#409EFF')
const primaryColor = ref('#409EFF')

const colorDialogVisible = ref(false)

function handleMenuSelect(key: string) {
    activeMenu.value = key
}

function toggleDarkMode(val: boolean) {
    document.documentElement.classList.toggle('dark', val)
}
</script>
