<template>
  <!-- Barra de navegación superior (visible solo en pantallas pequeñas) -->
  <nav class="bg-white shadow-md md:hidden mb-2 sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Logo -->
          <img src="/logo.png" alt="Logo" class="h-8 w-8"/>
          <h1 class="ml-2 text-lg font-semibold">Somos Campeones Academia</h1>
        </div>
        <!-- Botón del menú para móviles -->
        <div class="flex items-center">
          <Button
              icon="pi pi-bars"
              @click="visible = true"
              class="menu-button"
          />
        </div>
      </div>
    </div>
  </nav>

  <div class="flex w-full screenHeight">
    <!-- Sidebar estático (visible en pantallas medianas y grandes) -->
    <div class="hidden md:block side-bar-width">
      <div class="flex flex-col h-full bg-white">
        <!-- Logo -->
        <div class="flex flex-col items-center px-6 pt-4 shrink-0 mb-8">
          <img src="/logo.png" alt="Logo" class="h-auto w-full sm:w-60"/>
          <div class="ml-2">
            <h1 class="text-lg font-semibold">Sistema Somos Campeones</h1>
          </div>
        </div>

        <!-- Contenido del sidebar -->
        <nav class="flex-grow overflow-y-auto">
          <ul class="list-none p-4 m-0 space-y-2">
            <li v-for="item in menuItems" :key="item.label">
              <router-link
                  v-if="!item.subItems"
                  :to="item.route"
                  v-ripple
                  class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  :class="{ 'bg-gray-100': $route.path === item.route }"
              >
                <span class="material-icons mr-3">{{ item.icon }}</span>
                <span class="font-medium">{{ item.label }}</span>
              </router-link>

              <div v-else>
                <a
                    v-ripple
                    v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-slideup',
                  }"
                    class="flex items-center cursor-pointer p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors p-ripple duration-150"
                >
                  <span class="material-icons mr-3">{{ item.icon }}</span>
                  <span class="font-medium">{{ item.label }}</span>
                  <i class="pi pi-chevron-down ml-auto"></i>
                </a>

                <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
                  <li v-for="subItem in item.subItems" :key="subItem.label">
                    <router-link
                        :to="subItem.route"
                        v-ripple
                        class="flex items-center cursor-pointer p-3 m-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors p-ripple duration-150"
                        :class="{ ' bg-gray-100 ': $route.path === subItem.route }"
                    >
                      <span class="material-icons mr-3">{{ subItem.icon }}</span>
                      <span class="font-medium">{{ subItem.label }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        <!-- Perfil de usuario -->
        <div class="">
          <LogoutComponent/>
        </div>
      </div>
    </div>

    <!-- Drawer para pantallas pequeñas -->
    <Drawer
        v-model:visible="visible"
        :dismissable="isMobile"
        :modal="isMobile"
        :show-close-icon="false"
        position="left"
        @hide="hideDrawIfIsMobile"
        class="md:hidden"
    >
      <div class="flex flex-col h-full bg-white">
        <div class="w-full mb-3 text-center">
          <img src="/logo.png" alt="Logo" class="h-48"/>
          <h1 class="ml-2 text-lg font-semibold">Sistema Somos Campeones</h1>
        </div>
        <nav class="flex-grow overflow-y-auto">
          <ul class="list-none p-4 m-0 space-y-2">
            <li v-for="item in menuItems" :key="item.label">
              <router-link
                  v-if="!item.subItems"
                  :to="item.route"
                  v-ripple
                  class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  :class="{ 'bg-gray-100': $route.path === item.route }"
                  @click="closeDrawer"
              >
                <i :class="[item.icon, 'mr-3']"></i>
                <span class="font-medium">{{ item.label }}</span>
              </router-link>

              <div v-else>
                <a
                    v-ripple
                    v-styleclass="{
                    selector: '@next',
                    enterFromClass: 'hidden',
                    enterActiveClass: 'animate-slidedown',
                    leaveToClass: 'hidden',
                    leaveActiveClass: 'animate-slideup',
                  }"
                    class="flex items-center cursor-pointer p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors p-ripple duration-150"
                >
                  <i :class="[item.icon, 'mr-3']"></i>
                  <span class="font-medium">{{ item.label }}</span>
                  <i class="pi pi-chevron-down ml-auto"></i>
                </a>

                <ul class="list-none py-0 pl-4 pr-0 m-0 hidden overflow-y-hidden transition-all duration-[400ms] ease-in-out">
                  <li v-for="subItem in item.subItems" :key="subItem.label">
                    <router-link
                        @click="closeDrawer"
                        :to="subItem.route"
                        v-ripple
                        class="flex items-center cursor-pointer p-3 m-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors p-ripple duration-150"
                        :class="{ ' bg-gray-100 ': $route.path === subItem.route }"
                    >
                      <i :class="[subItem.icon, 'mr-3']"></i>
                      <span class="font-medium">{{ subItem.label }}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <!-- Perfil de usuario -->
      <div class="">
        <LogoutComponent/>
      </div>
    </Drawer>

    <!-- Contenido principal -->
    <div class="flex-grow mt-2 mx-2 overflow-x-auto">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {menuItems} from '@/data/menuItems';
import Drawer from 'primevue/drawer';
import LogoutComponent from "@/components/logout/LogoutComponent.vue";

const visible = ref(false);
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1100; // sm: 640px
  if (!isMobile.value) {
    visible.value = false;
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

function hideDrawIfIsMobile() {
  if (isMobile.value) {
    visible.value = false;
  }
}

const closeDrawer = () => {
  if (isMobile.value) {
    visible.value = false;
  }
};
</script>

<style scoped>
.side-bar-width {
  width: 15vw;
}

.screenHeight {
  height: 100vh;
}

@media (max-width: 992px) {
  .side-bar-width {
    width: 25vw; /* Aumenta el ancho del sidebar en pantallas medianas */
  }
}


</style>