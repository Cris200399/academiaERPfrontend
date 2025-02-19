<template>
  <FullCalendar :options="calendarOptions"/>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import FullCalendarRecurrentEvent from "@/models/fullCalendarRecurrentEvent";
import {onMounted, ref} from "vue";
import {getGroupsService} from "@/services/groupService";
import {getPrivateClassesWithStudentsService} from "@/services/privateClassService";

let events = ref([]);

onMounted(async () => {
  const groupActivities = await getGroupsService();
  const particularActivities = await getPrivateClassesWithStudentsService();

  groupActivities.map(group => {
    const [startTime, endTime] = group.schedule.split(' - ');
    events.value.push(new FullCalendarRecurrentEvent(group.name, group.daysOfWeek, startTime, endTime));
  });

  particularActivities.map(particular => {
    let date = new Date(particular.date);
    const start = new Date(date.setHours(particular.startTime.split(':')[0], particular.startTime.split(':')[1]));
    const end = new Date(date.setHours(particular.endTime.split(':')[0], particular.endTime.split(':')[1]));
    const students = particular.students.map(student => student.name).join(', ');
    events.value.push({
      title: particular.title ? `${particular.title} | ${students}` : students,
      start: start,
      end: end
    });
  })

});


const calendarOptions = {
  plugins: [timeGridPlugin, dayGridPlugin, listPlugin], // Incluye listPlugin
  initialView: 'timeGridWeek',
  locales: [esLocale],
  locale: 'es',
  events: events.value,
  slotDuration: '00:30:00',
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  },
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    meridiem: 'short',
  },
  scrollTime: '09:00:00',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek', // Añade las vistas deseadas
  },
};


</script>

<style>

</style>
