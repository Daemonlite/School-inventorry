<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isSidebarOpen = ref(true)

// Parse user from localStorage and set role
const user = JSON.parse(localStorage.getItem('user') || '{}')
const userRole = ref(user.role || 'guest')

const menuItems = [
  { name: 'Dashboard', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { name: 'Product Categories', path: '/categories', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { name: 'Inventory', path: '/inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { name: 'Sales', path: '/sales', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  // Added requiredRole property
  { name: 'Users', path: '/users', requiredRole: 'admin', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
]

// Computed property to filter items based on role
const filteredMenuItems = computed(() => {
  return menuItems.filter(item => {
    // If no role is required, show it. If role is required, check if user matches.
    return !item.requiredRole || item.requiredRole === userRole.value
  })
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
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
        v-for="item in filteredMenuItems" 
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
      <div v-if="isSidebarOpen" class="px-3 py-2 mb-2">
        <p class="text-[10px] uppercase text-green-400 font-bold tracking-widest">Logged in as</p>
        <p class="text-xs text-white opacity-80 truncate">{{ userRole }}</p>
      </div>

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