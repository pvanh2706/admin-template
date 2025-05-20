Dưới đây là tổng hợp các bước **cài đặt từ đầu** để bạn có thể setup dự án Vue 3 + Vite + Element Plus + Pinia + Tailwind CSS cùng với phần theme setting popup mình đã tích hợp:

---

## 1. Tạo project mới với Vite (Vue 3)

```bash
npm create vite@latest admin-template -- --template vue-ts
cd admin-template
```

---

## 2. Cài đặt các package cần thiết

```bash
npm install
npm install element-plus pinia vue-router@4 @vueuse/core
npm install -D tailwindcss postcss autoprefixer
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

---

## 3. Cấu hình Tailwind CSS

* Mở `tailwind.config.js` sửa thành:

```js
module.exports = {
  darkMode: 'class', // bật dark mode theo class
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

* Thêm Tailwind directives vào `src/styles/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

* Import file CSS trong `main.ts`:

```ts
import './styles/tailwind.css'
```

---

## 4. Tạo cấu trúc thư mục cơ bản (nếu chưa có)

```
src/
  components/
    Header.vue
    ThemeSettings.vue
  layouts/
    DefaultLayout.vue
  stores/
    theme.ts
  styles/
    tailwind.css
  main.ts
  App.vue
  router.ts
```

---

## 5. Tạo store quản lý theme `src/stores/theme.ts`

(Copy code store Pinia như mình đã gửi trước)

---

## 6. Tạo component `ThemeSettings.vue`

(Copy code popup theme setting đã gửi)

---

## 7. Tạo component `Header.vue` có nút mở popup

---

## 8. Cấu hình router và layout, import header vào layout

---

## 9. Thêm đoạn code trong `main.ts` để áp dụng theme realtime

---

## 10. Chạy thử dự án

```bash
npm run dev
```

---

Nếu bạn muốn, mình có thể cung cấp bộ file mẫu hoàn chỉnh với tất cả các bước trên luôn để bạn chỉ cần tải về giải nén và chạy luôn, tiết kiệm thời gian setup. Bạn thấy sao?
