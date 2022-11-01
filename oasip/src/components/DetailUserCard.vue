<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs'
const name = ref('')
const email = ref('')
const role = ref('')
const route = useRoute()
const router = useRouter()
const getUserDetails = ref({})
const goBack = () => router.go(-1) // ให้กลับไปหน้าก่อนหน้า

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

// สร้างตัวแปร เพื่อเรียกใช้และส่งไปหน้าต่อไป ตาม id
// const editUser = (id) => {
//   console.log(id)
//   router.push({
//     name: 'edit-user',
//     query: { id: id },
//   })
// }

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อลบข้อมูลตาม id โดยเมื้อลบสำเร็จให้กลับไปที่หน้าก่อนหน้า
const deleteUser = async () => {
  if (confirm('Are you sure you want to delete ?') == true) {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/users/${route.query.id}`,
      {
        method: 'DELETE',
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
  const res = await fetch(userLink, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    // body: JSON.stringify({
    //   name: name.value,
    //   email: email.value,
    //   role: role.value,
    // }),
  });
  if (res.status == 201) {
    console.log("good status");
  } else console.log("bad status");
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
        type="button"
        @click="edit"
        class="bg-yellow-500 w-[100%] hover:bg-gray-400 rounded-lg text-white font-bold py-2 px-10 border-gray-700 hover:border-gray-500"
      >
        Edit
      </button>

      <!-- v-on เพื่อ click แล้วไปทำ remove user func. -->
      <button
        type="button"
        @click="deleteUser"
        class="bg-red-700 hover:bg-gray-700 rounded-lg text-white font-bold py-2 px-8 border-grey-700 hover:border-grey-800"
      >
        Delete
      </button>

      <!-- v-on เพื่อ click แล้วไปทำ go back func. -->
      <button class="btn" @click="goBack">Close</button>
    </div>
    </div>
    <!-- 
      สำหรับ edit 
     -->
    <div v-if="isedit==true">
      <ul  class="text-x">
        <li>
          <span class="font-bold">Name :</span> 
          <input type="text" v-model="name"/> 
        </li>
        <li>
          <span class="font-bold">Email :</span>
          <input type="text" v-model="email"/> 
        </li>
        <li>
          <span class="font-bold"> Role :</span>
          <input type="text" v-model="role"/> 
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
        class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
          @click="editUser" >
        UPDATE
      </button>
      </div>
      <div>
      <button class="btn" @click="goBack">Cancel</button>     
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