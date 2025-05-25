<template>
    <div class="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">

            <!-- Form đăng nhập -->
            <div class="md:w-1/2 md:p-10 flex flex-col justify-center space-y-8">
                <!-- Logo -->
                <div class="flex justify-center mb-4">
                    <img src="../assets/image-logo.jpg" alt="Logo" class="h-20" />
                </div>

                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-900">QUÊN MẬT KHẨU</h1>
                </div>

                <!-- Bọc toàn bộ trong el-form -->
                <el-form ref="loginFormRef" :model="forgotPassForm" :rules="rules" label-position="top" class="space-y-6">
                    <div class="space-y-4">
                        <el-form-item label="Địa chỉ email" prop="email" class="text-left">
                            <el-input v-model="forgotPassForm.email" placeholder="Nhập địa chỉ email" type="email"
                                class="w-full" />
                        </el-form-item>
                    </div>

                    <div class="space-y-4 pt-2">
                        <el-form-item>
                            <el-button type="primary" class="w-full" @click="submitForm">
                                Tiếp theo
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

<script setup lang="ts">
import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';

const forgotPassForm = ref({
  email: '',
  password: '',
  rememberPassword: false,
});

const loginFormRef = ref<FormInstance>();

const rules: FormRules = {
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự', trigger: 'blur' },
  ],
};

const submitForm = () => {
  if (!loginFormRef.value) return;

  loginFormRef.value.validate((valid) => {
    if (valid) {
      console.log('Login successful with:', forgotPassForm.value);
    } else {
      console.log('Validation failed');
    }
  });
};
</script>


<style scoped>
/* Bạn có thể tùy chỉnh thêm nếu muốn */
::v-deep(.el-form-item__label) {
    @apply font-bold text-left;
}
</style>
