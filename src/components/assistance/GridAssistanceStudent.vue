<script setup>
import Student from "@/models/student";
import {onMounted, ref} from "vue";
import {getStudentProfileImageService} from "@/services/studentService";
import {createAssistanceService, getTodayAssistancePerStudentService} from "@/services/assistanceService";

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

const studentHasAssisted = ref(false);

onMounted(() => {
  if (props.student.profileImageId) {
    getProfileImage();
  } else {
    image.value = 'src/assets/profileImageBlank.webp';
  }

  getTodayAssistancePerStudentService(props.student.id, props.groupId).then((response) => {
    studentHasAssisted.value = response !== null;
  });
});

async function getProfileImage() {
  const blob = await getStudentProfileImageService(props.student.id);
  image.value = URL.createObjectURL(blob);
}

const getSeverity = (paymentStatus) => {
  switch (paymentStatus) {
    case 'up-to-date':
      return 'success';

    case 'LOWSTOCK':
      return 'warn';

    case 'OUTOFSTOCK':
      return 'danger';

    default:
      return null;
  }
};

async function onPresent() {
  const newAssistanceObject = ({
    student: props.student.id,
    group: props.groupId,
    date: new Date(),
    status: "Presente"
  })

  const response = await createAssistanceService(newAssistanceObject);

  console.log(response);
}

</script>

<template>
  <div
      class="p-6 border border-surface-200 dark:border-surface-700 bg-surface-0 dark:bg-surface-900 rounded flex flex-col">
    <div class="bg-surface-50 flex justify-center rounded p-4">
      <div class="relative mx-auto">
        <Avatar
            :image="image"
            class="p-overlay-badge img-size "
            :pt="{ image: { class: 'rounded' } }"
        />
      </div>
    </div>
    <div class="pt-6">
      <div class="flex flex-row justify-between items-start gap-2">
        <div>
          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ student.dni }}</span>
          <div class="text-lg font-medium mt-1">{{ student.getFullName() }}</div>
        </div>
        <div class="bg-surface-100 p-1" style="border-radius: 30px">
          <div class="bg-surface-0 flex items-center gap-2 justify-center py-1 px-2"
               style="border-radius: 30px;">
            <Tag :value="'Al día'" :severity="getSeverity('up-to-date')"></Tag>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6 mt-6">
        <div class="flex gap-2">
          <Button icon="pi pi-check-circle" @click="onPresent" :disabled="studentHasAssisted" rounded severity="success" label="Asistió"
                  class="flex-auto w-8/12"></Button>
          <Button icon="pi pi-times-circle" rounded severity="warn" label="Falta"
                  class="flex-auto w-4/12"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-size {
  min-width: 200px;
  min-height: 200px;
}
</style>