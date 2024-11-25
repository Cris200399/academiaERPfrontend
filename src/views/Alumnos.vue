<template>
    <div class="alumnos">
        <h1>Lista de Alumnos</h1>
        <ul>
            <li v-for="alumno in alumnos" :key="alumno.id">{{ alumno.nombre }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AlumnosView',
    data() {
        return {
            alumnos: [
                { id: 1, nombre: 'Juan Perez' },
                { id: 2, nombre: 'Maria Gomez' },
                { id: 3, nombre: 'Carlos Sanchez' }
            ]
        };
    }
};
</script>

<style scoped>
.alumnos {
    padding: 20px;
}

h1 {
    color: #333;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background: #f9f9f9;
    margin: 5px 0;
    padding: 10px;
    border: 1px solid #ddd;
}
</style>