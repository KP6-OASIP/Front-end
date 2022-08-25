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
<!-- Main modal -->
<div id="defaultModal" tabindex="-1" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="true" role="dialog">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <!-- Modal header -->
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    User Detail
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
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
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button class="btn" @click="goBack">Close</button>
            </div>
        </div>
    </div>
</div>


</template>
 
<style>

</style>
