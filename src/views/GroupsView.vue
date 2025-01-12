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
        <AddGroupDialog @groupAdded="handleGroupAdded"/>
      </div>
    </div>
  </div>
  <div class="mt-0 ml-2">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 p-2">

      <GroupCard
          @group-deleted="handleGroupDeleted"
          @groupUpdated="handleGroupUpdated"
          v-for="group in groups" :key="group.id" :group="group"/>

    </div>
  </div>
</template>

<script setup>
import GroupCard from "@/components/groups/GroupCard.vue";

import {getGroupsService} from "@/services/groupService";

import {onMounted, ref} from "vue";

import Group from "@/models/group";
import AddGroupDialog from "@/components/groups/AddGroupDialog.vue";

const groups = ref([]);

onMounted(async () => {
  const groupsResponseData = await getGroupsService();
  groupsResponseData.map(group => {
    groups.value.push(
        new Group(group)
    )
  });
});

const handleGroupAdded = (group) => {
  groups.value.push(new Group(
      group
  ));
}

const handleGroupDeleted = (id) => {
  groups.value = groups.value.filter(group => group.id !== id);
}

const handleGroupUpdated = (group) => {
  const index = groups.value.findIndex(g => g.id === group.id);
  groups.value[index] = group;
}


</script>

<style scoped>

</style>
