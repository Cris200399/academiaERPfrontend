<template>
  <FullCalendar :options="calendarOptions"/>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
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
    const title = particular.students.map(student => student.name).join(', ');
    events.value.push({
      title: particular.title || title,
      start: start,
      end: end
    });
  })
  // events:[
  //   {
  //     title: 'Evento Semanal',
  //     daysOfWeek: [1], // 1 representa el lunes
  //     startTime: '10:00:00', // Hora de inicio del evento
  //     endTime: '12:00:00', // Hora de fin del evento (opcional)
  //     startRecur: '2025-02-01', // Fecha de inicio de la recurrencia (opcional)
  //     endRecur: '2025-12-31', // Fecha de fin de la recurrencia (opcional)
  //   },
  // ],


});


const calendarOptions = {
  plugins: [timeGridPlugin, dayGridPlugin],
  initialView: 'timeGridWeek',
  locales: [esLocale],
  locale: 'es',
  events: events.value,
  slotDuration: '00:30:00', // Intervalos de 30 minutos
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Formato de 12 horas para los eventos
  },
  slotLabelFormat: {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true, // Formato de 12 horas para la columna de horas
    meridiem: 'short', // Muestra 'AM' o 'PM'
  },
  scrollTime: '09:00:00',
};

</script>

<style>

</style>
