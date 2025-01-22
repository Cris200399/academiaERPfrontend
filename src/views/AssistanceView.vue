<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import StudentAssistance from "@/components/assistance/TableStudentAssistance.vue";
import {getGroupInProgressService} from "@/services/groupService";
import Group from "@/models/group";

const currentTime = ref(new Date().toLocaleTimeString('es-PE', {hour: '2-digit', minute: '2-digit', hour12: true}));
const groupInProgress = ref(null);

const currentDate = new Date().toLocaleDateString('es-PE', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).replace(/^\w/, (c) => c.toUpperCase());

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString('es-PE', {hour: '2-digit', minute: '2-digit', hour12: true});
};

let intervalId;

onMounted(async () => {
  intervalId = setInterval(updateTime, 1000);
  await getGroupInProgress();
});

onUnmounted(() => {
  clearInterval(intervalId);
});

async function getGroupInProgress() {
  const groupInProgressResponse = await getGroupInProgressService();
  if (groupInProgressResponse) {
    groupInProgress.value = new Group(groupInProgressResponse);

  }
}
</script>

<template>
  <div class="page-container">
    <div class="card mx-2 flex flex-wrap items-center justify-between">
      <h1 class="hour">{{ currentTime }}</h1>
      <h1 class="date">{{ currentDate }}</h1>
    </div>

    <div class="body-container">
      <div v-if="groupInProgress" class="card mx-2">
        <div class="flex justify-start items-start">
          <div class="flex w-full flex-wrap justify-between">
            <div class="flex flex-col">
              <h1 class="text-3xl">Clase en curso</h1>
              <h1 class="text-3xl mt-4">{{ groupInProgress.name }}</h1>
            </div>
            <div>
              <h2 class="text-3xl">{{ groupInProgress.getScheduleIn12HourFormat() }}</h2>
            </div>
          </div>
        </div>
        <StudentAssistance :group="groupInProgress"/>
      </div>

    </div>

  </div>
</template>

<style scoped>
.hour {
  font-size: 3vw;
}

.date {
  font-size: 2.5vw;
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Altura total de la ventana */
}

.body-container {
  flex-grow: 1;
  overflow-y: auto;
}

</style>