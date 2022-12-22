<script setup>
import { ref, onBeforeMount } from 'vue'
import BookingForm from '../components/BookingForm.vue'
import { useRoute, useRouter } from 'vue-router'
const appRouter = useRouter();
const router = useRouter()
const events = ref([])
const eventCategories = ref([])

let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')

const checkUserRole = () => {
    if (accountRole == 'lecturer') {
        appRouter.push({ name: "Home" })
    }
}

const createNewEvent = async (newEvent) => {
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    }, 
    body: JSON.stringify(newEvent),
  })
  if (res.status === 201) {
    const addEvent = await res.json()
    events.value.push(addEvent)
    console.log('Booked successfully')
    alert('Booked successfully')
    router.go(-1)
  } else  {
  console.log('Error, cannot created')
  alert('Can not booked a new event, please check it again')
  }
}
// // getAllEvents
const getEventCategories = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/eventCategories`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
  )
  if (res.status === 200) {
    eventCategories.value = await res.json()
  } else {
    console.log('can not get an event categories')
  }
}
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
  if (res.status === 200) {
    events.value = await res.json()
  } else console.log('Error, can not get events')
}
onBeforeMount(async () => {
  checkUserRole()
  await getEvents()
  await getEventCategories()
})
</script>
<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100 m-auto">
    <div class="p-20">
      <BookingForm
        :eventCategories="eventCategories"
        :events="events"
        @createEvent="createNewEvent"
      />
    </div>
  </body>
</template>
<style></style>