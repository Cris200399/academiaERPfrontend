<template>
  <div class="card p-6 bg-white shadow-md rounded-lg ml-2">
    <div class="flex justify-between items-center">
      <div>
        <div class="text-4xl font-bold text-center">
          {{ groups.length }}
        </div>
        <div class="text-xl font-semibold mt-2">
          Total de Grupos
        </div>
      </div>
      <div class="flex items-end justify-center">
        <AddGroupDialog/>
      </div>
    </div>
  </div>
  <div class="mt-0 ml-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 p-2">

      <GroupCard v-for="group in groups" :key="group.id" :group="group"/>

    </div>
  </div>
</template>

<script setup>
import GroupCard from "@/components/groups/GroupCard.vue";

import {getGroups} from "@/services/groupService";

import {onMounted, ref} from "vue";

import Group from "@/models/group";
import AddGroupDialog from "@/components/groups/AddGroupDialog.vue";

const groups = ref([]);

onMounted(async () => {
  const groupsResponseData = await getGroups();
  groupsResponseData.map(group => {
    groups.value.push(
        new Group({
          id: group._id,
          name: group.name,
          description: group.description,
          members: group.members,
          daysOfWeek: group.daysOfWeek,
          maxMembers: group.maxMembers,
          schedule: group.schedule,
        })
    )
  });
});


</script>

<style scoped>

</style>
