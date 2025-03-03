<template>
  <ConfirmDialog/>
  <Dialog/>
  <Toast/>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>


<script setup>

</script>

