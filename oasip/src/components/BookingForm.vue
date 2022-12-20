<script setup>
import { computed, onBeforeMount, ref, defineAsyncComponent } from 'vue'
import dayjs from 'dayjs'
// console.clear()
defineEmits(['createEvent'])
const eventCategoryID = ref('')
console.log(eventCategoryID.value)
const currentTime = dayjs().format('YYYY-MM-DDTHH:mm') // ตัวแปรเก็บค่า current time
const maxCountName = 100 // ตัวแปรเพื่อบอกว่า name ใส่ได้สูงสุด 100 ตัว
const minCount = 0 // ตัวแปรเพื่อบอกจำนวนตัวอักษรของ name, notes
const name = ref('')
const maxCountNotes = 500 // ตัวแปรเพื่อบอกว่า notes ใส่ได้สูงสุด 500 ตัว
const notes = ref('')

let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')
// 
const props = defineProps({
  events: {
    type: Array,
    default: [],
  },
  eventCategories: {
    type: Array,
    default: [],
  },
})
</script>

<template>
  <div>
    <div class="card lg:card-side bg-base-100 shadow-xl m-auto p-20 w-7/12">
      <form class="leading-loose flex flex-col gap-3 w-[100%]">
        <div>
          <h2 class="font-bold text-2xl">Booking Form</h2>

          <label class="block">
            <p class="font-bold">Profile :</p>
            <span class="sr-only">Choose profile photo</span>
            <input
              type="file"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
            />
          </label>

          <p
            class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Clinic :
          </p>
          <select
            v-model="eventCategoryID"
            class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] h-8 rounded-lg"
          >
            <option disabled value="">Select Clinic</option>
            <option
              v-for="(eventCategory, index) in eventCategories"
              :key="index"
              :value="{
                id: eventCategory.id,
                eventDuration: eventCategory.eventDuration,
              }"
            >
              {{ eventCategory.eventCategoryName }} ({{
                eventCategory.eventDuration
              }}
              mins)
            </option>
          </select>
          <div>
            <p
              class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Name :
            </p>
            <input
              placeholder=" Input your name"
              v-model="name"
              :maxlength="maxCountName"
              :minlength="minCount"
              class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            />
            <span class="text-xs ml-[95%] text-gray-400"
              >{{ minCount + name.length }}/{{ maxCountName }}</span
            >
          </div>

          <div>
            <p
              class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Email :
            </p>
            <input
              type="email"
              v-model="email"
              placeholder=" Input your email"
              class="peer bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            />
            <p
              class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
            >
              Please provide a valid email address.
            </p>
          </div>

          <div>
            <p class="font-bold">Note :</p>
            <textarea
              v-model="notes"
              placeholder=" Input your notes"
              :maxlength="maxCountNotes"
              :minlength="minCount"
              cols="5"
              rows="5"
              class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            ></textarea>
            <span class="text-xs ml-[95%] text-gray-400"
              >{{ minCount + notes.length }}/{{ maxCountNotes }}</span
            >
          </div>

          <label for="meeting-time"
            ><p
              class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Choose a time for your appointment :
            </p></label
          >
          <input class="rounded-lg"
            v-model="startTime"
            type="datetime-local"
            id="meeting-time"
            :min="currentTime"
            max="2025-05-08T00:00"
          />
        </div>
        <button
          class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
          @click="
            $emit('createEvent', {
              bookingName: name,
              bookingEmail: email,
              eventStartTime: new Date(startTime),
              eventDuration: eventCategoryID.eventDuration,
              eventNotes: notes,
              eventCategoryID: { id: eventCategoryID.id },
            })
          "
        >
          Booking
        </button>
      </form>
    </div>
  </div>
</template>

<style></style>