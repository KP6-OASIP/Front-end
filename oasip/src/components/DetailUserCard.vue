<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
const name = ref("");
const email = ref("");
const role = ref("");
const password = ref("");
const route = useRoute()
const router = useRouter()
const getUserDetails = ref({})
const goBack = () => router.go(-1) // ให้กลับไปหน้าก่อนหน้า
// const userLink = `/api/users/${id}`;

let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')

// defineProps({
//   users: {
//     type: Array,
//     required: true,
//   },
// })

const getUsersById = async (id) => {
  if (route.query.id) {
    const id = route.query.id
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }


    )
    if (res.status === 200) {
      const data = await res.json()
      getUserDetails.value = data
      name.value = getUserDetails.value.name
      email.value = getUserDetails.value.email
      role.value = getUserDetails.value.role
    } else {
      console.log('can not get users')
    }
  }
}
onBeforeMount(async () => {
  await getUsersById()
})

// สร้างตัวแปร เพื่อเรียกใช้และส่งไปหน้าต่อไป ตาม id

const edituser = (id) => {
  console.log(id)
  router.push({
    name: 'edit-user',
    query: { id: id },
  })
}

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อลบข้อมูลตาม id โดยเมื้อลบสำเร็จให้กลับไปที่หน้าก่อนหน้า
const deleteUser = async () => {
  if (confirm('Are you sure you want to delete ?') == true) {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/users/${route.query.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    router.go(-1)
  } else {
  }
}

const isedit = ref(false)
const edit = () => {
  isedit.value = !isedit.value
  
}

const editUser = async () => {
  const res = await fetch(`/api/users/${route.query.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      role: role.value,
      // password: password.value,
    }),
  });
  if (res.status == 200) {
    console.log('Updated successfully')
    alert('Updated successfully')
    router.go(-1)
  } else {
    console.log('Error, cannot edited')
    alert('Can not edited a user')
  }
};
</script>
 
<template>
  <div
    class="card card-side bg-base-100 font-kanit shadow-xl dark:border-gray-700 w-6/12 m-auto mt-20"
  >
    <!-- <figure><img class="w-96" src="/wall1.jpeg" alt="photo" /></figure> -->
    <div  class="card-body p-10">
      <h2 class="card-title font-bold text-3xl">User Detail</h2>
      <!-- 
        สำหรับโชว์ข้อมูล
      -->
    <div v-if="isedit==false">
      <ul  class="text-x">
        <li>
          <span class="font-bold">Name:</span> {{ getUserDetails.name }}
        </li>
        <li>
          <span class="font-bold">Email:</span> {{ getUserDetails.email }}
        </li>
        <li>
          <span class="font-bold"> Role:</span>
          
          {{ getUserDetails.role }}
        </li>
        <li>
          <span class="font-bold"> Created on:</span>
          {{ dayjs(getUserDetails.createOn) }}
        </li>
        <li>
          <span class="font-bold">Updated on:</span>
          {{ dayjs(getUserDetails.updateOn) }}
        </li>
      </ul>
      &nbsp;
      <!-- v-on เพื่อ click แล้วไปทำ edit user func. -->
      <div>
      <button
        type="button"
        @click="edit"
        class="bg-yellow-500 w-[100%] hover:bg-gray-400 rounded-lg text-white font-bold py-2 px-10 border-gray-700 hover:border-gray-500"
      >
        EDIT
      </button>
    </div>

      <!-- v-on เพื่อ click แล้วไปทำ remove user func. -->
      <div>
      <button
        type="button"
        @click="deleteUser"
        class="bg-red-700 w-[50%] hover:bg-gray-400 rounded-lg text-white font-bold py-2 px-10 border-gray-700 hover:border-gray-500 mt-1"
      >
        DELETE
      </button>
  
      
      <!-- v-on เพื่อ click แล้วไปทำ go back func. -->
      
      <button class="bg-gray-600 w-[50%] hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800 " 
      @click="goBack">CLOSE</button>
    </div>
    
    </div>
    <!-- 
      สำหรับ edit 
     -->
    <div v-if="isedit==true">
      <ul  class="text-x">
        <li>
          <span class="font-bold ">Name :</span> 
          <input type="text" v-model="name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/> 
        </li>
        <li>
          <span class="font-bold" >Email :</span>
          <input type="text" v-model="email"  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/> 
        </li>
        <li>
          <span class="font-bold"> Role :</span>
          <select
              v-model="role"
              id="floating_repeat_select"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
            >
              <option disabled value="">Select Role</option>
              <option>student</option>
              <option>admin</option>
              <option>lecturer</option>
            </select> 
        </li>
        <li>
          <span class="font-bold"> Created on :</span>
          {{ dayjs(getUserDetails.createOn) }}
        </li>
        <li>
          <span class="font-bold">Update on :</span>
          {{ dayjs(getUserDetails.updateOn) }}
        </li>
      </ul>
      &nbsp;
      <!-- v-on เพื่อ click แล้วไปทำ edit user func. -->
      <div>
        <button 
        class="bg-yellow-500 w-[100%] hover:bg-gray-400  rounded-lg text-white font-bold py-2 px-10 border-gray-700 hover:border-gray-500"
          @click="editUser" >
        UPDATE
      </button>
      </div>
    
      <div>
      <button class="bg-red-700 w-[100%] hover:bg-gray-400 rounded-lg text-white font-bold py-2 px-10 border-gray-700 hover:border-gray-500 mt-1" 
      @click="goBack">CANCEL</button>     
      <!-- <button @click="edit" class="bg-red-700 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800">
        CANCEL
      </button> -->
    </div>
    </div>
    </div>
  </div>
</template>
 
<style>

</style>