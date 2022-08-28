<script setup>
import { ref, onBeforeMount } from 'vue'
import UserList from '../components/UserList.vue'
import UserDetail from '../components/UserDetail.vue';


const users = ref([])
const userDetail = ref({})
const isModal = ref(false)

const getUserDetails = (e) => {
  userDetail.value = e
  isModal.value = true
}

const closeModal = (u) => {
  isModal.value = u
}

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
      <div>
        <UserList @showDetails="getUserDetails"  />
      </div>
      <div v-if="isModal">
        <UserDetail :user="userDetail" @close="closeModal"/>
      </div>  
    <!-- <div class="flex px-20 grid grid-cols-3 content-center"> -->
      <!-- ทำ loop card เรียกใช้จาก db -->
       <!-- <div v-for="user in users" :key="user">
        <UserList :users="user" />
      </div>     
    </div> -->
  </body>
</template>
 
<style>

</style>