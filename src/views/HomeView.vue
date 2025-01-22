<template>
  <div>
    <h1>¡Hola, {{ nombre }}!</h1>
    <button @click="saludar">Saludar</button>
  </div>

  <div class="card flex flex-wrap justify-center items-end gap-4">
    <FloatLabel variant="on">
      <DatePicker :manual-input="true" date-format="dd/mm/yy" v-model="value3" inputId="on_label" showIcon/>
    </FloatLabel>

    <h1>{{value3}}</h1>
  </div>
</template>

<script setup>

import {ref} from "vue";

const nombre = "Mundo";

const value3 = ref();

function saludar() {
  alert(`Hola, ${nombre}!`);
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
  