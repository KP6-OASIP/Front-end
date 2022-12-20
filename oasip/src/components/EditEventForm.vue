<script setup>
import { computed, onBeforeMount, ref, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

// defineEmits(['updateNewEvent'])

const getDetails = ref({})
const events = ref([])
const router = useRouter()
const route = useRoute()
const maxCountNotes = 500
const minCount = 0


// ตัวแปรเก็บ object
const notes = ref('')
const startTime = ref('')

let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')


const goBack = () => router.go(-1)
const currentTime = dayjs().format('YYYY-MM-DDTHH:mm')

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend และถ้าติดต่อไม่ได้ให้แสดง error
const getEventById = async (id) => {
  if (route.query.id) {
    const id = route.query.id
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  }
    )
    if (res.status === 200) {
      const data = await res.json()
      getDetails.value = data
      notes.value = getDetails.value.eventNotes
      startTime.value = new Date(getDetails.value.eventStartTime)
    } else {
      console.log('cannot get values')
    }
  }
}
onBeforeMount(async () => {
  await getEventById()
})

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อทำ method put และถ้าติดต่อไม่ได้ให้แสดง error
const updateEvent = async (id) => {
  const res = await fetch(
    `/api/events/${id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        eventNotes: notes.value,
        eventStartTime:
          startTime.value === ''
            ? getDetails.value.eventStartTime
            : new Date(startTime.value),
      }),
    }
  )
  if (res.status === 200) {
    console.log('Updated successfully')
    alert('Updated successfully')
    router.go(-1)
  } else {
    console.log('error, cannot be added')
    alert('Can not update booking')
  }
}
</script>

<template>
  <div>
    <div class="card lg:card-side bg-base-100 shadow-xl m-auto p-20 w-7/12">
      <form class="leading-loose flex font-kanit flex-col gap-3 w-[100%]">
        <div>
          <h2 class="font-bold text-2xl">Edit event form</h2>
          <ul class="text-x">
            <li>
              <span class="font-bold">Name :</span> {{ getDetails.bookingName }}
            </li>
            <li>
              <span class="font-bold">Email :</span>
              {{ getDetails.bookingEmail }}
            </li>
            <li>
              <span class="font-bold">Clinic :</span>
              {{ getDetails.eventCategory?.eventCategoryName }}
            </li>
            <li></li>
          </ul>

          <div>
            <p class="font-bold">Note :</p>
            <textarea
              v-model="notes"
              placeholder=" Input your notes"
              cols="5"
              rows="5"
              :maxlength="maxCountNotes"
              :minlength="minCount"
              class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            ></textarea>
            <span class="text-xs ml-[95%] text-gray-400"
              >{{ minCount + notes.length }}/{{ maxCountNotes }}</span
            >
          </div>
          <label for="meeting-time"
            ><p class="font-bold after:ml-0.5 after:text-red-500">
              Choose a time for your appointment :
            </p></label
          >
          <input
            v-model="startTime"
            type="datetime-local"
            id="meeting-time"
            :min="currentTime"
            max="2025-06-14T00:00"
          />
        </div>

        <button
          class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
          @click="updateEvent(getDetails.id)"
        >
          UPDATE
        </button>
        <button class="btn" @click="goBack">Cancel</button>
      </form>
    </div>
  </div>
  
</template>

<style></style>
