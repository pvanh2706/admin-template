<template>
    <div class="add-product-wrapper">
        <el-row class="add-product-header" style="background-color: #FFFAEB; height: 50px;">
            <el-col :span="15">
                <span style="font-size: 24px; font-weight: bold;">Danh mục sản phẩm</span>
            </el-col>
            <el-col :span="9" class="text-right">
                <el-button @click="btnCancel_Click">Hủy</el-button>
                <el-button type="primary" :icon="CirclePlus" @click="btnAddProduct_Click">Lưu</el-button>
            </el-col>
        </el-row>
        <el-scrollbar class="add-product-content">
            <el-row no-gutters class="add-product-title flex items-center">
                <img src="../assets/logo_chuot.gif" style="height: 50px;" alt="">
                <span style="font-size: 20px;">Thông tin sản phẩm</span>
            </el-row>
            <el-card>
                <el-form
                    :label-position="'top'">
                        <el-row class="mb-2">
                            <el-col :span="12">Tên sản phẩm <el-text type="danger">*</el-text></el-col>
                        </el-row>
                        <el-input  class="mb-3" placeholder="Nhập tên sản phẩm (Tối đa 300 kí tự)" style="width: 80%;"></el-input>


                    <el-row :gutter="30">
                        <el-col :span="6">
                            <el-form-item label="Mã sản phẩm (MÃ SKU)">
                                <el-input placeholder="Nhập mã SKU"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Mã vạch">
                                <el-input placeholder="Nhập mã vạch"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-row class="mb-2">
                                <el-col :span="12">Nhóm sản phẩm</el-col>
                                <el-col :span="12" class='text-end pr-2'>
                                    <el-button type='primary' link @click="dialogGroupProductVisible = true">Tạo mới</el-button>
                                </el-col>
                            </el-row>
                            <el-select
                                v-model="selected"
                                filterable
                                clearable
                                placeholder="Chọn nhóm sản phẩm"
                                class="w-100"
                                :popper-class="'custom-select-dropdown'"
                                >
                                <el-option
                                    v-for="item in flatOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled"
                                >
                                    <!-- Hiển thị label với indent nếu là con -->
                                    <span :class="item.isChild ? 'pl-6' : 'font-semibold'">
                                    {{ item.label }}
                                    </span>
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6">
                            <el-row class="mb-2">
                                <el-col :span="12">Thương hiệu</el-col>
                                <el-col :span="12" class='text-end pr-2'>
                                    <el-button type='primary' link @click="dialogThuongHieuVisible = true">Tạo mới</el-button>
                                </el-col>
                            </el-row>
                            <el-select
                                v-model="selectedThuongHieu"
                                filterable
                                clearable
                                placeholder="Chọn thương hiệu"
                                class="w-100"
                                :popper-class="'custom-select-dropdown'"
                                >
                                <el-option
                                    v-for="item in optionThuongHieu"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled"
                                >
                                    <!-- Hiển thị label với indent nếu là con -->
                                    <span :class="item.isChild ? 'pl-6' : 'font-semibold'">
                                    {{ item.label }}
                                    </span>
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" class="mb-2">
                        <el-col :span="6">
                            <el-row class="mb-2">
                                <el-col :span="12">Đơn vị tính cơ bản <el-text type="danger">*</el-text></el-col>
                                <el-col :span="12" class='text-end pr-2'>
                                    <el-button type='primary' link @click="visibleSubUnit = true" :icon="CirclePlus">Thêm đơn vị phụ</el-button>
                                </el-col>
                            </el-row>
                            <el-select
                                v-model="selectedUnit"
                                filterable
                                clearable
                                placeholder="Chọn đơn vị tính"
                                class="w-100"
                                :popper-class="'custom-select-dropdown'"
                                >
                                <template #header>
                                    <el-button type='primary' link @click="visibleThemDonViTinhMoi = true" :icon="Plus">Thêm đơn vị tính mới</el-button>
                                </template>
                                <el-option
                                    v-for="item in optionUnit"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled"
                                >
                                    <!-- Hiển thị label với indent nếu là con -->
                                    <span :class="item.isChild ? 'pl-6' : 'font-semibold'">
                                    {{ item.label }}
                                    </span>
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6">
                            <el-form-item label="Giá vốn">
                                <el-input placeholder="Nhập giá vốn"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Giá bán">
                                <el-input placeholder="Nhập giá bán"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="Mô tả">
                                <BaseCKEditor v-model="productDetail" style="width: 100% !important;" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-row no-gutters class="add-product-title flex items-center">
                <img src="../assets/logo_chuot.gif" style="height: 50px;" alt="">
                <span style="font-size: 20px;"> Quản lý theo lô, hạn sử dụng</span>
            </el-row>
            <el-card>
                <el-form
                    :label-position="'top'">
                    <el-row :gutter="30">
                        <el-col :span="6">
                            <el-form-item label="Quản lý theo lô, hạn sử dụng">
                                <el-select placeholder="Không"></el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
           

            <el-row no-gutters class="add-product-title flex items-center">
                <img src="../assets/logo_chuot.gif" style="height: 50px;" alt="">
                <span style="font-size: 20px;">Thông tin kho</span>
            </el-row>
            <el-card>
                <el-form
                    :label-position="'top'">
                    <el-row :gutter="30">
                        <el-col :span="6">
                            <el-form-item label="Quản lý theo lô, hạn sử dụng">
                                <el-select placeholder="Không"></el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Tồn kho">
                                <el-input placeholder="Nhập tồn kho"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Có cho phép bán âm">
                                <el-select placeholder="Không"></el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="6">
                            <el-form-item label="Định mức tồn thấp nhất">
                                <el-input placeholder="Nhập định mức tồn thấp nhất"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Định mức tồn cao nhất">
                                <el-input placeholder="Nhập định mức tồn cao nhất"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-row no-gutters class="add-product-title flex items-center">
                <img src="../assets/logo_chuot.gif" style="height: 50px;" alt="">
                <span style="font-size: 20px;">Thuộc tính</span>
            </el-row>
            <el-card>
                <el-form
                    :label-position="'top'">
                    <el-row :gutter="30">
                        <el-col :span="6">
                            <el-form-item label="Thuộc tính">
                                <el-input placeholder="Nhập thuộc tính"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="Giá trị">
                                <el-input placeholder="Nhập giá trị"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <el-button type='primary' link @click="visibleThemThuocTinh = true" :icon="CirclePlus">Thêm thuộc tính</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
            <el-row no-gutters class="add-product-title flex items-center">
                <img src="../assets/logo_chuot.gif" style="height: 50px;" alt="">
                <span style="font-size: 20px;">Ảnh sản phẩm</span>
            </el-row>
            <el-card>
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                    <el-icon><Plus /></el-icon>

                    <template #file="{ file }">
                    <div>
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                        <span class="el-upload-list__item-actions">
                        <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                        >
                            <el-icon><zoom-in /></el-icon>
                        </span>
                        <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                        >
                            <el-icon><Download /></el-icon>
                        </span>
                        <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                        >
                            <el-icon><Delete /></el-icon>
                        </span>
                        </span>
                    </div>
                    </template>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
            </el-card>


            <el-dialog
                v-model="dialogGroupProductVisible"
                title="Tạo nhóm sản phẩm"
                width="400"
            >
                <el-row class="mb-2">Tên nhóm</el-row>
                <el-row class="mb-2">
                    <el-input placeholder="Nhập tên nhóm"> </el-input>
                </el-row>
            
                <el-row class="mb-2">Nhóm cha</el-row>
                <el-row class="mb-2">
                    <el-tree-select
                        v-model="valueTreeGroupParent"
                        :data="dataTreeGroupParent"
                        :render-after-expand="false"
                        check-strictly
                        filterable
                    />
                </el-row>

                <el-text class="mx-1" type="danger">Không chọn nhóm hàng => Nhóm đó là nhóm Cha</el-text>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogGroupProductVisible = false">Hủy</el-button>
                        <el-button type="primary" @click="dialogGroupProductVisible = false">
                            Lưu
                        </el-button>
                    </div>
                </template>
            </el-dialog>


            <el-dialog
                v-model="dialogThuongHieuVisible"
                title="Tạo thương hiệu"
                width="300"
            >
                <el-row class="mb-2">Tên thương hiệu</el-row>
                <el-row class="mb-2">
                    <el-input placeholder="Nhập tên thương hiệu"> </el-input>
                </el-row>

                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogThuongHieuVisible = false">Hủy</el-button>
                        <el-button type="primary" @click="dialogThuongHieuVisible = false">
                            Lưu
                        </el-button>
                    </div>
                </template>
            </el-dialog>


            <el-dialog v-model="visibleSubUnit" title="Thêm đơn vị phụ" width="700px" align-center>
                <div v-for="(item, index) in unitList" :key="index">
                    <!-- Chọn đơn vị phụ + nút -->
                    <el-row class="mt-3">
                        <el-col :span="12">
                            <el-row class="mb-2">
                                <el-col :span="12">Chọn đơn vị phụ <el-text type="danger">*</el-text></el-col>
                                <el-col :span="12" class='text-end pr-2'>
                                    <el-button v-if="index===0" type='primary' link @click="addSubUnit_Click" :icon="CirclePlus">Thêm đơn vị phụ</el-button>
                                </el-col>
                            </el-row>
                            <el-select
                                v-model="selectedUnit"
                                filterable
                                clearable
                                placeholder="Chọn đơn vị phụ"
                                class="w-100"
                                :popper-class="'custom-select-dropdown'"
                                >
                                <el-option
                                    v-for="item in optionUnit"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled"
                                >
                                    <!-- Hiển thị label với indent nếu là con -->
                                    <span :class="item.isChild ? 'pl-6' : 'font-semibold'">
                                    {{ item.label }}
                                    </span>
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="10">
                            <el-row class="mb-2">
                                <el-col :span="24">Nhập giá trị quy đổi</el-col>
                            </el-row>
                            <el-input placeholder="Nhập giá trị quy đổi" />
                        </el-col>
                    </el-row>

                    <el-row class="mt-2">
                        <el-col :span="12">
                            <el-text type="danger">Đơn vị phụ = Giá trị quy đổi * đơn vị tính cơ bản.</el-text><br>
                            <el-text type="danger">VD 1 thùng = 20 gói</el-text>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="4">
                            <el-row class="mb-2">
                                <el-col :span="24">Giá vốn</el-col>
                            </el-row>
                            <el-input/>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="4">
                            <el-row class="mb-2">
                                <el-col :span="24">Giá bán</el-col>
                            </el-row>
                            <el-input/>
                        </el-col>
                    </el-row>
                </div>

                <template #footer>
                <el-button @click="visibleSubUnit = false">Hủy</el-button>
                <el-button type="primary" @click="visibleSubUnit = false">Lưu</el-button>
                </template>
            </el-dialog>


            <el-dialog
                v-model="visibleThemThuocTinh"
                title="Thêm thuộc tính"
                width="300"
            >
                <el-row class="mb-2">Thêm thuộc tính</el-row>
                <el-row class="mb-2">
                    <el-input placeholder="Nhập tên thuộc tính"> </el-input>
                </el-row>

                <el-row class="mb-2">Giá trị</el-row>
                <el-row class="mb-2">
                    <el-input placeholder="Nhập ký tự và nhấn enter"> </el-input>
                </el-row>

                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="visibleThemThuocTinh = false">Hủy</el-button>
                        <el-button type="primary" @click="visibleThemThuocTinh = false">
                            Lưu
                        </el-button>
                    </div>
                </template>
            </el-dialog>

            <el-dialog
                v-model="visibleThemDonViTinhMoi"
                title="Thêm đơn vị tính"
                width="300"
            >
                <el-row class="mb-2">Nhập đơn vị tính</el-row>
                <el-row class="mb-2">
                    <el-input> </el-input>
                </el-row>

                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="visibleThemDonViTinhMoi = false">Hủy</el-button>
                        <el-button type="primary" @click="visibleThemDonViTinhMoi = false">
                            Lưu
                        </el-button>
                    </div>
                </template>
            </el-dialog>

        </el-scrollbar>
    </div>
</template>

<script setup>
import { CirclePlus, Plus, ZoomIn, Download, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import router from '@/router'
const productDetail = ref('');

const dialogVisible = ref(false)
const dialogGroupProductVisible = ref(false)
const dialogThuongHieuVisible = ref(false)
const visibleThemDonViTinhMoi = ref(false)
const visibleSubUnit = ref(false)
const visibleThemThuocTinh = ref(false)
const dialogImageUrl = ref('')
const valueTreeGroupParent = ref('')
const disabled = ref(false)
const unitList = ref([1])
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
}
const handleDownload = (file) => {
    console.log(file);
}
const handleRemove = (file) => {
    console.log(file);
}

const addSubUnit_Click= () => {
    unitList.value.push(2);
}

const btnCancel_Click = () => {
    router.push('/product-category')
}

const btnAddProduct_Click = () => {
    router.push('/product-category')
}

const dataTreeGroupParent = [
    {
        value: '1',
        label: 'Nước suối',
        children: [
            {
                value: '1-1',
                label: 'Nước suối nóng',
            },
            {
                value: '1-2',
                label: 'Nước suối lạnh',
            },
        ],
    },
    {
        value: '2',
        label: 'Sữa tươi',
        children: [
            {
                value: '2-1',
                label: 'Sữa tươi đặc',
            },
            {
                value: '2-2',
                label: 'Sữa tươi lạnh',
            },
        ],
    }
];

const selected = ref('');
const selectedThuongHieu = ref('');
const selectedUnit = ref('');
  
const optionThuongHieu = [
    {
      label: 'Colagate',
      value: 'nuoc_soi',
    },
    {
      label: 'Sensodyne',
      value: 'kem',
    },
    {
      label: 'Aquafresh',
      value: 'kem1',
    },
    {
      label: 'Ngọc Châu',
      value: 'kem2',
    }
]

const optionUnit = [
    {
      label: 'Chai',
      value: 'nuoc_soi',
    },
    {
      label: 'Lon',
      value: 'kem',
    },
    {
      label: 'Cái',
      value: 'kem1',
    },
    {
      label: 'Túi',
      value: 'kem2',
    }
]

const groupedData = [
{
    label: 'Nước sôi',
    value: 'nuoc_soi',
},
{
    label: 'Kem',
    value: 'kem',
},
{
    label: 'Dầu gội',
    value: 'dau_goi',
    children: [
    { label: 'Dầu gội (chai)', value: 'dau_goi_chai' },
    { label: 'Dầu gội (dây)', value: 'dau_goi_day' },
    ],
},
];
  
  // Flatten thành 1 list có thêm flag `isChild`
  const flatOptions = groupedData.flatMap((item) => {
    const groupOption = {
      label: item.label,
      value: item.value,
      isChild: false,
    };
    if (item.children) {
      const childrenOptions = item.children.map((child) => ({
        ...child,
        isChild: true,
      }));
      return [groupOption, ...childrenOptions];
    }
    return [groupOption];
  });
</script>

<style scoped>
    .add-product-wrapper {
        /* margin: 10px; */
    }
    .add-product-header {
        display: flex;
        align-items: center;
        padding: 5px 10px;
        /* background-color: #fff; */
        /* border: 1px solid #e4e7ed; */
        border-radius: 5px;
    }
    .add-product-content {
        margin-top: 10px;
        /* padding: 10px; */
        /* background-color: #fff; */
        /* border-radius: 5px; */
        height: calc(100vh - 175px);
        overflow: auto;
    }
    .text-right {
        text-align: right;
    }
    .add-product-title {
        /* background-color: #EFF8FF; */
        /* padding: 3px 10px; */
    }
    .el-card {
        margin: 10px 0;
    }

</style>