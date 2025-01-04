<template>
  <Button icon="pi pi-plus" class="text-lg" severity="success" label="Create Student" @click="visible = true"/>
  <Toast/>

  <Dialog v-model:visible="visible" modal header="Create Student" class="w-[700px]">
    <Divider class="bg-[#E2E6F9] h-1 my-4"/>

    <div class="grid grid-cols-2 gap-4">
      <!-- First Name & Last Name -->

      <div class="flex flex-wrap justify-center items-center">
        <FloatLabel variant="on" class="input-size">
          <InputText v-model="formData.name" size="large" class="input-size"/>
          <label class="justify-center mb-5" for="on_label">Nombre</label>
        </FloatLabel>
      </div>


      <div class="flex flex-wrap justify-center items-center">
        <FloatLabel variant="on" class="input-size">
          <InputText v-model="formData.lastName" size="large" class="input-size"/>
          <label class="justify-center mb-5" for="on_label">Apellido</label>
        </FloatLabel>
      </div>

      <!-- Address & Email -->
      <div class="flex flex-wrap justify-center items-center">
        <FloatLabel variant="on" class="input-size">
          <InputText v-model="formData.address" size="large" class="input-size"/>
          <label class="justify-center mb-5" for="on_label">Dirección</label>
        </FloatLabel>
      </div>

      <div class="flex flex-wrap justify-center items-center ">
        <FloatLabel variant="on" class="input-size">
          <InputText v-model="formData.email" size="large" class="input-size"/>
          <label class="justify-center mb-5" for="on_label">Correo Electrónico</label>
        </FloatLabel>
      </div>

      <!-- Gender & Date of Birth -->

      <div class="flex justify-center items-center">
        <Select v-model="formData.gender" :options="genderOptions" optionLabel="name" placeholder="Género"
                class="input-size"/>
      </div>

      <FloatLabel variant="on" class="input-size">
        <DatePicker v-model="formData.dateOfBirth" inputId="on_label" showIcon iconDisplay="input" class="input-size"/>
        <label for="on_label">Fecha de Nacimiento</label>
      </FloatLabel>

      <!-- Phone -->

      <div class="flex flex-wrap justify-center items-center ">
        <FloatLabel variant="on" class="input-size">
          <InputMask id="phone" v-model="formData.phone" mask="999 999 999" fluid/>
          <label for="on_label">Phone</label>
        </FloatLabel>
      </div>

      <!-- Group -->
      <div class="flex flex-wrap justify-center items-center">
        <Select v-model="formData.group" :options="groupOptions" optionLabel="name" placeholder="Grupo"
                class="input-size"/>
      </div>

      <div class="flex flex-wrap justify-center items-center">
        <FloatLabel variant="on" class="input-size">
          <InputText v-model="formData.dni" size="large" class="input-size
          "/>
          <label class="justify-center mb-5" for="on_label">DNI</label>
        </FloatLabel>
      </div>

    </div>

    <div class="flex justify-center gap-5 mt-6">
      <Button
          type="button"
          label="Cancel"
          severity="info"
          variant="outlined"
          raised
          @click="visible = false"
          class="w-1/3"
      />
      <Button
          type="button"
          label="Create"
          severity="info"
          raised
          class="w-1/3"
          @click="handleSubmit"
      />
    </div>
  </Dialog>
</template>

<script setup>
import {ref, reactive} from 'vue';

import Select from 'primevue/select';
import {useToast} from "primevue/usetoast";

import {addStudent} from "@/services/studentService";

import Student from "/src/models/student.js";

const toast = useToast();


const visible = ref(false);

const formData = reactive({
  name: '',
  lastName: '',
  address: '',
  email: '',
  gender: null,
  dateOfBirth: null,
  phone: '',
  group: null,
  dni: ''
});

const genderOptions = ref([
  {name: 'Masculino', value: 'male'},
  {name: 'Femenino', value: 'female'},
  {name: 'Otro', value: 'other'}
]);


const groupOptions = [
  {name: 'Group 1', value: 'group1'},
  {name: 'Group 2', value: 'group2'}
];

const handleSubmit = async () => {
      try {
        const newStudent = new Student({
          name: formData.name,
          lastName: formData.lastName,
          address: formData.address,
          email: formData.email,
          gender: formData.gender.value,
          dateOfBirth: formData.dateOfBirth,
          phone: formData.phone,
          // group: formData.group.value
          group: '6776ee4ff459d4d77ce8acf9',
          dni: formData.dni
        });

        await addStudent(newStudent);
        toast.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: `El estudiante fue agregado correctamente`,
          life: 2500
        });
        visible.value = false;
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al agregar el estudiante',
          life: 2500
        });
      }

    }
;

</script>

<style scoped>
.input-size {
  width: 100%;
}
</style>