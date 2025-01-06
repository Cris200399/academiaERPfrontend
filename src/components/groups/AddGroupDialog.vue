<template>
  <Button icon="pi pi-plus" class="text-lg" severity="success" label="Añadir Grupo" @click="visible = true"/>
  <Dialog v-model:visible="visible" modal @hide="resetForm" :draggable='false'>
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-3xl font-bold mb-2">Create Class Group</h1>
      <p class="text-gray-600 mb-8">Create a class group to manage multiple classes together</p>

      <form @submit.prevent="handleSubmit">
        <!-- Nombre del Grupo -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Group Name</label>
          <input
              v-model="groupName"
              type="text"
              class="w-full p-3 rounded-lg border border-gray-200"
              placeholder="Enter your group name"
          >
        </div>

        <!-- Días de repetición -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Repeat</label>
          <div class="flex flex-wrap gap-2">
            <button
                v-for="day in days"
                :key="day"
                type="button"
                :class="[
              'px-4 py-2 rounded-full',
              selectedDays.includes(day)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800'
            ]"
                @click="toggleDay(day)"
            >
              {{ day }}
            </button>
          </div>
        </div>

        <!-- Horario -->
        <div class="mb-6">
          <label class="block text-xl font-bold mb-4">Time</label>
          <div class="mb-2">Class Hours</div>
          <div class="flex items-center gap-4">
            <input
                v-model="startTime"
                type="time"
                class="p-2 border rounded"
            >
            <span>to</span>
            <input
                v-model="endTime"
                type="time"
                class="p-2 border rounded"
            >
          </div>
        </div>

        <!-- Botones -->
        <div class="flex justify-end gap-4 mt-8">
          <button
              type="button"
              class="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              @click="$emit('cancel')"
          >
            Cancel
          </button>
          <button
              type="submit"
              class="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </Dialog>
</template>

<script setup>

import {ref} from 'vue'

const visible = ref(false);

const groupName = ref('');
const days = ref(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
const selectedDays = ref([]);
const startTime = ref('00:00');
const endTime = ref('23:59');

function toggleDay(day) {
  if (this.selectedDays.includes(day)) {
    this.selectedDays = this.selectedDays.filter(d => d !== day)
  } else {
    this.selectedDays.push(day)
  }
}

function resetForm() {
  this.groupName.value = '';
  this.selectedDays.value = [];
  this.startTime.value = '00:00';
  this.endTime.value = '23:59';
}

function handleSubmit() {
  const formData = {
    groupName: this.groupName,
    repeatDays: this.selectedDays,
    classHours: {
      start: this.startTime,
      end: this.endTime
    }
  }

  this.$emit('submit', formData)
}
</script>