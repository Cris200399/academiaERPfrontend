<template>
  <ActiveUserComponent/>
  <Divider/>
  <AdminsComponent v-if="isSuperuserOrAdmin"/>
  <Divider/>
  <UsersComponent v-if="isSuperuserOrAdmin"/>
</template>

<script setup>
import {computed} from 'vue';
import ActiveUserComponent from "@/components/config/ActiveUserComponent.vue";
import AdminsComponent from "@/components/config/AdminsComponent.vue";
import {useUserStore} from "@/stores/userStore";
import UsersComponent from "@/components/config/UsersComponent.vue";


const store = useUserStore();
const userRole = computed(() => store.user.role);

const isSuperuserOrAdmin = computed(() => {
  return userRole.value === 'superuser' || userRole.value === 'admin';
});
</script>