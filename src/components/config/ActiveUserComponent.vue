<template>
  <div class="profile-header-card">
    <div class="profile-view" v-if="!isEditingInfo && !isChangingPassword">
      <div class="profile-avatar">
        <Avatar :image="user.avatar || null" :label="getInitials(user.name)" class="user-avatar"/>
        <div class="role-badge" :class="getRoleBadgeClass(user.role)">
          {{ getUserRole(user.role) }}
        </div>
      </div>

      <div class="profile-info">
        <h2 class="user-name">{{ user.name }}</h2>
        <div class="user-email">
          <i class="pi pi-envelope"></i>
          {{ user.email }}
        </div>
        <div class="flex gap-2">

          <Button label="Editar Información" icon="pi pi-pencil" class="p-button-secondary edit-button"
                  @click="startEditing"/>
          <Button label="Cambiar Contraseña" icon="pi pi-key" class="p-button-warning change-password-button"
                  @click="startPasswordChange"/>
        </div>
      </div>
    </div>

    <div class="profile-edit" v-else-if="isEditingInfo && !isChangingPassword">
      <h2 class="edit-title">Editar Perfil</h2>
      <form @submit.prevent="saveChanges" class="edit-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Nombre</label>
            <InputText id="name" v-model="editedUser.name" placeholder="Tu nombre completo"/>
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <InputText id="email" v-model="editedUser.email" placeholder="ejemplo@correo.com"/>
          </div>
        </div>

        <div class="form-actions">
          <Button type="button" label="Cancelar" icon="pi pi-times" class="p-button-outlined p-button-secondary"
                  @click="cancelEditing"/>
          <Button type="submit" label="Guardar Cambios" icon="pi pi-check" class="p-button-primary" :loading="saving"/>
        </div>
      </form>
    </div>

    <div class="password-edit m-4" v-else>
      <h2 class="edit-title">Cambiar Contraseña</h2>
      <form @submit.prevent="updatePassword" class="edit-form">

        <div class="flex">
          <div class="grow">
            <label for="currentPassword" class="text-xl">Contraseña Actual</label>
            <div class="my-2">
              <Password id="currentPassword" v-model="passwordData.currentPassword" placeholder="Contraseña actual"
                        toggleMask/>
            </div>
          </div>

          <div class="grow">
            <label for="newPassword" class="text-xl">Nueva Contraseña</label>
            <div class="my-2">
              <Password id="newPassword" v-model="passwordData.newPassword" placeholder="Nueva contraseña" toggleMask/>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <Button type="button" label="Cancelar" icon="pi pi-times" class="p-button-outlined p-button-secondary"
                  @click="cancelPasswordChange"/>
          <Button type="submit" label="Actualizar Contraseña" icon="pi pi-check" class="p-button-primary"
                  :loading="saving"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import {useUserStore} from "@/stores/userStore";
import {updateUserService, updatePasswordService} from "@/services/userService";
import {useToast} from "primevue/usetoast";
import {getUserRole} from "@/utils/getUserRole";

const userStore = useUserStore();
const user = ref({name: '', email: '', role: '', avatar: null});
const isEditingInfo = ref(false);
const isChangingPassword = ref(false);
const saving = ref(false);

const toast = useToast();

const editedUser = reactive({name: '', email: ''});
const passwordData = reactive({currentPassword: '', newPassword: ''});

const loadUserData = async () => {
  user.value = await userStore.user;
};

const getInitials = (name) => name ? name.split(' ').map(part => part[0]).join('').toUpperCase() : '';
const getRoleBadgeClass = (role) => ({
  superuser: 'role-superuser',
  admin: 'role-admin',
  user: 'role-user'
}[role.toLowerCase()] || 'role-default');

const startEditing = () => {
  editedUser.name = user.value.name;
  editedUser.email = user.value.email;
  isEditingInfo.value = true;
};

const startPasswordChange = () => {
  passwordData.currentPassword = '';
  passwordData.newPassword = '';
  isChangingPassword.value = true;
};

const cancelEditing = () => {
  isEditingInfo.value = false;
};
const cancelPasswordChange = () => {
  isChangingPassword.value = false;
};

const saveChanges = async () => {
  saving.value = true;
  try {
    await updateUserService(userStore.user.id, {name: editedUser.name, email: editedUser.email});
    user.value = {...user.value, name: editedUser.name, email: editedUser.email};
    isEditingInfo.value = false;
  } catch (error) {
    console.error('Error al actualizar información:', error);
  } finally {
    saving.value = false;
  }
};

const updatePassword = async () => {
  saving.value = true;
  try {
    await updatePasswordService(userStore.user.id, passwordData.currentPassword, passwordData.newPassword);
    createToast('success', 'Contraseña actualizada', 'La contraseña ha sido actualizada correctamente');
    isChangingPassword.value = false;
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    createToast('error', 'Error', error.response.data.message || 'Ha ocurrido un error al actualizar la contraseña');
  } finally {
    saving.value = false;
  }
};

const createToast = (severity, summary, detail) => {
  toast.add({severity, summary, detail, life: 1500});
};

onMounted(loadUserData);
</script>


<style scoped>
.profile-header-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  overflow: hidden;
}

/* Modo visualización */
.profile-view {
  display: flex;
  padding: 2rem;
}

.profile-avatar {
  position: relative;
  margin-right: 2rem;
}

.user-avatar {
  background-color: #3F51B5;
  color: white;
  font-size: 1.25rem;
  width: 90px;
  height: 90px;
}

.role-badge {
  position: absolute;
  bottom: -5px;
  right: -5px;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.role-superuser {
  background-color: #ed0c0c;
  color: white;
}

.role-admin {
  background-color: #42cc1c;
  color: white;
}

.role-user {
  background-color: #78909C;
  color: white;
}

.profile-info {
  flex: 1;
}

.user-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: #263238;
}

.user-email {
  display: flex;
  align-items: center;
  color: #546E7A;
  margin-bottom: 1.5rem;
}

.user-email i {
  margin-right: 0.5rem;
}

.edit-button {
  border-radius: 4px;
}

/* Modo edición */
.profile-edit {
  padding: 1.5rem 2rem;
}

.edit-title {
  margin: 0 0 1.5rem 0;
  color: #263238;
  font-size: 2.25rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1.5rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #455A64;
  font-size: 0.9rem;
}

.form-error {
  color: #D32F2F;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.disabled-input {
  background-color: #ECEFF1;
  color: #607D8B;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

:deep(.p-button-primary) {
  background-color: #3F51B5;
  border-color: #3F51B5;
}

:deep(.p-button-primary:hover) {
  background-color: #303F9F;
  border-color: #303F9F;
}

:deep(.p-button-secondary) {
  color: #455A64;
  border-color: #CFD8DC;
}

:deep(.p-button-secondary:hover) {
  background-color: #ECEFF1;
  border-color: #B0BEC5;
}

@media (max-width: 768px) {
  .profile-view {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-avatar {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>