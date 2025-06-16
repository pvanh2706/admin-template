<template>
    <div>
        <el-row>
            <!-- Tìm kiếm -->
            <el-col :span="9">
                <el-input
                    v-model="input1"
                    style="width: 90%"
                    placeholder="Tìm kiếm theo nhóm hàng, tên hàng"
                    :prefix-icon="Search"   
                />
            </el-col>
            <!-- Nhóm sản phẩm -->
            <el-col :span="7">
                <el-select
                    v-model="inputGroupProduct"
                    style="width: 90%"
                    placeholder="Nhóm sản phẩm"
                    :max-collapse-tags="2"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                >
                <el-option
                    v-for="item in optionInputProducts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
                </el-select>                
            </el-col>
            <!-- Tồn kho -->
            <el-col :span="5">
                <el-select
                    v-model="inputTonKho"
                    style="width: 90%"
                    placeholder="Tồn kho"
                >
                <el-option
                    v-for="item in optionInputTonKho"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
                </el-select>                
            </el-col>
            <!-- Bộ lọc khác -->
            <el-col :span="2" class="flex justify-end">
                <el-button :icon="Filter" @click="dialogFilterVisible = true">Bộ lọc khác</el-button>
            </el-col>   
            <el-col :span="1" class="flex justify-end cursor-pointer items-center">  
                <el-popover
                    placement="bottom-end"
                    trigger="click"
                    width="400"
                    v-model:visible="popoverVisible">
                     <!-- Nút icon mở popover -->
                    <template #reference>
                        <el-icon class="text-[clamp(16px,2vw,20px)] text-[rgb(34,197,94)]"><Operation /></el-icon> 
                    </template>
                     <!-- Nội dung panel: Bảng checkbox chọn cột -->
                    <template #default>
                        <div class="flex gap-6">
                            <!-- Cột 1 -->
                            <div class="space-y-4">
                            <el-checkbox-group v-model="visibleColumnKeys">
                                <el-checkbox
                                v-for="col in columns.slice(0, Math.ceil(columns.length / 2))"
                                :key="col.prop"
                                :label="col.prop"
                                class="flex items-center"
                                >
                                <span class="ml-2">{{ col.label }}</span>
                                </el-checkbox>
                            </el-checkbox-group>
                            </div>
                
                            <!-- Cột 2 -->
                            <div class="space-y-4">
                            <el-checkbox-group v-model="visibleColumnKeys">
                                <el-checkbox
                                v-for="col in columns.slice(Math.ceil(columns.length / 2))"
                                :key="col.prop"
                                :label="col.prop"
                                class="flex items-center"
                                >
                                <span class="ml-2">{{ col.label }}</span>
                                </el-checkbox>
                            </el-checkbox-group>
                            </div>
                        </div>
                    </template>
                </el-popover>
            </el-col>
        </el-row>
        <el-row class="mt-10" style="margin-top: 20px;">
            <el-col :span="24">
                <!-- <el-table
                    :data="tableData"
                    style="height: calc(100vh - 288px);"
                    size="large"
                    stripe
                    :header-cell-style="{ background: '#f5f7fa' }"
                    highlight-current-row
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="name" label="Tên sản phẩm" />
                    <el-table-column prop="price" label="Giá" />
                    <el-table-column prop="quantity" label="Số lượng" />
                    <el-table-column prop="action" label="Hành động" />
                </el-table> -->
                <!-- Bảng -->
                <el-table
                ref="tableRef"
                :data="tableData"
                style="height: calc(100vh - 288px);"
                size="large"
                stripe
                :header-cell-style="{ background: '#f5f7fa' }"
                highlight-current-row
                >
                <el-table-column type="selection" width="55" />
            
                <!-- Các cột hiển thị -->
                <el-table-column
                    v-for="col in visibleColumns"
                    :key="col.prop"
                    :prop="col.prop"
                    :label="col.label"
                />
                </el-table>
            </el-col>
        </el-row>
        <!-- Dialog Bộ lọc khác -->
        <el-dialog
            v-model="dialogFilterVisible"
            title="Bộ lọc khác"
            width="500"
            :before-close="handleClose"
        >
            <p class="mb-2">Thương hiệu</p>
            <el-select
                v-model="inputBrand"
                style="width: 90%"
                placeholder="Chọn thương hiệu"
                multiple
            >
            <el-option
                v-for="item in optionInputBrand"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
            </el-select>
            
            <p class="mt-4 mb-2">Dự kiến hết hạn sử dụng</p>
            <el-date-picker
                v-model="dateExpiry"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="Start date"
                end-placeholder="End date"
                :shortcuts="shortcuts"
                :size="default"
            />

            <p class="mt-4 mb-2">Thời gian tạo</p>
            <el-date-picker
                v-model="dateExpiry"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="Start date"
                end-placeholder="End date"
                :shortcuts="shortcuts"
                :size="default"
            />
            
            <p class="mt-4 mb-2">Trạng thái kinh doanh</p>
            <el-select
                v-model="inputTrangThaiKinhDoanh"
                multiple
                clearable
                collapse-tags
                collapse-tags-tooltip
                placeholder="Select"
                popper-class="custom-header"
                :max-collapse-tags="1"
                style="width: 240px"
            >
                <el-option
                    v-for="item in optionInputTrangThaiKinhDoanh"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
            </el-select>



            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFilterVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogFilterVisible = false">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
    import { ref, computed, watch, nextTick } from 'vue'
    import { Search, Filter, Operation } from '@element-plus/icons-vue'

    const input1 = ref('')
    const inputGroupProduct = ref('')
    const inputTonKho = ref('')
    const inputBrand = ref('')
    const popoverVisible = ref(false)
    const checkedFields = ref([])
    const dialogFilterVisible = ref(false)
    const dateExpiry = ref([])
    const inputTrangThaiKinhDoanh = ref([])
    const checkAll = ref(false)
    const indeterminate = ref(false)
    const optionInputProducts = [
        { value: 'option1', label: 'Nồi cơm điện' },
        { value: 'option2', label: 'Bình điện' },
        { value: 'option3', label: 'Tủ lạnh' },
        { value: 'option4', label: 'Thịt hầm' },
        { value: 'option5', label: 'Thịt nướng' },
        { value: 'option6', label: 'Thịt xào' },
        { value: 'option7', label: 'Dầu ăn' },
        { value: 'option8', label: 'Đồ uống' },
        { value: 'option9', label: 'Thực phẩm đông lạnh' },
    ]

    const optionInputTonKho = [
        { value: 'option1', label: 'Tồn kho (tất cả)' },
        { value: 'option2', label: 'Dưới định mức tồn' },
        { value: 'option3', label: 'Vượt định mức tồn' },
        { value: 'option4', label: 'Hết hàng trong kho' },
    ]

    const optionInputBrand = [
        { value: 'option1', label: 'Thương hiệu 1' },
        { value: 'option2', label: 'Thương hiệu 2' },
        { value: 'option3', label: 'Thương hiệu 3' },
        { value: 'option4', label: 'Thương hiệu 4' },
    ]
    const shortcuts = [
        {
            text: 'Last week',
            value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
            },
        },
        {
            text: 'Last month',
            value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
            },
        },
        {
            text: 'Last 3 months',
            value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
            },
        },
    ]
    const optionInputTrangThaiKinhDoanh = [
        { value: 'option1', label: 'Chọn tất cả' },
        { value: 'option2', label: 'Đang kinh doanh' },
        { value: 'option3', label: 'Ngừng kinh doanh' },
    ]
    const handleCheckAll = (val) => {
        checkAll.value = val
        if (val) {
            indeterminate.value = false
            checkedFields.value = optionInputTrangThaiKinhDoanh.map(item => item.value)
        } else {
            checkedFields.value = []
        }
    }
    const fields = [
        { label: 'Mã sản phẩm', value: 'ma_sp' },
        { label: 'Nhóm sản phẩm', value: 'nhom_sp' },
        { label: 'Tên sản phẩm', value: 'ten_sp' },
        { label: 'Giá bán', value: 'gia_ban' },
        { label: 'Giá vốn', value: 'gia_von' },
        { label: 'Đơn vị tính cơ bản', value: 'dvt_cb' },
        { label: 'Đơn vị tính phụ', value: 'dvt_phu' },
        { label: 'Giá trị quy đổi', value: 'gtqd' },
        { label: 'Thương hiệu', value: 'thuong_hieu' },
        { label: 'Quản lý theo lô, HSD', value: 'quan_ly_lo' },
        { label: 'Vị trí kho', value: 'vi_tri' },
        { label: 'Tồn kho', value: 'ton_kho' },
        { label: 'Mức tồn kho tối thiểu', value: 'ton_thap' },
        { label: 'Mức tồn kho tối đa', value: 'ton_cao' },
        { label: 'Tên thuộc tính', value: 'ten_thuoc_tinh' },
        { label: 'Giá trị thuộc tính', value: 'gt_thuoc_tinh' },
        { label: 'Trạng thái kinh doanh', value: 'trang_thai' },
    ]
    const tableData1 = [
        {
            name: 'Sản phẩm 1',
            price: 100000,
            quantity: 10,
            action: 'Xem',
        },
        {
            name: 'Sản phẩm 2',
            price: 200000,
            quantity: 20,
            action: 'Xem',
        },
        {
            name: 'Sản phẩm 3',
            price: 300000,
            quantity: 30,
            action: 'Xem',
        },
        {
            name: 'Sản phẩm 1',
            price: 100000,
            quantity: 10,
            action: 'Xem',
        },
        {
            name: 'Sản phẩm 2',
            price: 200000,
            quantity: 20,
            action: 'Xem',
        },
        {
            name: 'Sản phẩm 3',
            price: 300000,
            quantity: 30,
            action: 'Xem',
        },
        {
            name: 'Sản phẩm 1',
            price: 100000,
            quantity: 10,
            action: 'Xem',
        },
        {
            name: 'Sản phẩm 2',
            price: 200000,
            quantity: 20,
            action: 'Xem',
        },
        {
            name: 'Sản phẩm 3',
            price: 300000,
            quantity: 30,
            action: 'Xem',
        },
    ];

    const tableData = ref([
        { name: 'Sản phẩm A', price: 100000, quantity: 10, action: 'Chỉnh sửa' },
        { name: 'Sản phẩm B', price: 200000, quantity: 5, action: 'Xóa' },
    ])
  
  // Cấu hình cột có thể ẩn/hiện
  const columns = [
    { prop: 'name', label: 'Tên sản phẩm' },
    { prop: 'price', label: 'Giá' },
    { prop: 'quantity', label: 'Số lượng' },
    { prop: 'action', label: 'Hành động' },
  ]
  
  // Các prop cột đang hiển thị
  const visibleColumnKeys = ref(columns.map(col => col.prop))
  
  // Danh sách cột hiển thị thực tế
  const visibleColumns = computed(() =>
    columns.filter(col => visibleColumnKeys.value.includes(col.prop))
  )
  

  // Ref bảng để gọi doLayout khi cấu trúc thay đổi
  const tableRef = ref()
  
  watch(visibleColumnKeys, async () => {
    await nextTick()
    tableRef.value?.doLayout()
  })
</script>