<template>
    <el-dialog :model-value="modelValue" @close="emit('close')" @update:modelValue="emit('update:modelValue', $event)"
        title="Tùy chỉnh màu giao diện">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <p class="text-sm font-medium">🎯 Header Background</p>
                <el-color-picker :model-value="headerBg" @update:modelValue="val => emit('update:headerBg', val)" />
            </div>
            <div>
                <p class="text-sm font-medium">🖋 Header Text Color</p>
                <el-color-picker :model-value="headerText" @update:modelValue="val => emit('update:headerText', val)" />
            </div>
            <!-- Các phần khác tương tự -->
        </div>
        <template #footer>
            <el-button @click="emit('close')">Đóng</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: boolean
    headerBg: string
    headerText: string
    mainBg: string
    mainText: string
    asideBg: string
    asideText: string
    asideHover: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', val: boolean): void
    (e: 'update:headerBg', val: string): void
    (e: 'update:headerText', val: string): void
    (e: 'update:mainBg', val: string): void
    (e: 'update:mainText', val: string): void
    (e: 'update:asideBg', val: string): void
    (e: 'update:asideText', val: string): void
    (e: 'update:asideHover', val: string): void
    (e: 'close'): void
}>()
</script>
