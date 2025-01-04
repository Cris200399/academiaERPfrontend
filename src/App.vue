<template>
  <div class="app-container flex">
    <SideBar class="sidebar"/>
    <div class="content-container flex-grow">
      <router-view />
    </div>
  </div>

</template>

<script setup>

</script>

<style>
.app-container {
  height: 100vh;
}
.sidebar {
  width: 15vw;
  color: white;
}
.content-container {
  width: 85vw;
  background-color: #f4f4f4;
}
</style>