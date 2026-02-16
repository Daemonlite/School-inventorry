<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <SideBar /> 

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <Header /> 

      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import SideBar from './SideBar.vue';
import Header from './Header.vue';
</script>