<template>
    <div>
      <h1>¡Hola, {{ nombre }}!</h1>
      <button @click="saludar">Saludar</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeView",
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
  