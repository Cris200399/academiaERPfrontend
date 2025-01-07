<template>
  <div>
    <h1>¡Hola, {{ nombre }}!</h1>
    <button @click="saludar">Saludar</button>
  </div>
</template>

<script>
export default {
  name: "ClasesView",
  data() {
    return {
      nombre: "Clases",
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