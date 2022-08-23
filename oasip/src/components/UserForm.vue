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

const props = defineProps({
  users: {
    type: Array,
    default: [],
  }
})


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
            v-model="eventCategoryID"
            class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] h-8 rounded-lg"
          >
            <option disabled value="">Select Role</option>
            <option>student</option>
            <option>admin</option>
            <option>lecturer</option>
          </select>
             
</form>
</div>
        
</template>
 
<style>

</style>