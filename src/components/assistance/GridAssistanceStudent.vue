<script setup>
import Student from "@/models/student";
import {onMounted, ref} from "vue";
import {getStudentProfileImageService} from "@/services/studentService";
import {
  createAssistanceService,
  deleteAssistanceService,
  getTodayAssistancePerStudentService
} from "@/services/assistanceService";

import {useToast} from "primevue/usetoast";
import Assistance from "@/models/assistance";
import {getPaymentStatusLabel, getPaymentStatusSeverity} from "@/utils/paymentStatusFunctions";

// eslint-disable-next-line no-undef,no-unused-vars
const props = defineProps({
  student: {
    type: Student,
    required: true
  },
  groupId: {
    type: String,
    required: true
  }
})
const image = ref();

const toast = useToast();

const studentHasAssisted = ref(false);

let assistance = null;

onMounted(async () => {
  if (props.student.profileImageId) {
    await getProfileImage();
  } else {
    image.value = 'profileImageBlank.webp';
  }

  await getTodayAssistancePerStudentService(props.student.id, props.groupId).then((response) => {
    studentHasAssisted.value = response !== null;
    if (response) {
      assistance = new Assistance(response);
    }
  });
});

async function getProfileImage() {
  const blob = await getStudentProfileImageService(props.student.id);
  image.value = URL.createObjectURL(blob);
}


async function saveAssistance() {
  const newAssistanceObject = ({
    student: props.student.id,
    group: props.groupId,
    date: new Date(),
    status: "Presente"
  })
  const newAssistance = await createAssistanceService(newAssistanceObject);
  if (newAssistance) {
    studentHasAssisted.value = true;
    assistance = new Assistance(newAssistance);
    toast.add({severity: 'success', summary: 'Asistencia guardada', life: 1000});
  } else {
    toast.add({severity: 'error', summary: 'Error al guardar la asistencia', life: 1000});
  }


}

async function deleteAssistance() {
  const response = await deleteAssistanceService(assistance.id);
  if (response) {
    studentHasAssisted.value = false;
    assistance = null;
    toast.add({severity: 'info', summary: 'Asistencia eliminada', life: 1000});
  } else {
    toast.add({severity: 'error', summary: 'Error al eliminar la asistencia', life: 1000});
  }
}

</script>

<template>
  <div class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">

    <div class="bg-surface-50 flex justify-center rounded p-4">
      <div class="relative w-full min-h-[250px] min-w-[250px] max-w-[250px] aspect-[4/3] mx-auto">
        <Image
            :src="image"
            alt="Image"
            imageClass="w-full h-full object-cover rounded"
        />
      </div>
    </div>


    <div class="pt-6">
      <div class="flex flex-row justify-between items-start gap-2">
        <div>
          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ student.dni }}</span>
          <div class="text-lg font-medium mt-1">{{ student.getFullName() }}</div>
        </div>
        <div class="p-1" style="border-radius: 30px">
          <div class="flex items-center gap-2 justify-center"
               style="border-radius: 30px;">
            <Tag :value="getPaymentStatusLabel(student.paymentStatus)"
                 :severity="getPaymentStatusSeverity(student.paymentStatus)"></Tag>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6 mt-6">
        <div class="flex gap-2">
          <Button icon="pi pi-check-circle" @click="saveAssistance" :disabled="studentHasAssisted"
                  severity="success"
                  label="Marcar Asistencia"
                  class="flex-auto w-8/12"></Button>
          <Button v-if="studentHasAssisted" @click="deleteAssistance" icon="pi pi-times-circle" severity="warn"
                  class="flex-auto w-4/12"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>