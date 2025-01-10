<template>
  <div>
      <h1>¡Hola, {{ nombre }}!</h1>
      <button @click="saludar">Saludar</button>
    </div>
  <ProfileDialog/>
  </template>
  
  <script>
  import ProfileDialog from "@/components/students/ProfileDialog.vue";

  export default {
    name: "HomeView",
    components: {ProfileDialog},
    data() {
      return {
        nombre: "Mundo",
      };
    },
    methods: {
      saludar() {
        alert(`Hola, ${this.nombre}!`);
      },
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: blue;
  }
  </style>
  