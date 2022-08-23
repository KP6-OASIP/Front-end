<script setup>
import { ref, onBeforeMount } from 'vue'
import UserList from '../components/UserList.vue'

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
</script>
 
<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100">
    <div class="px-30 py-10 mx-auto">
      <div class="text-2xl ml-20 font-bold dark:text-black mt-20">
      </div>
    </div>
    <!-- Event empty -->
    <div v-if="users.length === 0">
      <p class="text-center text-lg mt-10">No Users</p>
    </div>
    <!--Show all users -->
      <!-- ทำ loop card เรียกใช้จาก db -->
      <div>
        <UserList  />
      </div>
  </body>
</template>
 
<style>

</style>