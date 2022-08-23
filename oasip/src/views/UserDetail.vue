<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'

const route = useRoute()
const router = useRouter()
const getUserDetails = ref({})
const goBack = () => router.go(-1) // ให้กลับไปหน้าก่อนหน้า

const getUsersById = async (id) => {
  if (route.query.id) {
    const id = route.query.id
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/users/${id}`
    )
    if (res.status === 200) {
      const data = await res.json()
      getUserDetails.value = data
    } else {
      console.log('can not get values')
    }
  }
}
onBeforeMount(async () => {
  await getUsersById()
})
</script>
 
<template>
  <div
    class="card card-side bg-base-100 font-kanit shadow-xl dark:border-gray-700 w-7/12 m-auto mt-20"
  >
    <div  class="card-body p-20">
      <h2 class="card-title font-bold text-3xl">Event Detail</h2>
      <ul  class="text-x">
        <li>
          <span class="font-bold">Name :</span> {{ getUserDetails.name }}
        </li>
        <li>
          <span class="font-bold">Email :</span> {{ getUserDetails.email }}
        </li>
        <li>
          <span class="font-bold"> Role :</span>
          {{ getUserDetails.role }}
        </li>
        <li>
          <span class="font-bold"> Created on :</span>
          {{ dayjs(getUserDetails.createOn).format('DD MMM YYYY') }}
        </li>
        <li>
          <span class="font-bold">Updated on:</span>
          {{ dayjs(getUserDetails.updateOn).format('DD MMM YYYY')}}
        </li>
      </ul>
      &nbsp;
      <!-- v-on เพื่อ click แล้วไปทำ go back func. -->
      <button class="btn" @click="goBack">Close</button>
    </div>
  </div>
</template>
 
<style>

</style>