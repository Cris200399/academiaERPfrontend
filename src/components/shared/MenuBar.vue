<script setup>
import { ref } from 'vue';
import MenuBar from 'primevue/menubar';
import 'primeicons/primeicons.css';

const items = ref([
    {
        label: 'Inicio',
        icon: 'pi pi-home',
        to: '/'
    },
    {
        label: 'Clases',
        icon: 'pi pi-star',
        to: '/clases'
    },
    {
        label: 'Alumnos',
        icon: 'pi pi-users',
        to: '/alumnos'
    },
    {
        label: 'Promociones',
        icon: 'pi pi-tags',
        to: '/promociones'
    },
    {
        label: 'Calendario',
        icon: 'pi pi-calendar',
        to: '/calendario'
    }
]);
</script>

<template>
    <div class="card menubar-container">
        <MenuBar :model="items">
            <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                </a>
            </template>
        </MenuBar>
    </div>
    <router-view />
</template>

<style scoped>
</style>