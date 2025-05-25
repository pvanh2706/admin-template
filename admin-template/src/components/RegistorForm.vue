<template>
    <div class="flex items-center justify-center bg-white">
        <div class="w-full max-w-6xl bg-white">
            <!-- Logo -->
            <div class="flex justify-center mb-4">
                <img src="../assets/vue.svg" alt="Logo" class="h-20" />
            </div>

            <!-- Title -->
            <h2 class="text-3xl font-bold text-center mb-10">ĐĂNG KÍ TÀI KHOẢN</h2>

            <!-- Form -->
            <el-form :model="form" :rules="rules" ref="registerForm" label-position="top"
                class="bg-white px-4 sm:px-10 md:px-20 lg:px-32 space-y-10">
                <!-- Grid layout -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-5">
                    <el-form-item label="Họ và tên" class="text-left font-bold" prop="name">
                        <el-input v-model="form.name" placeholder="Nhập họ và tên" />
                    </el-form-item>

                    <el-form-item label="Mật khẩu" class="text-left font-bold">
                        <el-input v-model="form.password" :type="passwordVisible ? 'text' : 'password'"
                            placeholder="Mật khẩu tối thiểu 8 chữ số">
                            <template #suffix>
                                <el-icon class="cursor-pointer" @click="passwordVisible = !passwordVisible">
                                    <component :is="passwordVisible ? Eye : EyeOff" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="Email" class="text-left font-bold" prop="email">
                        <el-input v-model="form.email" placeholder="Nhập địa chỉ email của bạn" />
                    </el-form-item>

                    <el-form-item label="Nhập lại mật khẩu" class="text-left font-bold">
                        <el-input v-model="form.confirmPassword" :type="confirmPasswordVisible ? 'text' : 'password'"
                            placeholder="Nhập lại mật khẩu">
                            <template #suffix>
                                <el-icon class="cursor-pointer"
                                    @click="confirmPasswordVisible = !confirmPasswordVisible">
                                    <component :is="confirmPasswordVisible ? Eye : EyeOff" />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <!-- Select khu vực -->
                    <el-form-item label="Khu vực" class="text-left font-bold">
                        <el-select v-model="form.region" placeholder="Chọn tỉnh thành phố" size="large" class="!h-12"
                            filterable>
                            <el-option v-for="item in regions" :key="item" :label="item" :value="item" />
                        </el-select>
                    </el-form-item>
                </div>

                <!-- Submit button -->
                <div class="flex justify-center">
                    <el-button type="primary" size="large" @click="submitForm(registerForm)"
                        class="!bg-blue-600 hover:!bg-blue-700 text-white px-14 py-3 rounded-full text-lg">
                        Xác nhận
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { View as Eye, Hide as EyeOff } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'


interface RuleForm {
    name: string
    email: string
}
const registerForm = ref<FormInstance>()
const form = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    region: '',
})
const rules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: 'Please input Name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    email: [
        { required: true, message: 'Please input Email', trigger: 'blur' },
    ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}

const passwordVisible = ref(false)
const confirmPasswordVisible = ref(false)

const regions = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng']
</script>

<style scoped>
::v-deep(.el-form-item__label) {
    @apply font-bold text-left;
}

/* Ngăn input nhảy chiều cao */
::v-deep(.el-input) {
    min-height: 2.5rem;
    /* 48px - tương ứng h-12 */
}
</style>
