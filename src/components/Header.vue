<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userInitials = ref('')

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
console.log(`User: ${JSON.stringify(user)}`)

console.log(user)

userInitials.value = user.name
  ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
  : '??' 


</script>

<template>
  <header class="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
    <div class="flex items-center">
      <h2 class="text-xl font-bold text-gray-800 capitalize">
        {{ route.name || 'Overview' }}
      </h2>
    </div>


    <div class="flex items-center space-x-5">


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