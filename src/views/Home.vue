<template>
  <div>
    <h1>¡Hola, {{ nombre }}!</h1>
    <button @click="saludar">Saludar</button>
  </div>
</template>

<script setup>
import ProfileDialog from "@/components/students/ProfileStudentDialog.vue";

const nombre = "Mundo";

function saludar() {
  alert(`Hola, ${nombre}!`);
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
  