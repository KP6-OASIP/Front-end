<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";

const { params } = useRoute();
const route = useRoute();
const router = useRouter();
const getDetails = ref({});
const currenEvent = ref({});
const goBack = () => router.go(-1); // ให้กลับไปหน้าก่อนหน้า

let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend และถ้าติดต่อไม่ได้ให้แสดง error
const getEventById = async (id) => {
  if (route.query.id) {
    const id = route.query.id;
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      getDetails.value = data;
    } else {
      console.log("can not get values");
    }
  }
};
onBeforeMount(async () => {
  await getEventById();
});

// สร้างตัวแปร เพื่อเรียกใช้และส่งไปหน้าต่อไป ตาม id
const editEvent = (id) => {
  console.log(id);
  router.push({
    name: "edit-event",
    query: { id: id },
  });
};

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อลบข้อมูลตาม id โดยเมื้อลบสำเร็จให้กลับไปที่หน้าก่อนหน้า
const removeEvent = async () => {
  if (confirm("Would you like to cancel your appointment?") == true) {
    const res = await fetch(
      `${import.meta.env.VITE_APP_TITLE}/api/events/${route.query.id}`,
      {
        method: "DELETE",
      }
    );
    router.go(-1);
  } else {
  }
};
</script>

<template>
  <div
    class="
      card card-side
      bg-base-100
      font-kanit
      shadow-xl
      dark:border-gray-700
      w-7/12
      m-auto
      mt-20
    "
  >
    <figure><img class="w-96" src="/wall1.jpeg" alt="photo" /></figure>
    <div class="card-body p-20">
      <h2 class="card-title font-bold text-3xl">Event Detail</h2>
      <ul class="text-x">
        <li>
          <span class="font-bold">Name :</span> {{ getDetails.bookingName }}
        </li>
        <li>
          <span class="font-bold">Email :</span> {{ getDetails.bookingEmail }}
        </li>
        <li>
          <span class="font-bold"> Date :</span>
          {{ dayjs(getDetails.eventStartTime).format("DD MMM YYYY") }}
        </li>
        <li>
          <span class="font-bold"> Start Time :</span>
          {{ dayjs(getDetails.eventStartTime).format("HH:mm") }}
        </li>
        <li>
          <span class="font-bold">Duration :</span>
          {{ getDetails.eventDuration }} minutes
        </li>
        <li>
          <span class="font-bold">Category :</span>
          {{ getDetails.eventCategory?.eventCategoryName }}
        </li>
        <li
          v-if="
            getDetails.eventNotes == undefined ||
            getDetails.eventNotes == null ||
            getDetails.eventNotes.length == 0
          "
        >
          <span class="font-bold">Note:</span> -
        </li>
        <li v-else>
          <span class="font-bold">Note:</span> {{ getDetails.eventNotes }}
        </li>
      </ul>
      &nbsp;
      <!-- v-on เพื่อ click แล้วไปทำ edit event func. -->
      <button
        type="button"
        @click="editEvent(getDetails.id)"
        class="
          bg-yellow-500
          w-[100%]
          hover:bg-gray-400
          rounded-lg
          text-white
          font-bold
          py-2
          px-10
          border-gray-700
          hover:border-gray-500
        "
      >
        EDIT
      </button>

      <!-- v-on เพื่อ click แล้วไปทำ remove event func. -->
      <button
        type="button"
        @click="removeEvent"
        class="
          bg-red-700
          hover:bg-gray-700
          rounded-lg
          text-white
          font-bold
          py-2
          px-8
          border-grey-700
          hover:border-grey-800
        "
      >
        DELETE
      </button>

      <!-- v-on เพื่อ click แล้วไปทำ go back func. -->
      <button class="btn" @click="goBack">Close</button>
    </div>
  </div>
</template>

<style></style>
