<template>
    <header class="p-4 flex items-center justify-between flex-wrap"
        :style="{ backgroundColor: headerBgColor, color: headerTextColor }">
        <div class="flex items-center gap-2">
            <el-button v-if="isMobile && layoutDirection === 'vertical'" icon="Menu" circle
                @click="$emit('openDrawer')" />
            <span class="font-bold">Header</span>
        </div>

        <el-menu v-if="layoutDirection === 'horizontal' && !isMobile" mode="horizontal" :default-active="activeMenu"
            :background-color="menuBg" :text-color="menuText" :active-text-color="primaryColor" class="hidden md:flex"
            @select="handleSelect">
            <el-menu-item index="1">Dashboard</el-menu-item>
            <el-menu-item index="2">User</el-menu-item>
            <el-menu-item index="3">Settings</el-menu-item>
        </el-menu>

        <div class="flex items-center gap-2 mt-2 md:mt-0">
            <el-switch v-model="isDark" active-text="Dark" inactive-text="Light"
                @change="$emit('toggleDark', isDark)" />
            <el-select v-model="font" placeholder="Font" size="small" style="width: 110px">
                <el-option label="Sans" value="sans" />
                <el-option label="Serif" value="serif" />
                <el-option label="Mono" value="mono" />
            </el-select>
            <el-select v-model="textSize" placeholder="Size" size="small" style="width: 110px">
                <el-option label="Small" value="text-sm" />
                <el-option label="Base" value="text-base" />
                <el-option label="Large" value="text-lg" />
            </el-select>
            <el-button icon="Brush" circle @click="$emit('showColorConfig')" />
        </div>
    </header>
</template>

<script setup lang="ts">
defineProps<{
    isMobile: boolean
    layoutDirection: 'horizontal' | 'vertical'
    activeMenu: string
    menuBg: string
    menuText: string
    primaryColor: string
    headerBgColor: string
    headerTextColor: string
}>()

const emit = defineEmits(['select', 'toggleDark', 'showColorConfig', 'openDrawer'])

const font = defineModel<'sans' | 'serif' | 'mono'>('font')
const textSize = defineModel<'text-sm' | 'text-base' | 'text-lg'>('textSize')
const isDark = defineModel<boolean>('isDark')

function handleSelect(index: string) {
    emit('select', index)
}
</script>
