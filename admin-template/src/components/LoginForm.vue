<template>
    <div class="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">

            <!-- Form đăng nhập -->
            <div class="md:w-1/2 md:p-10 flex flex-col justify-center space-y-8">
                <!-- Logo -->
                <div class="flex justify-center mb-4">
                    <img src="../assets/vue.svg" alt="Logo" class="h-20" />
                </div>

                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-900">ĐĂNG NHẬP</h1>
                </div>

                <!-- Bọc toàn bộ trong el-form -->
                <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-position="top" class="space-y-6">
                    <div class="space-y-4">
                        <el-form-item label="Tên đăng nhập" prop="email" class="text-left">
                            <el-input v-model="loginForm.email" placeholder="Nhập địa chỉ email" type="email"
                                class="w-full" />
                        </el-form-item>

                        <el-form-item label="Mật khẩu" prop="password" class="text-left">
                            <el-input v-model="loginForm.password" placeholder="Mật khẩu tối thiểu 8 chữ số"
                                type="password" show-password class="w-full" style="width: 350px;"/>
                        </el-form-item>

                        <div class="flex items-center justify-between">
                            <el-checkbox v-model="loginForm.rememberPassword">Nhớ mật khẩu</el-checkbox>
                            <a href="#" class="text-sm text-blue-600 hover:text-blue-500">Quên mật khẩu?</a>
                        </div>
                    </div>

                    <div class="space-y-4 pt-2">
                        <el-form-item>
                            <el-button type="primary" class="w-full" @click="submitForm">
                                Đăng nhập
                            </el-button>
                        </el-form-item>

                        <p class="text-center text-sm text-gray-600">
                            Chưa có tài khoản?
                            <a href="#" class="ml-2 text-blue-600 hover:text-blue-500">Đăng ký</a>
                        </p>
                    </div>
                </el-form>
            </div>

            <!-- Ảnh minh họa -->
            <div class="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 p-10">
                <img src="../assets/image-login.png" alt="Logo" class="max-h-96 object-contain" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

export default defineComponent({
    name: 'LoginPage',
    setup() {
        const loginForm = ref({
            email: '',
            password: '',
            rememberPassword: false
        });

        const loginFormRef = ref<FormInstance>();

        const rules: FormRules = {
            email: [
                { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
                { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' }
            ],
            password: [
                { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
                { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự', trigger: 'blur' }
            ]
        };

        const submitForm = () => {
            if (!loginFormRef.value) return;

            loginFormRef.value.validate((valid) => {
                if (valid) {
                    console.log('Login successful with:', loginForm.value);
                } else {
                    console.log('Validation failed');
                }
            });
        };

        return {
            loginForm,
            loginFormRef,
            rules,
            submitForm
        };
    }
});
</script>

<style scoped>
/* Bạn có thể tùy chỉnh thêm nếu muốn */
::v-deep(.el-form-item__label) {
    @apply font-bold text-left;
}
</style>
