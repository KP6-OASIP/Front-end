<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
console.clear()

defineEmits(['showDetails'])

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

// const showDetails = (id) => {
//   router.push({
//     name: 'user-detail',
//     query: { id: id },
//   })
// }
</script>
 
<template>
      <div
        class="
          card
          dark:bg-gray-800
          shadow-xl
          m-auto
          p-6
          w-10/12
        "
      >
<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div
            class="
              p-5
              rounded-lg
              text-center text-2xl
              font-bold
              dark:bg-white dark:text-black
              m-auto
            "
          >
            All users
          </div>
    <table class=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-10">
                    Name
                </th>
                <th scope="col" class="py-3 px-10">
                    Email
                </th>
                <th scope="col" class="py-3 px-10">
                    Role
                </th>
                <th>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="user in users"
                :key="user"
                :users="user"
            >
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ user.name }}
                </th>
                <td class="py-4 px-6">
                    {{ user.email }}
                </td>
                <td class="py-4 px-6">
                    {{ user.role }}
                </td>
                <td class="py-4 px-6">
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline" 
                    @click="$emit('showDetails',user)">Details</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</div>
<!-- <UserDetail>
<button class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="defaultModal">
  Toggle modal
</button>
</UserDetail> -->
</template>
 
<style>

</style>