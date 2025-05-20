<template>
    <div class="flex min-h-screen bg-gray-100 text-gray-900">
        <aside class="w-64 bg-white shadow-md">
            <!-- Sidebar/menu -->
        </aside>
        <div class="flex-1 flex flex-col">
            <header class="h-14 bg-white shadow px-4 flex items-center justify-between">
                <div class="text-xl font-bold">My Admin</div>
                <div>
                    <!-- Settings icon, toggle dark/light, etc. -->
                </div>
            </header>
            <main class="flex-1 p-4 overflow-auto">
                <router-view />
            </main>
        </div>
    </div>
</template>
