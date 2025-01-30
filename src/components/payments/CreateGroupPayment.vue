<script setup>

import {onMounted, ref} from "vue";
import {getGroupsService, getGroupWithStudentsService} from "@/services/groupService";
import Group from "@/models/group";
import DatePicker from "primevue/datepicker";

import Student from "@/models/student";
import {paymentMethodsOptions} from "@/constants/paymentMethodsOptions";
import {paymentTypesOptions} from "@/constants/paymentTypesOptions";
import {paymentStatusOptions} from "@/constants/paymentStatusOptions";

const groups = ref([]);
const selectedGroup = ref();

const selectedStudent = ref();
const students = ref([]);

const amount = ref();

const paymentMethods = ref([]);
const dates = ref();
const paymentStatus = ref();
onMounted(async () => {
  await getGroupsService().then(groupsResponseData => {
    groupsResponseData.map(group => {
      groups.value.push(
          new Group(group)
      )
    });
  });
});

async function onChangeGroup() {
  students.value = [];
  if (selectedGroup.value && selectedGroup.value.length === 1) {
    await getGroupWithStudentsService(selectedGroup.value[0]).then(studentsResponseData => {
      studentsResponseData.members.map(student => {
        students.value.push(
            new Student(student)
        )
      });
    });
  }
}

function togglePaymentMethods(paymentOption) {
  const index = paymentMethods.value.findIndex(p => p.value === paymentOption.value);
  if (index === -1) { // if not found
    paymentMethods.value.push(paymentOption);
  } else {
    paymentMethods.value.splice(index, 1);
  }
}

function onSubmit() {
  alert('Submit');
}


</script>

<template>
  <div class="card mx-2">

    <div class="layout mx-2">
      <h1 class="text-6xl font-bold mb-10">Crear Pago Grupal</h1>
      <div class="mt-4">
        <h2 class="text-4xl font-semibold mb-4">Seleccionar el grupo</h2>
        <MultiSelect option-value="id" :selection-limit="1" v-model="selectedGroup" :options="groups" optionLabel="name"
                     @change="onChangeGroup"
                     filter
                     placeholder="Seleccionar grupo"
                     :maxSelectedLabels="3" class="w-full md:w-80">
        </MultiSelect>
      </div>
      <div v-if=" selectedGroup && selectedGroup.length === 1" class="mt-4">
        <h2 class="text-4xl font-semibold mb-4">Seleccionar el estudiante</h2>
        <MultiSelect option-value="id" :selection-limit="1" v-model="selectedStudent" :options="students"
                     optionLabel="name"
                     filter
                     placeholder="Seleccionar estudiante"
                     :maxSelectedLabels="3" class="w-full md:w-80">
          <template #option="slotProps">
            <div class="flex items center gap-2">
              <div>{{ slotProps.option.getFullName() }}</div>
            </div>
          </template>
        </MultiSelect>

        <div v-if="selectedStudent && selectedStudent.length === 1" class="mt-4">
          <h2 class="text-4xl font-semibold mb-4">Monto</h2>
          <div class="display-width">
            <InputNumber v-model="amount" inputId="currency-peru" mode="currency" currency="PEN" locale="es-PE" fluid/>
          </div>
          <div>
            <div class="my-6">
              <label class="block text-4xl font-semibold mb-4">Método(s) de pago</label>
              <div class="flex flex-wrap gap-2">
                <button
                    v-for="paymentOption in paymentMethodsOptions"
                    :key="paymentOption.value"
                    type="button"
                    :class="['px-4 py-2 rounded-full', paymentMethods.includes(paymentOption) ? 'bg-black text-white' : 'bg-gray-100 text-gray-800']"
                    @click="togglePaymentMethods(paymentOption)">
                  {{ paymentOption.name }}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div class="my-6">
              <label class="block text-4xl font-semibold mb-4">Fecha Inicio-Fin</label>
            </div>
            <div class="display-width">
              <DatePicker v-model="dates" selectionMode="range" fluid show-icon :manualInput="true" show-button-bar/>
            </div>
          </div>
          <div>
            <div class="my-6">
              <label class="block text-4xl font-semibold mb-4">Detalle</label>
              <Textarea auto-resize class="w-2/4 p-3 rounded-lg border border-gray-200"
                        placeholder="Agregar algun detalle"/>
            </div>
          </div>
          <div class="mb-4">
            <h2 class="text-4xl font-semibold mb-4">Estado de pago</h2>
            <div class="flex flex-wrap gap-4">
              <div v-for="paymentStatusOption in paymentStatusOptions" :key="paymentStatusOption.value"
                   class="flex items-center gap-2">
                <RadioButton v-model="paymentStatus" :inputId="paymentStatusOption.name"
                             :name="paymentStatusOption.name"
                             variant="filled"
                             :value="paymentStatusOption.value"/>
                <label class="text-xl" :for="paymentStatusOption.name">{{ paymentStatusOption.name }}</label>
              </div>
            </div>
          </div>
          <div class="mb-4 flex justify-center">
            <Button label="Crear Pago" variant="outlined" class="w-2/4 text-3xl" icon="pi pi-check" @click="onSubmit"
                    iconPos="left" severity="success" style="font-size: 1.5rem"/>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.layout {
  max-width: 1200px;
  margin: 1rem auto;
}

.display-width {
  max-width: 300px;
}
</style>