<script setup>
import {ref, onMounted} from "vue";

import Group from "@/models/group";
import RowAssistanceStudent from "@/components/assistance/RowAssistanceStudent.vue";
import GridAssistanceStudent from "@/components/assistance/GridAssistanceStudent.vue";
import Student from "@/models/student";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
      group: {
        type: Group,
        required: true
      }
    }
)

const students = ref([]);
const layout = ref('grid');
const options = ref(['list', 'grid']);

onMounted(() => {

  props.group.members.forEach((student) => {
    students.value.push(new Student(student));
  });

});


</script>

<template>
  <DataView :value="students" :layout="layout">
    <template #header>
      <div class="flex justify-end">
        <SelectButton v-model="layout" :options="options" :allowEmpty="false">
          <template #option="{ option }">
            <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table']"/>
          </template>
        </SelectButton>
      </div>
    </template>

    <template #list="slotProps">
      <div class="flex flex-col ">
        <div v-for="(student, index) in slotProps.items" :key="index">
          <RowAssistanceStudent :groupId="group.id" :student="student"/>
        </div>
      </div>
    </template>

    <template #grid="slotProps">
      <div class="grid grid-cols-12 gap-4">
        <div v-for="(student, index) in slotProps.items" :key="index"
             class="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 p-2">
          <GridAssistanceStudent :groupId="group.id" :student="student"/>
        </div>
      </div>
    </template>
  </DataView>
</template>

<style scoped>
</style>

