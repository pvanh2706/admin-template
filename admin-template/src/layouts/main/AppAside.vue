<template>
    <aside v-if="layoutDirection === 'vertical' && !isMobile" class="flex flex-col transition-all duration-300"
        :class="[collapsed ? 'w-20' : 'w-60']" :style="{ backgroundColor: asideBgColor, color: asideTextColor }">
        <div class="p-2 text-center font-bold">
            <!-- <el-button text @click="collapsed = !collapsed"> -->
            <el-button text @click="emit('update:collapsed', !collapsed)"></el-button>
                <el-icon>
                    <Menu />
                </el-icon>
            </el-button>
        </div>
        <el-menu :default-active="activeMenu" :collapse="collapsed" :background-color="asideBgColor"
            :text-color="asideTextColor" :active-text-color="primaryColor"
            :style="{ '--el-menu-hover-bg-color': asideHoverColor }" @select="handleSelect">
            <el-menu-item index="1"><el-icon>
                    <House />
                </el-icon><span>Dashboard1</span></el-menu-item>
            <el-menu-item index="2"><el-icon>
                    <User />
                </el-icon><span>User</span></el-menu-item>
            <el-menu-item index="3"><el-icon>
                    <Setting />
                </el-icon><span>Settings</span></el-menu-item>
        </el-menu>
    </aside>
</template>

<script setup lang="ts">
import { Menu, House, User, Setting } from '@element-plus/icons-vue'
defineProps<{
    isMobile: boolean
    layoutDirection: 'horizontal' | 'vertical'
    activeMenu: string
    collapsed: boolean
    asideBgColor: string
    asideTextColor: string
    asideHoverColor: string
    primaryColor: string
}>()

const emit = defineEmits(['update:collapsed', 'select'])
function handleSelect(key: string) {
    emit('select', key)
}
</script>
