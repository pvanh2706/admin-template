<template>
    <el-drawer v-model="visible" direction="ltr" size="200px" :with-header="false" class="dark:bg-gray-800">
        <div class="p-2 text-right">
            <el-button text @click="$emit('toggleCollapsed')">
                <el-icon>
                    <Menu />
                </el-icon>
            </el-button>
        </div>
        <el-menu :default-active="activeMenu" :collapse="collapsed" :background-color="menuBg" :text-color="menuText"
            :active-text-color="primaryColor" @select="handleSelect">
            <el-menu-item index="1"><el-icon>
                    <House />
                </el-icon><span>Dashboard</span></el-menu-item>
            <el-menu-item index="2"><el-icon>
                    <User />
                </el-icon><span>User</span></el-menu-item>
            <el-menu-item index="3"><el-icon>
                    <Setting />
                </el-icon><span>Settings</span></el-menu-item>
        </el-menu>
    </el-drawer>
</template>

<script setup lang="ts">
import { Menu, House, User, Setting } from '@element-plus/icons-vue'
const visible = defineModel<boolean>()
defineProps<{
    activeMenu: string
    collapsed: boolean
    menuBg: string
    menuText: string
    primaryColor: string
}>()
const emit = defineEmits(['select', 'toggleCollapsed'])

function handleSelect(key: string) {
    visible.value = false
    emit('select', key)
}
</script>
