<script setup>

// eslint-disable-next-line no-undef
import {onMounted, ref} from "vue";
import {getStudentProfileImageService} from "@/services/studentService";
import Student from "@/models/student";
import {useToast} from "primevue/usetoast";
import {
  createAssistanceService,
  deleteAssistanceService,
  getTodayAssistancePerStudentService
} from "@/services/assistanceService";
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
    image.value = '/src/assets/profileImageBlank.webp';
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
  <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
<!--    <div class="md:w-40 relative">-->
<!--      <Image :src="image" alt="Image" width="250"/>-->
<!--    </div>-->
      <div class="relative w-full min-h-[120px] min-w-[100px] max-w-[250px] aspect-[4/3] mx-auto">
        <Image
            :src="image"
            alt="Image"
            imageClass="w-full h-full object-cover rounded"
        />
      </div>

    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
      <div class="flex flex-row md:flex-col justify-between items-start gap-2">
        <div>
          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ student.dni }}</span>
          <div class="font-semibold mt-1 text-base sm:text-lg md:text-xl">{{ student.getFullName() }}</div>
        </div>
        <div class="" style="border-radius: 30px">
          <div class="flex items-center gap-2 justify-center"
               style="border-radius: 30px;">
            <Tag :value="getPaymentStatusLabel(student.paymentStatus)"
                 :severity="getPaymentStatusSeverity(student.paymentStatus)"></Tag>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6 mt-6">
        <div class="flex gap-2">
          <Button icon="pi pi-check-circle" @click="saveAssistance" v-if="!studentHasAssisted"
                  severity="success"
                  label="Marcar Asistencia"
                  class="flex-auto w-fit"></Button>
          <Button v-if="studentHasAssisted" @click="deleteAssistance" label="Borrar Asistencia" icon="pi pi-times-circle" severity="warn"
                  class="flex-auto w-fit"></Button>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>