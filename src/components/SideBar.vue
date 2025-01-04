<template>
  <div class="sidebar bg-white w-64 min-h-screen p-4 flex flex-col">
    <!-- Logo -->
    <div class="logo-container mb-8 flex items-center">
      <img src="@/assets/logo.png" alt="Logo" class="h-8 w-8"/>
      <div class="ml-2">
        <h1 class="text-lg font-semibold">ERP System</h1>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-grow">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.label">
          <router-link :to="item.route" class="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                       exact-active-class="active-link">
            <i :class="item.icon + ' mr-3'"></i>
            <span>{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- User Profile -->
    <div class="mt-auto pt-4 border-t">
      <div class="flex items-center">
        <img src="@/assets/profile.jpg" alt="Profile" class="h-8 w-8 rounded-full"/>
        <div class="ml-2">
          <p class="text-sm font-medium">Otor John</p>
          <p class="text-xs text-gray-500">HR Office</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {menuItems} from '@/data/menuItems';
</script>

<style scoped>
.active-link {
  background-color: #ebf8ff;
  border-left: 4px solid #4299e1;
}
</style>