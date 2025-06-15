<template>
    <div :class="[theme, fontClass, textSizeClass, 'w-screen h-screen transition-all overflow-hidden']">
        <div class="flex h-full">
            <!-- Aside (chỉ hiển thị ở desktop & layout vertical) -->
            <aside v-if="layoutDirection === 'vertical' && !isMobile" class="flex flex-col transition-all duration-300"
                :class="[collapsed ? 'w-20' : 'w-60']"
                :style="{ backgroundColor: asideBgColor, color: asideTextColor }">
                <div class="p-2 text-center font-bold">
                    <el-button text @click="collapsed = !collapsed">
                        <el-icon>
                            <Menu />
                        </el-icon>
                    </el-button>
                </div>
                <!-- <el-menu :default-active="activeMenu" :collapse="collapsed" :background-color="asideBgColor"
                    :text-color="asideTextColor" :active-text-color="primaryColor" :style="{
                        '--el-menu-hover-bg-color': asideHoverColor
                    }" @select="handleSelect">
                    <el-menu-item index="1"><el-icon>
                            <House />
                        </el-icon><span>Dashboard1</span></el-menu-item>
                    <el-menu-item index="2"><el-icon>
                            <User />
                        </el-icon><span>User</span></el-menu-item>
                    <el-menu-item index="3"><el-icon>
                            <Setting />
                        </el-icon><span>Settings</span></el-menu-item>
                </el-menu> -->
                <el-menu default-active="/" class="el-menu-vertical" router>
                        <el-menu-item index="/">
                            <el-icon size="25"><HomeFilled /></el-icon>
                            <span>Tổng quan</span>
                        </el-menu-item>
                        <el-sub-menu class="code-on-sub-menu-item" index="2">
                            <template #title>
                                <el-icon size="25"><Goods /></el-icon>
                                <span class="code-on-sub-menu-item-title">Sản phẩm</span>
                            </template>
                            <el-menu-item class="code-on-menu-item" index="/product-category">Danh mục sản phẩm</el-menu-item>
                            <el-menu-item class="code-on-menu-item" index="/check-stock">Kiểm kho</el-menu-item>
                            <el-menu-item class="code-on-menu-item" index="/import">Nhập hàng</el-menu-item>
                            <el-menu-item class="code-on-menu-item" index="/return">Trả hàng nhập</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
            </aside>

            <div class="flex-1 flex flex-col">
                <!-- Header -->
                <header class="p-4 flex items-center justify-between flex-wrap"
                    :style="{ backgroundColor: headerBgColor, color: headerTextColor }">
                    <div class="flex items-center gap-2">
                        <!-- Mobile menu button -->
                        <el-button v-if="isMobile && layoutDirection === 'vertical'" icon="Menu" circle
                            @click="drawerVisible = true" />
                        <span class="font-bold">Header</span>
                    </div>

                    <!-- Horizontal menu -->
                    <el-menu v-if="layoutDirection === 'horizontal' && !isMobile" mode="horizontal"
                        :default-active="activeMenu" :background-color="menuBg" :text-color="menuText"
                        :active-text-color="primaryColor" class="hidden md:flex" @select="handleSelect">
                        <el-menu-item index="1">Dashboard</el-menu-item>
                        <el-menu-item index="2">User</el-menu-item>
                        <el-menu-item index="3">Settings</el-menu-item>
                    </el-menu>

                    <!-- Controls -->
                    <div class="flex items-center gap-2 mt-2 md:mt-0">
                        <el-switch v-model="isDark" active-text="Dark" inactive-text="Light" @change="toggleDark" />
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
                        <el-button icon="Brush" circle @click="showColorConfig = true" />
                    </div>
                </header>

                <!-- Main -->
                <main class="flex-1 overflow-auto p-8" :style="{ backgroundColor: mainBgColor, color: mainTextColor }">
                    Main content for menu {{ activeMenu }}
                </main>
            </div>
        </div>

        <!-- Drawer for mobile menu -->
        <el-drawer v-model="drawerVisible" direction="ltr" size="200px" :with-header="false" class="dark:bg-gray-800">
            <div class="p-2 text-right">
                <el-button text @click="collapsed = !collapsed">
                    <el-icon>
                        <Menu />
                    </el-icon>
                </el-button>
            </div>
            <el-menu :default-active="activeMenu" :collapse="collapsed" :background-color="menuBg"
                :text-color="menuText" :active-text-color="primaryColor" @select="handleSelect">
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
    </div>
    <el-dialog v-model="showColorConfig" title="Tùy chỉnh màu giao diện" width="500px">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <p class="text-sm font-medium">🎯 Header Background</p>
                <!-- <el-color-picker v-model="headerBg" show-alpha /> -->
                <el-color-picker v-model="headerBg" :predefine="[]" />
            </div>
            <div>
                <p class="text-sm font-medium">🖋 Header Text Color</p>
                <el-color-picker v-model="headerText" show-alpha />
            </div>

            <div>
                <p class="text-sm font-medium">📦 Main Background</p>
                <el-color-picker v-model="mainBg" show-alpha />
            </div>
            <div>
                <p class="text-sm font-medium">📝 Main Text Color</p>
                <el-color-picker v-model="mainText" show-alpha />
            </div>

            <div>
                <p class="text-sm font-medium">📁 Aside Background</p>
                <el-color-picker v-model="asideBg" show-alpha />
            </div>
            <div>
                <p class="text-sm font-medium">📄 Aside Text Color</p>
                <el-color-picker v-model="asideText" show-alpha />
            </div>

            <div>
                <p class="text-sm font-medium">🎨 Aside Hover Color</p>
                <el-color-picker v-model="asideHover" show-alpha />
            </div>
        </div>

        <template #footer>
            <el-button @click="showColorConfig = false">Đóng</el-button>
        </template>
    </el-dialog>

</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Menu, House, User, Setting, Brush } from '@element-plus/icons-vue'

const showColorConfig = ref(false)

// const headerBg = ref('#e5e7eb')
// const headerText = ref('#000000')

// const mainBg = ref('#f3f4f6')
// const mainText = ref('#000000')

// const asideBg = ref('#f9fafb')
// const asideText = ref('#000000')
// const asideHover = ref('#dbeafe')

const headerBg = ref<string | null>(null)
const headerText = ref<string | null>(null)

const mainBg = ref<string | null>(null)
const mainText = ref<string | null>(null)

const asideBg = ref<string | null>(null)
const asideText = ref<string | null>(null)
const asideHover = ref<string | null>(null)


// Theme toggle
const isDark = ref(false)
const theme = computed(() => (isDark.value ? 'dark' : 'light'))
function toggleDark(val: boolean) {
    document.documentElement.classList.toggle('dark', val)
}

// Font & Text size
const font = ref<'sans' | 'serif' | 'mono'>('sans')
const textSize = ref<'text-sm' | 'text-base' | 'text-lg'>('text-base')
const fontClass = computed(() =>
    font.value === 'serif' ? 'font-serif' : font.value === 'mono' ? 'font-mono' : 'font-sans'
)
const textSizeClass = computed(() => textSize.value)

// Menu state
const activeMenu = ref('1')
function handleSelect(key: string) {
    activeMenu.value = key
    drawerVisible.value = false
}
const collapsed = ref(false)
const drawerVisible = ref(false)
const layoutDirection = ref<'vertical' | 'horizontal'>('vertical')

// Responsive check
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 768)

// Theme color picker
const primaryColor = ref('#409EFF')

// Dynamic colors
const menuBg = computed(() => (isDark.value ? '#1f2937' : '#ffffff'))
const menuText = computed(() => (isDark.value ? '#e5e7eb' : '#333333'))

interface ColorConfig {
    headerBg: string | null;
    headerText: string | null;
    mainBg: string | null;
    mainText: string | null;
    asideBg: string | null;
    asideText: string | null;
    asideHover: string | null;
}

const savedColors = ref<ColorConfig>({
    headerBg: null,
    headerText: null,
    mainBg: null,
    mainText: null,
    asideBg: null,
    asideText: null,
    asideHover: null,
})

// const savedColors = ref({
//     headerBg: null,
//     headerText: null,
//     mainBg: null,
//     mainText: null,
//     asideBg: null,
//     asideText: null,
//     asideHover: null,
// })



// Ưu tiên màu được chọn; nếu không có thì dùng mặc định theo dark/light
const headerBgColor = computed(() =>
    headerBg.value ?? (isDark.value ? '#374151' : '#e5e7eb')
)
const headerTextColor = computed(() =>
    headerText.value ?? (isDark.value ? '#ffffff' : '#000000')
)

const mainBgColor = computed(() =>
    mainBg.value ?? (isDark.value ? '#1f2937' : '#f3f4f6')
)
const mainTextColor = computed(() =>
    mainText.value ?? (isDark.value ? '#e5e7eb' : '#111827')
)

const asideBgColor = computed(() =>
    asideBg.value ?? (isDark.value ? '#111827' : '#f9fafb')
)
const asideTextColor = computed(() =>
    asideText.value ?? (isDark.value ? '#ffffff' : '#111827')
)
const asideHoverColor = computed(() =>
    asideHover.value ?? (isDark.value ? '#374151' : '#dbeafe')
)
watch(isDark, (val) => {
    if (val) {
        // 🔄 Khi bật Dark Mode: lưu cấu hình và reset
        savedColors.value = {
            headerBg: headerBg.value,
            headerText: headerText.value,
            mainBg: mainBg.value,
            mainText: mainText.value,
            asideBg: asideBg.value,
            asideText: asideText.value,
            asideHover: asideHover.value,
        }

        headerBg.value = null
        headerText.value = null
        mainBg.value = null
        mainText.value = null
        asideBg.value = null
        asideText.value = null
        asideHover.value = null
    } else {
        // 🔄 Khi tắt Dark Mode: khôi phục cấu hình đã lưu
        headerBg.value = savedColors.value.headerBg
        headerText.value = savedColors.value.headerText
        mainBg.value = savedColors.value.mainBg
        mainText.value = savedColors.value.mainText
        asideBg.value = savedColors.value.asideBg
        asideText.value = savedColors.value.asideText
        asideHover.value = savedColors.value.asideHover
    }
})

</script>

<style scoped>
/* Light / Dark wrapper */
.light {
    @apply text-black;
}

.dark {
    @apply text-white;
}

/* Optional override for Element Plus menu color */
.dark .el-menu {
    background-color: transparent !important;
    color: white !important;
}

.dark .el-menu-item {
    color: white !important;
}
</style>
