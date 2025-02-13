<template>
  <Card style="width: 24rem; overflow: hidden; position: relative; min-height: 200px;">
    <template #title> {{ group.name }}
      <GroupMenu @group-deleted="handleGroupDeleted"
                 @groupUpdated="handleGroupUpdated"

                 :id="group.id" :groupData="group"/>
    </template>
    <template #subtitle>
      {{ group.description }}
    </template>
    <template #content>
      <div class="flex-wrap">
        <!-- Contenedor para días y hora -->
        <div class="flex justify-between items-center mb-2">
          <!-- Contenedor de días -->
          <div class="flex flex-wrap gap-1">
            <div v-for="day in group.daysOfWeek" :key="day" class="day-oval">
              {{ day }}
            </div>
          </div>
          <!-- Hora -->
          <div>
            <span class="font-semibold whitespace-nowrap">{{ group.schedule }}</span>
          </div>
        </div>
        <!-- Contador de estudiantes -->
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
import {ref, onMounted} from "vue";
import Group from "@/models/group";

// eslint-disable-next-line no-undef
const props = defineProps({
  group: Group
});

// eslint-disable-next-line no-undef
const emit = defineEmits(['groupDeleted', 'groupUpdated']);


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

function handleGroupUpdated(group) {
  emit('groupUpdated', group);
}
</script>

<style scoped>
.day-oval {
  font-size: 0.8rem;
  display: inline-block;
  padding: 3px 10px;
  margin: 3px;
  border-radius: 15px;
  background-color: #f0f0f0;
  text-align: center;
}
</style>
