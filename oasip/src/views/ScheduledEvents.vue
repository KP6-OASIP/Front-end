<script setup>
import { ref, onBeforeMount } from "vue";
import EventCard from "../components/EventCard.vue";
import { useRouter } from "vue-router";
const appRouter = useRouter();
const fevents = ref([]);
const events = ref([]);
const fcategory = ref("");
const feamil = ref("");
const fstatus = ref("");
const fdate = ref("");

let token = localStorage.getItem("token");
let accountRole = localStorage.getItem("role");

const checkUserRole = () => {
  if (token == "" || token == null || token == " ") {
    appRouter.push({ name: "Home" });
  }
};

onBeforeMount(async () => {
  checkTokenAndUserRole();
});

// getAllEvents
const getEvents = async () => {
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 200) {
    events.value = await res.json();
    fevents.value = events.value;
  } else {
    console.log("can not get events");
  }
};
onBeforeMount(async () => {
  await getEvents();
});

const filter = () => {
  if (feamil.value != "") {
    fevents.value = fevents.value.filter((event) => {
      return event.bookingEmail == feamil.value;
    });
  } else if (fcategory.value != "") {
    fevents.value = fevents.value.filter((event) => {
      return event.eventCategoryID.eventCategoryName == fcategory.value;
    });
  } else if (fdate.value != "") {
    // for(let d of fevents.value){
    //   console.log(d.eventStartTime )
    // }
    // fevents.value = fevents.value.filter ( (event) =>{
    //   return event.eventStartTime.substring(0,9) == fdate.value
    // })
  } else if (fstatus.value != "") {
    if (fstatus.value == "upcoming") {
      fevents.value = fevents.value.filter((event) => {
        return new Date(event.eventStartTime) > new Date(fdate.value);
      });
    } else if (fstatus.value == "past") {
      fevents.value = fevents.value.filter((event) => {
        return new Date(event.eventStartTime) < new Date(fdate.value);
      });
    }
  }
};

const reset = () => {
  fevents.value = events.value;
  feamil.value = "";
  fcategory.value = "";
  fstatus.value = "";
  fdate.value = "";
};
</script>

<template>

  <body class="w-full bg-sky-100 dark:bg-sky-100">
    <div class="px-30 pt-10 pb-5 mx-auto"></div>
    <div class="px-30 py-10 mx-auto">
      <div class="text-2xl ml-20 font-bold dark:text-black mt-2">
        Scheduled Events
      </div>
      <div class="flex w-fit ml-20 mt-5 ">
        <!-- cat -->

        <select v-model="fcategory" class="
            flex-shrink-0
            z-10
            inline-flex
            items-center
            text-sm
            font-medium
            text-center
            rounded-l-lg
            dark:bg-gray-800
            dark:hover:bg-gray-900
            dark:focus:ring-gray-700
            dark:text-grey
            dark:border-gray-300
            box-content
            h-10
            w-52
            pb-0.5
          ">
          <option value="" disabled>Select your clinic</option>
          <option value="Back-End Clinic">Back-End clinic</option>
          <option value="Front-End Clinic">Front-End clinic</option>
          <option value="DevOps-Infra Clinic">DevOps-Infra clinic</option>
          <option value="Project Management Clinic">
            Project Management clinic
          </option>
          <option value="Business Requirements">Business Requirements</option>
        </select>
        <!-- &nbsp &nbsp -->

        <!-- eamil -->
        <div class="relative w-full">
          <input v-model="feamil" type="search" id="search-dropdown" class="
              block
              p-2.5
              w-full
              z-20
              text-sm text-gray-900
              bg-gray-50
              rounded-r-lg
              border-l-2 border border-gray-300
              focus:ring-blue-500 focus:border-blue-500
              dark:bg-gray-700
              dark:border-l-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:border-blue-500
              box-content
              w-52
            " placeholder="Input your email" />
          <button @click="filter" type="submit" class="
              absolute
              top-0
              right-0
              p-2.5
              text-sm
              font-medium
              text-white
              bg-blue-700
              rounded-r-lg
              border border-blue-700
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            ">
            <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>

        <button @click="reset" class="
            text-white
            bg-pink-600
            hover:bg-pink-500
            focus:ring-4
            font-medium
            rounded-lg
            text-md
            px-3
            py-2.5
            text-center
            dark:focus:ring-pink-600
            ml-1.5
          "
        >
          RESET

        </button>
      </div>
    </div>


    <!-- Event empty -->
    <div v-if="events.length === 0">
      <p class="text-center text-lg mt-10">Your role do not have a permission to see details.</p>
    </div>
    <!--Show event -->
    <div class="flex px-20 grid grid-cols-3 content-center">
      <!-- ทำ loop card เรียกใช้จาก db -->
      <div v-for="event in fevents" :key="event">
        <EventCard :events="event" />
      </div>
    </div>
  </body>
</template>

<style>

</style>
