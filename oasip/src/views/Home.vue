<script setup>
import { ref, onBeforeMount } from 'vue'
const activeMenu = 'Home'
const menus = ['Home', 'Delivery', 'Pricing', 'FAQs', 'Contact']
const sidebarOpen = ref(false)

const events = ref([])

let token = localStorage.getItem('token')
let accountRole = ref(localStorage.getItem('role'))

// getAllEvents
const getEvents = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/eventCategories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
  )
  if (res.status === 200) {
    events.value = await res.json()
  } else {
    console.log('can not get an events')
  }
}
onBeforeMount(async () => {
  await getEvents()
})
</script>

<template>
  <div
    class="w-full min-h-screen bg-gradient-to-bl from-sky-200 via-rose-200 to-cyan-100 items-center justify-center"
  >
  &nbsp;
    <!-- <br />
    <br /> -->
    <div
      class="flex flex-wrap-reverse mt-20 gap-y-24 justify-between py-12 px-6 mx-auto max-w-screen-xl sm:px-8 md:px-12 lg:px-16 xl:px-24"
    >
      <div class="relative z-10 md:w-1/2 w-full">
        <span class="flex items-center px-1 text-xl text-green">
          <span class="font-medium">OASIP - KP6</span>
        </span>
        <h1
          class="pt-4 font-Alfa tracking-wide text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight whitespace-nowrap dark:text-black"
        >
          DUNTURANG<br />
          BOOKING <br />
          <span class="whitespace-nowrap text-green">CLINIC </span>
        </h1>
        <p
          class="pt-8 sm:text-lg font-prompt max-w-md text-gray-600 leading-relaxed"
        >
          เว็บไซต์สำหรับการนัดหมาย
        </p>
        <div class="flex pt-8 space-x-4 sm:space-x-6">
          <li v-if="accountRole != 'lecturer'">
          <router-link :to="{ name: 'booking-event' }">
            <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 
            dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-md px-10 py-2.5 text-center mr-2 mb-2">
            Booking</button>
            </router-link
          >
          </li>
        </div>
      </div>
      <div class="relative md:w-1/2 w-full flex flex-col justify-between">
        <img
          class="w-96 lg:w-full drop-shadow-2xl self-center lg:self-end"
          src="/02-3.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<style></style>
