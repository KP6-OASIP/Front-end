<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
console.clear()

defineProps({
  users: {
    type: Array,
    required: true,
  },
})

const users = ref([])

const getUsers = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/users`
  )
  if (res.status === 200) {
    users.value = await res.json()
  } else {
    console.log('can not get values')
  }
}
onBeforeMount(async () => {
  await getUsers()
})


// const getUsersById = async (id) => {
//   if (route.query.id) {
//     const id = route.query.id
//     const res = await fetch(
//       `${import.meta.env.VITE_APP_TITLE}/api/users/${id}`
//     )
//     if (res.status === 200) {
//       const data = await res.json()
//       getDetails.value = data
//     } else {
//       console.log('can not get values')
//     }
//   }
// }
// onBeforeMount(async () => {
//   await getUsersById()
// })
const router = useRouter()

const showDetails = (id) => {
  router.push({
    name: 'user-detail',
    query: { id: id },
  })
}
</script>
 
<template>
<div @click="showDetails(users.id)">
   <div v-show="users.length > 0">
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
              {{ users.name }}
            </p>
            <p class="text-gray-500 dark:text-white">
              Email :
              {{ users.email }}
            </p>
            <p class="text-gray-500 dark:text-white">
              Role :
              {{ users.role }} 
            </p>
          </div>
          <br />
        </h5>
      </div>
    </div>
  </div>
</div>
</template>
 
<style>

</style>