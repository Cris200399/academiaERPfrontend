<script setup>

import {ref} from "vue";
import {paymentTypesOptions} from "@/constants/paymentTypesOptions";

const group = ref();

const selectedCities = ref();
const cities = ref([
  {name: 'New York', code: 'NY'},
  {name: 'Rome', code: 'RM'},
  {name: 'London', code: 'LDN'},
  {name: 'Istanbul', code: 'IST'},
  {name: 'Paris', code: 'PRS'}
]);

</script>

<template>
  <div class="card mx-2">

    <div class="layout mx-2">
      <h1 class="text-6xl mb-10">Crear Pago</h1>
      <h2 class="text-4xl mb-8">Tipo de Pago</h2>
      <div class="flex mt-4 flex-wrap gap-4">
        <div v-for="paymentTypeOption in paymentTypesOptions" :key="paymentTypeOption.name"
             class="flex items-center gap-2">
          <RadioButton v-model="group" :inputId="paymentTypeOption.name" :name="paymentTypeOption.name"
                       :value="paymentTypeOption.value"/>
          <label class="text-xl" :for="paymentTypeOption.name">{{ paymentTypeOption.name }}</label>
        </div>
      </div>

      <div class="mt-8">
        <div v-if="group==='grupal'">
          <h2 class="text-4xl mb-4">Seleccionar el grupo</h2>
          <MultiSelect :selection-limit="1" v-model="selectedCities" :options="cities" optionLabel="name" filter
                       placeholder="Select Cities"
                       :maxSelectedLabels="3" class="w-full md:w-80"/>
        </div>
        <div v-if="group==='particular'">
          <h2 class="text-4xl mb-4">Seleccionar al alumno</h2>
          <MultiSelect :selection-limit="1" v-model="selectedCities" :options="cities" optionLabel="name" filter
                       placeholder="Select Cities"
                       :maxSelectedLabels="3" class="w-full md:w-80"/>
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
</style>