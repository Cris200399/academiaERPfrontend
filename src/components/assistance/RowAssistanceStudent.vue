<script setup>

// eslint-disable-next-line no-undef
import {onMounted, ref} from "vue";
import {getStudentProfileImageService} from "@/services/studentService";
import Student from "@/models/student";

// eslint-disable-next-line no-undef
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

onMounted(() => {
  if (props.student.profileImageId) {
    getProfileImage();
  } else {
    image.value = 'src/assets/profileImageBlank.webp';
  }
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

</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
    <div class="md:w-40 relative">
      <Avatar
          :image="image"
          class="p-overlay-badge img-size "
          :pt="{ image: { class: 'rounded' } }"
      />
    </div>
    <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
      <div class="flex flex-row md:flex-col justify-between items-start gap-2">
        <div>
          <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">{{ student.dni }}</span>
          <div class="text-2xl font-semibold mt-1">{{ student.getFullName() }}</div>
        </div>
        <!--        <span class="text-xl font-semibold">{{ student.phone }}</span>-->
        <Tag :value="'Al día'" :severity="getSeverity('up-to-date')"></Tag>
      </div>
      <div class="flex flex-col md:items-end gap-2">
        <div class="flex flex-wrap md:flex-row w-full ">
          <Button icon="pi pi-check-circle" rounded severity="success" label="Asistió"
                  class="flex-auto "></Button>
        </div>
        <div class="flex flex-wrap md:flex-row w-full ">
          <Button icon="pi pi-times-circle" rounded severity="warn" label="Falta"
                  class="flex-auto"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img-size {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>