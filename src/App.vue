<!--<template>-->
<!--  <div class="flex flex-col min-h-screen">-->
<!--    &lt;!&ndash; Barra de navegación superior (visible solo en pantallas pequeñas) &ndash;&gt;-->
<!--    <nav class="bg-white shadow-md sm:hidden">-->
<!--      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">-->
<!--        <div class="flex justify-between h-16">-->
<!--          <div class="flex items-center">-->
<!--            &lt;!&ndash; Logo &ndash;&gt;-->
<!--            <img src="https://1000marcas.net/wp-content/uploads/2020/03/Logo-UFC.png" alt="Logo" class="h-8 w-8"/>-->
<!--            <h1 class="ml-2 text-lg font-semibold">ERP System</h1>-->
<!--          </div>-->
<!--          &lt;!&ndash; Botón del menú para móviles &ndash;&gt;-->
<!--          <div class="flex items-center">-->
<!--            <Button-->
<!--                icon="pi pi-bars"-->
<!--                @click="toggleMenu"-->
<!--                class="menu-button"-->
<!--            />-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </nav>-->

<!--    <div class="flex flex-1">-->
<!--      &lt;!&ndash; Sidebar (oculto en pantallas pequeñas) &ndash;&gt;-->
<!--      <Drawer-->
<!--          v-model:visible="visible"-->
<!--          :dismissable="isMobile"-->
<!--          :modal="isMobile"-->
<!--          class="sidebar hidden sm:block"-->
<!--          :show-close-icon="false"-->
<!--          position="left"-->
<!--      >-->
<!--        <div class="flex flex-col h-full bg-white">-->

<!--          &lt;!&ndash; Logo &ndash;&gt;-->
<!--          <div class="flex items-center px-6 pt-4 shrink-0 mb-8">-->
<!--            <img src="https://1000marcas.net/wp-content/uploads/2020/03/Logo-UFC.png" alt="Logo" class="h-8 w-8"/>-->
<!--            <div class="ml-2">-->
<!--              <h1 class="text-lg font-semibold">ERP System</h1>-->
<!--            </div>-->
<!--          </div>-->

<!--          &lt;!&ndash; Contenido del sidebar &ndash;&gt;-->
<!--          <nav class="flex-grow overflow-y-auto">-->
<!--            <ul class="list-none p-4 m-0 space-y-2">-->
<!--              <li v-for="item in menuItems" :key="item.label">-->
<!--                <router-link-->
<!--                    :to="item.route"-->
<!--                    v-ripple-->
<!--                    class="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"-->
<!--                    :class="{ 'bg-gray-100': $route.path === item.route }"-->
<!--                >-->
<!--                  <i :class="[item.icon, 'mr-3']"></i>-->
<!--                  <span class="font-medium">{{ item.label }}</span>-->
<!--                </router-link>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </nav>-->
<!--          &lt;!&ndash; Perfil de usuario &ndash;&gt;-->
<!--          <div class="mt-auto">-->
<!--            <hr class="mb-4 mx-4 border-t border-gray-200"/>-->
<!--            <div class="m-4 p-4 flex items-center">-->
<!--              <div class="ml-2">-->
<!--                <p class="text-sm font-medium text-gray-800">Otor John</p>-->
<!--                <p class="text-xs text-gray-500">HR Office</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </Drawer>-->

<!--      &lt;!&ndash; Contenido principal &ndash;&gt;-->
<!--      <div class="flex-grow bg-gray-100 p-4 overflow-auto">-->
<!--        <router-view/>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, onUnmounted } from 'vue';-->
<!--import { menuItems } from '@/data/menuItems';-->

<!--const visible = ref(true);-->
<!--const isMobile = ref(false);-->

<!--const checkScreenSize = () => {-->
<!--  isMobile.value = window.innerWidth < 640; // sm: 640px-->
<!--  visible.value = !isMobile.value;-->
<!--};-->

<!--const toggleMenu = () => {-->
<!--  visible.value = !visible.value;-->
<!--};-->

<!--onMounted(() => {-->
<!--  checkScreenSize();-->
<!--  window.addEventListener('resize', checkScreenSize);-->
<!--});-->

<!--onUnmounted(() => {-->
<!--  window.removeEventListener('resize', checkScreenSize);-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--.sidebar {-->
<!--  width: 250px;-->
<!--  height: 100vh;-->
<!--}-->

<!--/* Estilos para dispositivos móviles */-->
<!--@media (max-width: 640px) {-->
<!--  .sidebar {-->
<!--    width: 80%;-->
<!--    position: absolute;-->
<!--  }-->
<!--}-->
<!--</style>-->

<template>
  <!-- Barra de navegación superior (visible solo en pantallas pequeñas) -->
  <nav class="bg-white shadow-md md:hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <!-- Logo -->
          <img src="" alt="Logo" class="h-8 w-8"/>
          <h1 class="ml-2 text-lg font-semibold">ERP System</h1>
        </div>
        <!-- Botón del menú para móviles -->
        <div class="flex items-center">
          <Button
              icon="pi pi-bars"
              @click="toggleMenu"
              class="menu-button"
          />
        </div>
      </div>
    </div>
  </nav>

  <div class="flex h-full">
    <div class=" custom-w">
      <!-- Sidebar (oculto en pantallas pequeñas) -->
      <Drawer
          v-model:visible="visible"
          :dismissable="isMobile"
          :modal="isMobile"
          :show-close-icon="true"
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
    <div class=" custom-w-2">
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
  isMobile.value = window.innerWidth < 640; // sm: 640px
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
.custom-w {
  width: 20rem;
}
.custom-w-2 {
  flex-grow: 1;
}
</style>