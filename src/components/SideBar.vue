<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(true)

const menuItems = [
  { name: 'Dashboard', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Product Categories', path: '/categories', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Inventory', path: '/inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { name: 'Sales', path: '/sales', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
]

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}
</script>

<template>
  <aside 
    :class="[
      'bg-gradient-to-b from-green-800 to-green-900 text-white transition-all duration-300 flex flex-col shadow-xl h-screen sticky top-0',
      isSidebarOpen ? 'w-64' : 'w-20'
    ]"
  >
    <div class="h-16 flex items-center px-6 bg-green-900 bg-opacity-50 border-b border-green-700">
      <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <span v-if="isSidebarOpen" class="ml-3 font-bold text-xl tracking-tight text-white truncate">
        StockFlow
      </span>
    </div>

    <nav class="flex-1 mt-8 px-3 space-y-1">
      <router-link 
        v-for="item in menuItems" 
        :key="item.name" 
        :to="item.path"
        :class="[
          'flex items-center px-3 py-3 rounded-xl transition-all duration-200 group',
          route.path === item.path 
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md' 
            : 'text-green-100 hover:bg-green-700 hover:text-white'
        ]"
      >
        <svg class="w-5 h-5 shrink-0" :class="{ 'text-white': route.path === item.path }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
        </svg>
        <span v-if="isSidebarOpen" class="ml-3 text-sm font-medium tracking-wide">
          {{ item.name }}
        </span>
      </router-link>
    </nav>

    <div class="p-4 border-t border-green-700">
      <button 
        @click="handleLogout"
        class="flex items-center w-full px-3 py-3 text-green-100 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-200 group"
      >
        <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span v-if="isSidebarOpen" class="ml-3 text-sm font-medium">Logout</span>
      </button>
      
      <button 
        @click="isSidebarOpen = !isSidebarOpen"
        class="mt-4 w-full flex justify-center text-green-300 hover:text-white transition-colors"
      >
        <svg :class="['w-5 h-5 transition-transform duration-300', !isSidebarOpen && 'rotate-180']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.router-link-active {
  position: relative;
}

.router-link-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 60%;
  background: #4ade80;
  border-radius: 0 4px 4px 0;
}
</style>