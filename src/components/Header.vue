<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userInitials = ref('')

// Mock user data
// Improved initials logic
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}

console.log(user)

userInitials.value = user.name
  ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
  : '??' 


const notifications = ref(3) // Example count
</script>

<template>
  <header class="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
    <div class="flex items-center">
      <h2 class="text-xl font-bold text-gray-800 capitalize">
        {{ route.name || 'Overview' }}
      </h2>
    </div>


    <div class="flex items-center space-x-5">
      <button class="relative p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span v-if="notifications > 0" class="absolute top-1.5 right-1.5 flex h-4 w-4">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[10px] text-white items-center justify-center font-bold">
            {{ notifications }}
          </span>
        </span>
      </button>

      <div class="h-8 w-px bg-gray-200"></div>

      <div class="flex items-center group cursor-pointer">
        <div class="text-right mr-3 hidden sm:block">
          <p class="text-sm font-bold text-gray-800 leading-none">{{ user.name }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ user.role }}</p>
        </div>
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
          {{ userInitials }}
        </div>
      </div>
    </div>
  </header>
</template>