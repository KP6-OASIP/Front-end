<script setup>
import { computed, onBeforeMount, ref, defineAsyncComponent } from 'vue'

defineEmits(['addUser'])
const userName = ref('')
const emailUser = ref('')
const role = ref('')
const maxCountName = 100 // ตัวแปรเพื่อบอกว่า name ใส่ได้สูงสุด 100 ตัว
const minCount = 0 // ตัวแปรเพื่อบอกจำนวนตัวอักษรของ name, notes
const name = ref('')
const maxCountmail = 50
const mail = ref('')
const users =ref([])
const summit = ()=>{
  addUsers()
}

const props = defineProps({
  users: {
    type: Array,
    default: [],
  }
})

const getAllusers = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/users`
  )
  if (res.status === 201) {
    users.value = await res.json()
  } else {
    console.log('can not get values')
  }
}
onBeforeMount(async () => {
  await getAllusers()
})

const addUsers = async () => {
  const  res = await fetch(userLink, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name.value ,
      mail: mail.value,
      role: role.value,
      createOn: "2022-08-1T17:00:00Z",
      updateOn: "2022-08-1T17:00:00Z"
    })
  })
}
</script>
 
<template>
<div class="card lg:card-side bg-base-100 shadow-xl m-auto p-20 w-7/12">
<form class="leading-loose flex flex-col gap-3 w-[100%]">
  <div>
            <p class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">
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
              placeholder=" Input your email"
              type="email"
              v-model="email"
              :maxlength="maxCountmail"
              :minlength="minCount"
              class="peer bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            />
            <span class="text-xs ml-[95%] text-gray-400"
              >{{ minCount + mail.length }}/{{ maxCountmail }}</span
            >
            <p
              class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
            >
              Please provide a valid email address.
            </p>
          </div>
          <p
            class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Role :
          </p>
          <select
            v-model="role"
            class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] h-8 rounded-lg"
          >
            <option disabled value="">Select Role</option>
            <option>student</option>
            <option>admin</option>
            <option>lecturer</option>
          </select>
             <div>
          <button class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5" @click="summit">summit</button>
        </div>
</form>
</div>
        
</template>
 
<style>

</style>