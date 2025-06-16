<template>
    <div class="flex items-center justify-between px-4 py-2 mt-5">
      <!-- Chọn số dòng hiển thị -->
      <div class="flex items-center space-x-2">
        <span>Hiển thị:</span>
        <el-select
          v-model="localPageSize"
          placeholder="Số dòng"
          size="small"
          style="width: 100px"
          @change="onSizeChange"
        >
          <el-option
            v-for="size in pageSizes"
            :key="size"
            :label="`${size} dòng`"
            :value="size"
          />
        </el-select>
      </div>
  
      <!-- Phân trang -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="localPageSize"
        :current-page="currentPage"
        @current-change="onCurrentChange"
      />
  
      <!-- Hiển thị tổng -->
      <div>
        Từ {{ startItem }} - {{ endItem }} trong tổng số {{ total }} sản phẩm
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref, watch } from 'vue'
  
  // Props
  const props = defineProps({
    total: {
      type: Number,
      required: true,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    modelValue: {
      type: Number,
      default: 1, // current page
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  })
  
  // Emits
  const emit = defineEmits(['update:modelValue', 'update:pageSize'])
  
  // Local states
  const currentPage = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val),
  })
  
  const localPageSize = ref(props.pageSize)
  
  watch(
    () => props.pageSize,
    (val) => {
      localPageSize.value = val
    }
  )
  
  // Pagination change handlers
  function onCurrentChange(page) {
    currentPage.value = page
  }
  
  function onSizeChange(size) {
    emit('update:pageSize', size)
    emit('update:modelValue', 1) // reset to page 1 when size changes
  }
  
  // Computed start/end
  const startItem = computed(() => {
    return props.total === 0 ? 0 : (currentPage.value - 1) * localPageSize.value + 1
  })
  const endItem = computed(() => {
    return Math.min(currentPage.value * localPageSize.value, props.total)
  })
  </script>
  