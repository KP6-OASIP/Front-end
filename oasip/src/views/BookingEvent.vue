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
  const res = await fetch(`/api/events`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    }, 
    body: JSON.stringify(newEvent),
  })
  if (res.status === 201) {
    const addEvent = await res.json()
    events.value.push(addEvent)
    console.log('Booked Successfully')
    alert('Booked Successfully')
    router.go(-1)
  } else  {
  console.log('error, cannot create')
  alert('Cannot book, please check it again')
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
    console.log('can not get values')
  }
}
const getEvents = async () => {
  const res = await fetch(`/api/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
  if (res.status === 200) {
    events.value = await res.json()
  } else console.log('Error, cannot get data')
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