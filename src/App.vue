<template>
  <ConfirmDialog/>
  <!-- Barra de navegación superior (visible solo en pantallas pequeñas) -->
  <nav class="bg-white shadow-md md:hidden mb-2">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Logo -->
          <img src="https://1000marcas.net/wp-content/uploads/2020/03/Logo-UFC.png" alt="Logo" class="h-8 w-8"/>
          <h1 class="ml-2 text-lg font-semibold">ERP System</h1>
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

  <div class="flex h-full">
    <div class=" side-bar-width">
      <!-- Sidebar (oculto en pantallas pequeñas) -->
      <Drawer
          v-model:visible="visible"
          :dismissable="isMobile"
          :modal="false"
          :show-close-icon="false"
          position="left"
      >
        <div class="flex flex-col h-full bg-white">
          <!-- Logo -->
          <div class="flex items-center px-6 pt-4 shrink-0 mb-8">
            <img src="https://1000marcas.net/wp-content/uploads/2020/03/Logo-UFC.png" alt="Logo" class="h-8 w-8"/>
            <div class="ml-2">
              <h1 class="text-lg font-semibold">ERP System</h1>
            </div>
          </div>

          <!-- Contenido del sidebar -->
          <nav class="flex-grow overflow-y-auto">
            <ul class="list-none p-4 m-0 space-y-2">
              <li v-for="item in menuItems" :key="item.label">
                <router-link
                    @click=" hideDrawIfIsMobile"
                    v-if="!item.subItems"
                    :to="item.route"
                    v-ripple
                    class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    :class="{ 'bg-gray-100': $route.path === item.route }"
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
                      <a
                          v-ripple
                          v-styleclass="{
                            selector: '@next',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-slidedown',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-slideup',
                          }">
                        <router-link
                            @click=" hideDrawIfIsMobile"
                            :to="subItem.route"
                            v-ripple
                            class="flex items-center cursor-pointer p-3 m-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors p-ripple duration-150"
                            :class="{ ' bg-gray-100 ': $route.path === subItem.route }"
                        >
                          <i :class="[subItem.icon, 'mr-3']"></i>
                          <span class="font-medium">{{ subItem.label }}</span>
                        </router-link>
                      </a>
                    </li>
                  </ul>
                </div>

              </li>
            </ul>
          </nav>

          <!-- Perfil de usuario -->
          <div class="mt-auto">
            <hr class="mb-4 mx-4 border-t border-gray-200"/>
            <div class="m-4 p-4 flex items-center">
              <div class="ml-2">
                <p class="text-sm font-medium text-gray-800">Otor John</p>
                <p class="text-xs text-gray-500">HR Office</p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
    <!-- Contenido principal -->
    <div class=" main-width">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';
import {menuItems} from '@/data/menuItems';

const visible = ref(true);
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768; // sm: 640px
  visible.value = !isMobile.value;
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
    visible.value = !visible.value;
  }
}
</script>


<style scoped>
.side-bar-width {
  width: 20rem;
}

.main-width {
  flex-grow: 1;
}

/* Estilos para dispositivos móviles */
@media (max-width: 768px) {
  .side-bar-width {
    width: 0;
  }

  .main-width {
    width: 100%;
  }
}
</style>