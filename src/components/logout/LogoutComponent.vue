<template>
  <div class="user-profile-container">
    <Button
        icon="pi pi-ellipsis-v"
        class="p-button-rounded p-button-text p-button-sm options-btn"
        aria-label="Opciones"
        @click="menu.toggle($event)"
    />

    <div class="user-info">
      <div class="avatar-container">
        <Avatar :label="getUserInitials()" shape="circle" class="user-avatar"/>
      </div>
      <div class="user-details">
        <span class="user-name">{{ userName }}</span>
        <span class="user-role">{{ userRole }}</span>
      </div>
    </div>

    <Menu ref="menu" :model="menuItems" :popup="true" class="profile-menu"/>

    <Dialog
        v-model:visible="showLogoutConfirm"
        header="Confirmar Salida"
        :modal="true"
        :closable="false"
        class="logout-dialog"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle logout-icon"/>
        <span>¿Está seguro que desea cerrar sesión?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" @click="showLogoutConfirm = false" class="p-button-text"/>
        <Button label="Sí" icon="pi pi-check" @click="confirmLogout" class="p-button-gradient" autofocus/>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';

// Componentes de PrimeVue
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import {useUserStore} from "@/stores/userStore";
import {getUserRole} from "@/utils/getUserRole";

const router = useRouter();
const menu = ref();
const showLogoutConfirm = ref(false);

// eslint-disable-next-line no-undef
const emit = defineEmits(['closeSideBar']);

// Instancia del store de usuario
const userStore = useUserStore();

// Reactividad para el usuario
const user = computed(() => userStore.user);

// Si el usuario está definido, obtén su nombre
const userName = computed(() => user.value ? user.value.name : 'Invitado');
const userRole = computed(() => getUserRole(user.value.role));

const menuItems = [
  {
    label: 'Configuración',
    icon: 'pi pi-cog',
    command: () => {
      emit('closeSideBar');
      router.push('/config')
    }
  },
  {separator: true},
  {
    label: 'Cerrar Sesión',
    icon: 'pi pi-power-off',
    command: () => showLogoutConfirm.value = true
  }
];

const getUserInitials = () => {
  return userName.value
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase();
};

const confirmLogout = async () => {
  try {
    // Eliminar token y datos de sesión
    await userStore.logout();

    // Redirigir al login
    await router.push('/login');
  } catch (error) {
    console.error('Error durante el cierre de sesión:', error);
  }
};
</script>

<style scoped>
.user-profile-container {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
}

.options-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: #666;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar {
  background: linear-gradient(90deg, #4776E6, #8E54E9);
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #333;
}

.user-role {
  font-size: 0.75rem;
  color: #666;
}


/* Estilos para el diálogo de confirmación */
.logout-dialog {
  border-radius: 16px;
  overflow: hidden;
}


.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.logout-icon {
  font-size: 2rem;
  color: #ff9800;
}

/* Botón con gradiente para mantener estilo del login */
:deep(.p-button-gradient) {
  background: linear-gradient(90deg, #4776E6, #8E54E9);
  border: none;
}

:deep(.p-button-gradient:hover) {
  background: linear-gradient(90deg, #5d87e6, #9c6aef);
  box-shadow: 0 4px 12px rgba(71, 118, 230, 0.3);
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .user-name {
    font-size: 0.875rem;
  }

  .user-role {
    font-size: 0.7rem;
  }
}
</style>