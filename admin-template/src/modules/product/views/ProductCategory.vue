<template>
    <div style="border: 2px solid green;">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-lg shadow p-4 gap-4">
            <h2 class="text-xl font-bold">Danh mục sản phẩm</h2>
            <div class="flex flex-wrap gap-2 justify-end">
                <el-button size="large" :icon="DocumentAdd" link @click="btnImportFile_Click">
                    Nhập file Excel
                </el-button>
                <el-button size="large" :icon="Document" link @click="btnExportFile_Click">
                    Xuất file sản phẩm
                </el-button>
                <el-button round color="rgb(51.2, 126.4, 204)" dark :icon="CirclePlus" @click="handleAddProduct">
                    Tạo mới
                </el-button>
            </div>
        </div>

        <!-- Content -->
        <div class="bg-white rounded-lg shadow p-4 h-[calc(100vh-240px)] flex flex-col space-y-4">
            <ProductList class="flex-1 overflow-auto" />
            <BasePagination v-model="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 50]" :total="total"
                @update:pageSize="onSizeChange" />
        </div>

        <!-- Dialog Import -->
        <el-dialog v-model="dialogVisible" title="NHẬP FILE DANH MỤC SẢN PHẨM" width="700" :before-close="handleClose">
            <div class="space-y-4">
                <div>
                    <el-link :underline="false">Tải về file mẫu:</el-link>
                    <el-link type="primary" @click="btnExportFile_Click">&nbsp;Excel File</el-link>
                </div>

                <div>
                    <h3 class="font-semibold">Xử lý trùng mã hàng, khác tên hàng</h3>
                    <el-radio-group v-model="radioConflict">
                        <el-radio :label="1">Báo lỗi, dừng import</el-radio>
                        <el-radio :label="2">Thay thế tên hàng cũ bằng tên hàng mới</el-radio>
                    </el-radio-group>
                </div>

                <div>
                    <h3 class="font-semibold">Cập nhật các thông tin khác: Giá bán, giá vốn, tồn kho</h3>
                    <el-radio-group v-model="radioUpdate">
                        <el-radio :label="1">Có</el-radio>
                        <el-radio :label="2">Không</el-radio>
                    </el-radio-group>
                </div>

                <el-upload class="upload-demo" drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple>
                    <el-icon class="el-icon--upload">
                        <UploadFilled />
                    </el-icon>
                    <div class="el-upload__text">Thả file vào đây hoặc <em>click để tải lên</em></div>
                    <template #tip>
                        <div class="el-upload__tip">Chỉ chấp nhận file .xlsx, kích thước dưới 500kb</div>
                    </template>
                </el-upload>
            </div>

            <template #footer>
                <div class="flex justify-end gap-2 mt-4">
                    <el-button @click="dialogVisible = false">Hủy</el-button>
                    <el-button type="primary" @click="dialogVisible = false">Xác nhận</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CirclePlus, DocumentAdd, Document, UploadFilled } from '@element-plus/icons-vue'

// import ProductList from '@/components/Product/ProductList.vue'
// import BasePagination from '@/components/Footer/BasePagination.vue'
import ProductList from '../components/ProductList.vue'
import BasePagination from '../../../components/BasePagination.vue'

const router = useRouter()

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(50)

const dialogVisible = ref<boolean>(false)
const radioConflict = ref<number>(1)
const radioUpdate = ref<number>(1)

const handleAddProduct = () => {
    router.push('/add-product')
}

const onSizeChange = (size: number) => {
    pageSize.value = size
    // Có thể fetch lại dữ liệu ở đây nếu cần
}

const btnImportFile_Click = () => {
    console.log('Import File')
    dialogVisible.value = true
}

const btnExportFile_Click = () => {
    console.log('Export File')
}

const handleClose = () => {
    dialogVisible.value = false
}
</script>
