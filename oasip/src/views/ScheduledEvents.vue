<script setup>
import { ref, onBeforeMount } from 'vue'
import EventCard from '../components/EventCard.vue'

const events = ref([])

// getAllEvents
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/events`)
  if (res.status === 200) {
    events.value = await res.json()
  } else {
    console.log('can not get values')
  }
}
onBeforeMount(async () => {
  await getEvents()
})
</script>

<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100">
    <div class="px-30 py-10 mx-auto">
      <div class="text-2xl ml-20 font-bold dark:text-black mt-20">
        Scheduled Events
      </div>
    </div>
    <!-- Event empty -->
    <div v-if="events.length === 0">
      <p class="text-center text-lg mt-10">No Scheduled Events</p>
    </div>
    <!--Show event -->
    <div class="flex px-20 grid grid-cols-3 content-center">
      <!-- ทำ loop card เรียกใช้จาก db -->
      <div v-for="event in events" :key="event">
        <EventCard :events="event" />
      </div>
    </div>
  </body>
</template>

<style></style>
