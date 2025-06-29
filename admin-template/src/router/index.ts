import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('../pages/Dashboard.vue'),
            },
        ],
    },
    {
        path: '/product-category',
        component: () => import('@/modules/product/views/ProductCategory.vue'),
      },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
