<template>
  <div class="sidebar-layout">
    <Drawer v-model:visible="visible"
            :dismissable="isMobile"
            :modal="isMobile"
            class="sidebar"
            :show-close-icon="false"
            position="left">
      <div class="flex flex-col h-full bg-white">
        <!-- Logo -->
        <div class="flex items-center px-6 pt-4 shrink-0 mb-8">
          <img src="../../assets/logo.png" alt="Logo" class="h-8 w-8"/>
          <div class="ml-2">
            <h1 class="text-lg font-semibold">ERP System</h1>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex-grow overflow-y-auto">
          <ul class="list-none p-4 m-0 space-y-2">
            <li v-for="item in menuItems" :key="item.label">
              <router-link
                  :to="item.route"
                  v-ripple
                  class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  :class="{ 'bg-gray-100': $route.path === item.route }"
              >
                <i :class="[item.icon, 'mr-3']"></i>
                <span class="font-medium">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- User Profile -->
        <div class="mt-auto">
          <hr class="mb-4 mx-4 border-t border-gray-200"/>
          <div class="m-4 p-4 flex items-center">
            <!-- <img src="@/assets/profile.jpg" alt="Profile" class="h-8 w-8 rounded-full"/> -->
            <div class="ml-2">
              <p class="text-sm font-medium text-gray-800">Otor John</p>
              <p class="text-xs text-gray-500">HR Office</p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>

  </div>
  <!-- Mobile menu button -->
  <div v-if="isMobile" class="mobile-button bg-amber-100">
    <Button
        icon="pi pi-bars"
        @click="toggleMenu"
        class="menu-button h-fit"/>

  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {menuItems} from '@/data/menuItems';

const visible = ref(true);
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
  visible.value = !isMobile.value;
};

const toggleMenu = () => {
  visible.value = !visible.value;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<style scoped>
.sidebar-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: auto;
  height: 100vh;
}


/* Mobile styles */
@media (max-width: 768px) {
  .sidebar {
    width: 80%;
    position: absolute;
  }

  .mobile-button{
    position: relative;
    top: 1rem;
    left: 1rem;
    z-index: 999;
  }
  .sidebar-layout {
    position: absolute;

  }
}

:deep(.p-sidebar) {
  height: 100vh;
}

:deep(.p-sidebar-content) {
  padding: 0;
}

/* Router link active state */
.router-link-active {
  @apply bg-gray-100;
}

/* Optional: Add a subtle transition effect */
.router-link-active {
  transition: background-color 0.2s ease-in-out;
}
</style>