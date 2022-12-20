<script setup>
import { computed, onBeforeMount, ref, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

defineEmits(['updateNewEvent'])

const getCategory = ref({})
const eventCategories = ref([])
const router = useRouter()
const route = useRoute()
const maxCountDesc = 500
const minCount = 0

//เก็บค่า object
const desc = ref('')
const duration = ref('')


const goBack = () => router.go(-1)

let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')


// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend และถ้าติดต่อไม่ได้ให้แสดง error
const getEventCategoryById = async (id) => {
  if (route.query.id) {
    const id = route.query.id
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/eventCategories/${id}` , {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  }
    )
    if (res.status === 200) {
      const data = await res.json()
      getCategory.value = data
      desc.value = getCategory.value.eventCategoryDesc
      duration.value = getCategory.value.eventDuration
    } else {
      console.log('cannot get values')
    }
  }
}
onBeforeMount(async () => {
  await getEventCategoryById()
})

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อทำ method put และถ้าติดต่อไม่ได้ให้แสดง error
const updateEventCategory = async (id) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/eventCategories/${id}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        eventDuration: duration.value,
        eventCategoryDesc: desc.value,
      }),
    }
  )
  console.log(duration)
  console.log(desc)
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
      <form class="leading-loose font-kanit flex flex-col gap-3 w-[100%]">
        <div>
          <h2 class="font-bold text-2xl">Edit category form</h2>
          <ul class="text-x">
            <li>
              <span class="font-bold">Category Name :</span> {{ getCategory.eventCategoryName }}
            </li>
          </ul>

          <div>
            <p class="font-bold">Description :</p>
            <textarea
              v-model="desc"
              placeholder=" Input your description"
              cols="5"
              rows="5"
              :maxlength="maxCountDesc"
              :minlength="minCount"
              class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            ></textarea>
            <span class="text-xs ml-[95%] text-gray-400"
              >{{ minCount + desc.length }}/{{ maxCountDesc }}</span
            >
          </div>
          <p class="font-bold">Duration :</p>

          <input
           class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] h-8 rounded-lg"
            v-model="duration"
            type="number"
            min= 1
            max= 480
          />
        </div>

        <button
          class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
          @click="updateEventCategory(getCategory.id)"
        >
          Update
        </button>
        <button class="btn" @click="goBack">Cancel</button>
      </form>
    </div>
  </div>
  
</template>

<style></style>
