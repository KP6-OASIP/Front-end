<script setup>
// import { computed } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
console.clear()

defineProps({
  events: {
    type: Array,
    required: true,
  },
})
const router = useRouter()
//สร้างตัวแปรไปเรียกใช้ให้ไปหน้า event detail โดย id
const showDet = (id) => {
  router.push({
    name: 'event-detail',
    query: { id: id },
  })
}
</script>
<template>
  <div @click="showDet(events.id)">
    <!-- <router-link :to="`/event-detail?id=${events.id}`"> -->
    <!-- <div
        class="card card-side max-w-ml bg-white rounded-lg border border-gray-200 p-10 shadow-md hover:bg-gray-100 hover:ring-gray-100 dark:bg-gray-800 dark:border-gray-700 text-kanit cursor-pointer"
      > -->
    <div
      class="card card-side m-4 bg-base-100 shadow-xl w-auto h-50 flex items-stretch px-5 dark:border-gray-700 text-kanit cursor-pointer hover:bg-gray-100"
    >
      <!-- <div class="flex flex-col w-full"> -->
      <figure>
        <img class="shrink-0 mb-14 w-20 rounded-full" src="/02-2.png" alt="1" />
      </figure>
      <div class="card-body">
        <h5 class="mb-1 text-left font-kanit text-gray-900 dark:text-white">
          <div class="ltr:ml-3">
            <p class="font-bold text-2xl">
              {{
                events.bookingName && events.bookingName.length < 14
                  ? events.bookingName
                  : events.bookingName.substring(0, 14) + '...'
              }}
            </p>
            <p class="text-gray-500 dark:text-white">
              Date :
              {{ dayjs(events.eventStartTime).format('DD MMM YYYY') }}
            </p>
            <p class="text-gray-500 dark:text-white">
              Start Time :
              {{ dayjs(events.eventStartTime).format('HH:mm') }} ({{
                events.eventDuration
              }}
              mins)
            </p>
            <div
              class="bg-gray-200 p-1 rounded-lg text-center dark:bg-white dark:text-black"
            >
              {{ events.eventCategory.eventCategoryName }}
            </div>
          </div>
          <br />
        </h5>
      </div>
    </div>
  </div>
</template>
<style></style>