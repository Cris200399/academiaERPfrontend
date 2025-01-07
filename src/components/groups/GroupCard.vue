<template>
  <Card style="width: 25rem; overflow: hidden; position: relative;">
    <template #title> {{ group.name }}
      <GroupMenu @group-deleted="handleGroupDeleted" :id="group.id" class="absolute top-5 right-5 cursor-pointer"/>
    </template>
    <template #subtitle>
      {{ group.description }}
    </template>
    <template #content>
      <div class="flex-wrap">
        <div class="flex gap-2 justify-end">
          <span class="font-semibold">{{ `${totalStudents}/${maxStudents}` }}</span>
        </div>
        <ProgressBar :value="progressValue" class="custom-progress-bar">
        </ProgressBar>
      </div>
    </template>
  </Card>
</template>

<script setup>
import GroupMenu from "@/components/groups/GroupMenu.vue";
import {ref, defineProps, onMounted} from "vue";
import Group from "@/models/group";

const props = defineProps({
  group: Group
});

const emit = defineEmits(['groupDeleted']);


onMounted(() => {
  totalStudents.value = props.group.members.length;
  maxStudents.value = props.group.maxMembers;
  progressValue.value = Math.round((totalStudents.value / maxStudents.value) * 100);
});
const totalStudents = ref(25);
const maxStudents = ref(30);
const progressValue = ref(60);
progressValue.value = Math.round((totalStudents.value / maxStudents.value) * 100);


function handleGroupDeleted(id) {
  emit('groupDeleted', id);
}
</script>

<style scoped>

</style>
