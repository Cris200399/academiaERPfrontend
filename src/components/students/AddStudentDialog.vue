<template>
  <Button icon="pi pi-plus" class="text-lg" severity="success" label="Agregar Alumno" @click="visible = true"/>

  <Dialog v-model:visible="visible" modal header="Agregar Alumno" class="w-[700px]" @hide="resetForm">
    <Divider class="bg-[#E2E6F9] h-1 my-4"/>

    <div class="grid grid-cols-2 gap-4">
      <!-- First Name -->
      <div class="flex flex-col justify-center">
        <FloatLabel variant="on" class="input-size">
          <InputText
              v-model="formData.name"
              size="large"
              class="input-size"
              :class="{'p-invalid': errors.name}"
              @blur="validateField('name')"
          />
          <label class="justify-center mb-5" for="on_label">Nombre</label>
        </FloatLabel>
        <small class="p-error" v-if="errors.name">{{ errors.name }}</small>
      </div>

      <!-- Last Name -->
      <div class="flex flex-col justify-center ">
        <FloatLabel variant="on" class="input-size">
          <InputText
              v-model="formData.lastName"
              size="large"
              class="input-size"
              :class="{'p-invalid': errors.lastName}"
              @blur="validateField('lastName')"
          />
          <label class="justify-center mb-5" for="on_label">Apellido</label>
        </FloatLabel>
        <small class="p-error" v-if="errors.lastName">{{ errors.lastName }}</small>
      </div>

      <!-- Address -->
      <div class="flex flex-col justify-center">
        <FloatLabel variant="on" class="input-size">
          <InputText
              v-model="formData.address"
              size="large"
              class="input-size"
              :class="{'p-invalid': errors.address}"
              @blur="validateField('address')"
          />
          <label class="justify-center mb-5" for="on_label">Dirección</label>
        </FloatLabel>
        <small class="p-error" v-if="errors.address">{{ errors.address }}</small>
      </div>

      <!-- Email -->
      <div class="flex flex-col justify-center ">
        <FloatLabel variant="on" class="input-size">
          <InputText
              v-model="formData.email"
              size="large"
              class="input-size"
              :class="{'p-invalid': errors.email}"
              @blur="validateField('email')"
          />
          <label class="justify-center mb-5" for="on_label">Correo Electrónico</label>
        </FloatLabel>
        <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
      </div>

      <!-- Gender -->
      <div class="flex flex-col justify-center ">
        <Select
            v-model="formData.gender"
            :options="genderOptions"
            optionLabel="name"
            placeholder="Género"
            class="input-size"
            :class="{'p-invalid': errors.gender}"
            @blur="validateField('gender')"
        />
        <small class="p-error" v-if="errors.gender">{{ errors.gender }}</small>
      </div>

      <!-- Date of Birth -->
      <div class="flex flex-col justify-center">
        <FloatLabel variant="on" class="input-size">
          <DatePicker
              v-model="formData.dateOfBirth"
              inputId="on_label"
              showIcon
              iconDisplay="input"
              class="input-size"
              :class="{'p-invalid': errors.dateOfBirth}"
              @blur="validateField('dateOfBirth')"
              :maxDate="new Date()"
          />
          <label for="on_label">Fecha de Nacimiento</label>
        </FloatLabel>
        <small class="p-error" v-if="errors.dateOfBirth">{{ errors.dateOfBirth }}</small>
      </div>

      <!-- Phone -->
      <div class="flex flex-col justify-center ">
        <FloatLabel variant="on" class="input-size">
          <InputMask
              id="phone"
              v-model="formData.phone"
              mask="999 999 999"
              fluid
              :class="{'p-invalid': errors.phone}"
              @blur="validateField('phone')"
          />
          <label for="on_label">Teléfono</label>
        </FloatLabel>
        <small class="p-error" v-if="errors.phone">{{ errors.phone }}</small>
      </div>

      <!-- Group -->
      <div class="flex flex-col justify-center">
        <Select
            v-model="formData.group"
            :options="groupOptions"
            optionLabel="name"
            placeholder="Grupo"
            class="input-size"
            :class="{'p-invalid': errors.group}"
            @blur="validateField('group')"
        />
        <small class="p-error" v-if="errors.group">{{ errors.group }}</small>
      </div>

      <!-- DNI -->
      <div class="flex flex-col justify-center ">
        <FloatLabel variant="on" class="input-size">
          <InputText
              v-model="formData.dni"
              size="large"
              class="input-size"
              :class="{'p-invalid': errors.dni}"
              @blur="validateField('dni')"
          />
          <label class="justify-center mb-5" for="on_label">DNI</label>
        </FloatLabel>
        <small class="p-error" v-if="errors.dni">{{ errors.dni }}</small>
      </div>
    </div>

    <!-- Apoderado Section - Shown only if student is under 18 -->
    <div v-if="isUnderAge" class="mt-4">
      <Divider align="center">
        <span class="text-base font-bold">Datos del Apoderado</span>
      </Divider>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-wrap justify-center items-center">
          <FloatLabel variant="on" class="input-size">
            <InputText
                v-model="formData.guardian.name"
                size="large"
                class="input-size"
                :class="{'p-invalid': errors.guardianName}"
                @blur="validateField('guardianName')"
            />
            <label class="justify-center mb-5">Nombre del Apoderado</label>
          </FloatLabel>
          <small class="p-error" v-if="errors.guardianName">{{ errors.guardianName }}</small>
        </div>

        <div class="flex flex-wrap justify-center items-center">
          <FloatLabel variant="on" class="input-size">
            <InputText
                v-model="formData.guardian.phone"
                size="large"
                class="input-size"
                :class="{'p-invalid': errors.guardianPhone}"
                @blur="validateField('guardianPhone')"
            />
            <label class="justify-center mb-5">Teléfono del Apoderado</label>
          </FloatLabel>
          <small class="p-error" v-if="errors.guardianPhone">{{ errors.guardianPhone }}</small>
        </div>

        <div class="flex flex-wrap justify-center items-center col-span-2">
          <FloatLabel variant="on" class="input-size">
            <InputText
                v-model="formData.guardian.relationship"
                size="large"
                class="input-size"
                :class="{'p-invalid': errors.guardianRelationship}"
                @blur="validateField('guardianRelationship')"
            />
            <label class="justify-center mb-5">Relación con el Alumno</label>
          </FloatLabel>
          <small class="p-error" v-if="errors.guardianRelationship">{{ errors.guardianRelationship }}</small>
        </div>
      </div>
    </div>

    <div class="flex justify-center gap-5 mt-6">
      <Button
          type="button"
          label="Cancelar"
          severity="info"
          variant="outlined"
          raised
          @click="visible = false"
          class="w-1/3"
      />
      <Button
          type="button"
          label="Crear"
          severity="info"
          raised
          class="w-1/3"
          @click="handleSubmit"
          :disabled="!isFormValid"
      />
    </div>
  </Dialog>
</template>

<script setup>
import {ref, reactive, computed, watch, onMounted, defineEmits} from 'vue';
import Select from 'primevue/select';
import {useToast} from "primevue/usetoast";
import {createStudentService} from "@/services/studentService";
import Student from "/src/models/student.js";
import {getGroupsService} from "@/services/groupService";

import FloatLabel from 'primevue/floatlabel';
import DatePicker from 'primevue/datepicker';

const toast = useToast();
const visible = ref(false);

const emit = defineEmits(['studentAdded']);

const formData = reactive({
  name: '',
  lastName: '',
  address: '',
  email: '',
  gender: null,
  dateOfBirth: null,
  phone: '',
  group: null,
  dni: '',
  guardian: {
    name: '',
    phone: '',
    relationship: ''
  }
});

const errors = reactive({
  name: '',
  lastName: '',
  address: '',
  email: '',
  gender: '',
  dateOfBirth: '',
  phone: '',
  group: '',
  dni: '',
  guardianName: '',
  guardianPhone: '',
  guardianRelationship: ''
});

const genderOptions = ref([
  {name: 'Masculino', value: 'male'},
  {name: 'Femenino', value: 'female'},
  {name: 'Otro', value: 'other'}
]);

const groupOptions = ref([]);

onMounted(async () => {
  const groups = await getGroupsService();
  groupOptions.value = groups.map(group => ({name: group.name, id: group._id}));
});

// Computed property to check if student is under 18
const isUnderAge = computed(() => {
  if (!formData.dateOfBirth) return false;
  const birthDate = new Date(formData.dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age < 18;
});

// Validation functions
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateDNI = (dni) => {
  return /^[0-9]{8}$/.test(dni);
};

const validatePhone = (phone) => {
  return phone.replace(/\s/g, '').length === 9;
};

const validateField = (field) => {
  errors[field] = '';

  switch (field) {
    case 'name':
    case 'lastName':
      if (!formData[field]) errors[field] = `El ${field === 'name' ? 'nombre' : 'apellido'} es requerido`;
      else if (formData[field].length < 2) errors[field] = `El ${field === 'name' ? 'nombre' : 'apellido'} debe tener al menos 2 caracteres`;
      break;

    case 'email':
      if (!formData.email) errors.email = 'El email es requerido';
      else if (!validateEmail(formData.email)) errors.email = 'Email inválido';
      break;

    case 'dni':
      if (!formData.dni) errors.dni = 'El DNI es requerido';
      else if (!validateDNI(formData.dni)) errors.dni = 'DNI inválido';
      break;

    case 'phone':
      if (!formData.phone) errors.phone = 'El teléfono es requerido';
      else if (!validatePhone(formData.phone)) errors.phone = 'Teléfono inválido';
      break;

    case 'dateOfBirth':
      if (!formData.dateOfBirth) errors.dateOfBirth = 'La fecha de nacimiento es requerida';
      break;

    case 'gender':
      if (!formData.gender) errors.gender = 'El género es requerido';
      break;

    case 'group':
      if (!formData.group) errors.group = 'El grupo es requerido';
      break;

      // Guardian validations
    case 'guardianName':
      if (isUnderAge.value && !formData.guardian.name) {
        errors.guardianName = 'El nombre del apoderado es requerido';
      }
      break;

    case 'guardianPhone':
      if (isUnderAge.value && !formData.guardian.phone) {
        errors.guardianPhone = 'El teléfono del apoderado es requerido';
      }
      break;

    case 'guardianRelationship':
      if (isUnderAge.value && !formData.guardian.relationship) {
        errors.guardianRelationship = 'La relación con el apoderado es requerida';
      }
      break;
  }
};

// Validate all fields
const validateForm = () => {
  const fields = ['name', 'lastName', 'email', 'dni', 'phone', 'dateOfBirth', 'gender', 'group'];
  fields.forEach(validateField);

  if (isUnderAge.value) {
    validateField('guardianName');
    validateField('guardianPhone');
    validateField('guardianRelationship');
  }
};

// Check if form is valid
const isFormValid = computed(() => {
  const hasErrors = Object.values(errors).some(error => error !== '');
  const requiredFields = ['name', 'lastName', 'email', 'dni', 'phone', 'dateOfBirth', 'gender', 'group'];
  const hasAllFields = requiredFields.every(field => formData[field]);

  if (isUnderAge.value) {
    const hasGuardianInfo = formData.guardian.name && formData.guardian.phone && formData.guardian.relationship;
    return !hasErrors && hasAllFields && hasGuardianInfo;
  }

  return !hasErrors && hasAllFields;
});

// Reset form
const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (key === 'guardian') {
      formData.guardian = {
        name: '',
        phone: '',
        relationship: ''
      };
    } else {
      formData[key] = '';
    }
  });
  Object.keys(errors).forEach(key => errors[key] = '');
};

// Watch for changes in dateOfBirth to validate guardian info if needed
watch(() => formData.dateOfBirth, () => {
  if (isUnderAge.value) {
    validateField('guardianName');
    validateField('guardianPhone');
    validateField('guardianRelationship');
  } else {
    clearGuardianErrors();
  }
});

// Function to clear guardian errors
const clearGuardianErrors = () => {
  errors.guardianName = '';
  errors.guardianPhone = '';
  errors.guardianRelationship = '';
};

// Handle form submission
const handleSubmit = async () => {
  validateForm();

  if (isFormValid.value) {
    const newStudent = new Student({
      name: formData.name,
      lastName: formData.lastName,
      address: formData.address,
      email: formData.email,
      gender: formData.gender.value,
      dateOfBirth: formData.dateOfBirth,
      phone: formData.phone,
      group: formData.group.id,
      dni: formData.dni
    });
    try {
      const newStudentAdded = await createStudentService(newStudent);
      toast.add({severity: 'success', summary: 'Éxito', detail: 'Alumno creado exitosamente', life: 2500});
      emit('studentAdded', newStudentAdded);
      visible.value = false;
      resetForm();
    } catch (error) {
      toast.add({severity: 'error', summary: 'Error', detail: 'Hubo un error al crear el alumno', life: 2500});
    }
  }
};
</script>

<style scoped>
.p-error {
  color: red;
  margin-left: 5px;
  margin-top: 3px;
}

.input-size {
  width: 100%;
}
</style>