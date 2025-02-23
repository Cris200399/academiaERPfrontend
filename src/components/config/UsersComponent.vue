<template>
  <div class="admin-users-container">
    <div class="header-actions">
      <h2>Usuarios</h2>
      <Button
          label="Nuevo User"
          icon="pi pi-plus"
          @click="openNewUserDialog"
          class="p-button-primary"
      />
    </div>

    <DataTable
        :value="users"
        :paginator="true"
        :rows="10"
        :loading="loading"
        responsiveLayout="scroll"
        class="admin-table"
        v-model:selection="selectedUser"
        selectionMode="single"
        dataKey="id"
        :rowHover="true"
    >
      <Column field="name" header="Nombre" sortable>
        <template #body="{ data }">
          <div class="user-name-cell">
            <Avatar
                :label="getInitials(data.name)"
                shape="circle"
                class="user-avatar-small"
            />
            <span>{{ data.name }}</span>
          </div>
        </template>
      </Column>
      <Column field="email" header="Correo" sortable/>
      <Column field="role" header="Rol">
        <template #body="{ data }">
          <Tag :value="data.role.charAt(0).toUpperCase() + data.role.slice(1)" severity="contrast"/>
        </template>
      </Column>
      <Column header="Acciones">
        <template #body="{ data }">
          <div class="action-buttons">
            <Button
                icon="pi pi-pencil"
                class="p-button-secondary p-button-sm"
                @click="editUser(data)"
                tooltip="Editar"
            />
            <Button
                icon="pi pi-trash"
                class="p-button-danger p-button-sm"
                @click="confirmDelete(data)"
                tooltip="Eliminar"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Diálogo para crear/editar usuario -->
    <Dialog
        v-model:visible="userDialog"
        :header="dialogHeader"
        :modal="true"
        class="user-dialog"
    >
      <div class="dialog-content">
        <div class="form-group">
          <label for="name">Nombre*</label>
          <InputText
              id="name"
              v-model="editedUser.name"
              :class="{'p-invalid': v$.name.$invalid && v$.name.$dirty}"
              placeholder="Nombre completo"
          />
          <small v-if="v$.name.$invalid && v$.name.$dirty" class="p-error">
            El nombre es obligatorio
          </small>
        </div>

        <div class="form-group">
          <label for="email">Correo Electrónico*</label>
          <InputText
              id="email"
              v-model="editedUser.email"
              :class="{'p-invalid': v$.email.$invalid && v$.email.$dirty}"
              placeholder="ejemplo@correo.com"
          />
          <small v-if="v$.email.$invalid && v$.email.$dirty" class="p-error">
            Email inválido
          </small>
        </div>

        <div class="form-group" v-if="!isEditing">
          <label for="password">Contraseña*</label>
          <Password
              id="password"
              v-model="editedUser.password"
              placeholder="Contraseña"
              :class="{'p-invalid': v$.password.$invalid && v$.password.$dirty}"
              :feedback="false"
              toggleMask
          />
          <small v-if="v$.password.$invalid && v$.password.$dirty" class="p-error">
            La contraseña debe tener al menos 6 caracteres
          </small>
        </div>


        <div class="form-group">
          <label>Rol</label>
          <InputText value="User" disabled class="disabled-input"/>
        </div>
      </div>

      <template #footer>
        <Button
            label="Cancelar"
            icon="pi pi-times"
            class="p-button-outlined p-button-secondary"
            @click="closeDialog"
        />
        <Button
            label="Guardar"
            icon="pi pi-check"
            class="p-button-primary"
            @click="saveUser"
            :loading="saving"
        />
      </template>
    </Dialog>

    <!-- Diálogo de confirmación para eliminar -->
    <Dialog
        v-model:visible="deleteDialog"
        header="Confirmar Eliminación"
        :modal="true"
        class="delete-dialog"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle"/>
        <span>¿Está seguro de que desea eliminar a <b>{{ editedUser.name }}</b>?</span>
      </div>
      <template #footer>
        <Button
            label="No"
            icon="pi pi-times"
            class="p-button-outlined p-button-secondary"
            @click="deleteDialog = false"
        />
        <Button
            label="Sí"
            icon="pi pi-check"
            class="p-button-danger"
            @click="deleteUser"
            :loading="deleting"
        />
      </template>
    </Dialog>

    <Toast/>
  </div>
</template>

<script setup>
import {ref, reactive, computed, onMounted} from 'vue';
import {useVuelidate} from '@vuelidate/core';
import {required, email, minLength} from '@vuelidate/validators';

// Componentes PrimeVue
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Avatar from 'primevue/avatar';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import {useToast} from 'primevue/usetoast';
import {
  createUserService,
  deleteUserService,
  getUsersService,
  updateUserService
} from "@/services/userService";
import User from "@/models/user";

// Estados
const users = ref([]);
const loading = ref(true);
const userDialog = ref(false);
const deleteDialog = ref(false);
const saving = ref(false);
const deleting = ref(false);
const isEditing = ref(false);
const selectedUser = ref(null);
const toast = useToast();

// Usuario editable
const editedUser = reactive({
  id: null,
  name: '',
  email: '',
  password: '',
  role: 'user'
});

// Reglas de validación
const rules = computed(() => ({
  name: {required},
  email: {required, email},
  password: isEditing.value ? {} : {required, minLength: minLength(6)}
}));

const v$ = useVuelidate(rules, editedUser);

// Header del diálogo dinámico
const dialogHeader = computed(() =>
    isEditing.value ? 'Editar Usuario' : 'Nuevo Usuario'
);

// Cargar usuarios (simulado)
const loadUsers = async () => {
  loading.value = true;
  try {
    // Simulando llamada a API
    const userResponse = await getUsersService();
    userResponse.forEach(user => {
      users.value.push(new User(user._id, user.name, user.email, '', user.role));
    })

  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudieron cargar los usuarios',
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};

// Abrir diálogo nuevo usuario
const openNewUserDialog = () => {
  editedUser.id = null;
  editedUser.name = '';
  editedUser.email = '';
  editedUser.password = '';
  isEditing.value = false;
  userDialog.value = true;
};

// Editar usuario
const editUser = (user) => {
  editedUser.id = user.id;
  editedUser.name = user.name;
  editedUser.email = user.email;
  editedUser.password = '';
  isEditing.value = true;
  userDialog.value = true;
};

// Confirmar eliminación
const confirmDelete = (user) => {
  editedUser.id = user.id;
  editedUser.name = user.name;
  deleteDialog.value = true;
};

// Cerrar diálogo
const closeDialog = () => {
  userDialog.value = false;
  v$.value.$reset();
};

// Guardar usuario
const saveUser = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  saving.value = true;
  try {
    if (isEditing.value) {
      const updatedUser = new User(editedUser.id, editedUser.name, editedUser.email, editedUser.password, editedUser.role);
      await updateUserService(editedUser.id, updatedUser);
      const index = users.value.findIndex(u => u.id === editedUser.id);
      users.value[index] = {...editedUser};
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario actualizado correctamente',
        life: 3000
      });
    } else {
      const newUser = new User('', editedUser.name, editedUser.email, editedUser.password, 'user');
      await createUserService(newUser);
      users.value.push({
        ...editedUser,
        id: users.value.length + 1
      });
      toast.add({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Usuario creado correctamente',
        life: 3000
      });
    }

    userDialog.value = false;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo guardar el usuario',
      life: 3000
    });
  } finally {
    saving.value = false;
  }
};

// Eliminar usuario
const deleteUser = async () => {
  deleting.value = true;
  try {
    // Simulando llamada a API
    await deleteUserService(editedUser.id);

    users.value = users.value.filter(u => u.id !== editedUser.id);
    deleteDialog.value = false;
    toast.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Usuario eliminado correctamente',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo eliminar el usuario',
      life: 3000
    });
  } finally {
    deleting.value = false;
  }
};

// Obtener iniciales del nombre
const getInitials = (name) => {
  return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
};

// Cargar datos al montar
onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.admin-users-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.header-actions h2 {
  margin: 0;
  color: #263238;
  font-size: 1.5rem;
}

/* Estilos de la tabla */
:deep(.admin-table) {
  margin-bottom: 1rem;
}

.user-name-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar-small {
  width: 32px;
  height: 32px;
  background-color: #3F51B5;
  color: white;
  font-size: 0.875rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

/* Estilos del formulario en diálogo */
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0.5rem 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #455A64;
}

.disabled-input {
  background-color: #ECEFF1;
  color: #607D8B;
}

/* Estilos para el diálogo de confirmación */
.confirmation-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}

.confirmation-content i {
  font-size: 2rem;
  color: #FF9800;
}

/* Estilos de los botones */
:deep(.p-button-primary) {
  background-color: #3F51B5;
  border-color: #3F51B5;
}

:deep(.p-button-primary:hover) {
  background-color: #303F9F;
  border-color: #303F9F;
}

:deep(.p-button-danger) {
  background-color: #D32F2F;
  border-color: #D32F2F;
}

:deep(.p-button-danger:hover) {
  background-color: #C62828;
  border-color: #C62828;
}

:deep(.p-button-secondary) {
  color: #455A64;
}

:deep(.p-tag) {
  background-color: #3F51B5;
}

/* Responsive */
@media (max-width: 768px) {
  .header-actions {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .action-buttons {
    justify-content: flex-start;
  }
}
</style>