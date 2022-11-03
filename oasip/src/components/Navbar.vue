<script setup>
// import { ref } from '@vue/reactivity';
// import { onBeforeMount } from '@vue/runtime-core';
// export default {
//     name:'Narbar',
//     methods:{
//       logout(){
//           localStorage.clear();
//           this.$router.push({name:'login-user'})
//       }
//     }
// }
</script>

<template>
  <div class="navbar bg-base-100 fixed z-50">
    <!-- <nav class="flex justify-between items-center py-8 px-6 mx-auto max-w-screen-xl md:px-12 lg:px-16 xl:px-24"> -->
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link :to="{ name: 'home' }">
        <a class="flex items-center">
          <span
            class="self-center text-3xl text-black font-bold whitespace-nowrap dark:text-white"
            >dun<span class="text-purple-400">turang</span></span
          >
        </a>
      </router-link>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-base xs:text-base sm:text-base md:text-xl lg:text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li>
            <router-link :to="{ name: 'home' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Home</a
              >
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'sch-events' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Scheduled Events</a
              >
            </router-link>
              <!-- <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" 
              class="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent
              mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
              >Scheduled Events
              <svg class="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button> -->
                <!-- Dropdown menu -->
                <!-- <div id="dropdownNavbar" class="hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <router-link :to="{ name: 'booking-event' }">
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Booking event</a>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'sch-events' }">
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Scheduled event</a>
                    </router-link>
                  </li>
                </ul>
            </div>               -->
            
          </li>
          <li>
            <router-link :to="{ name: 'clinic-cat' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Clinic Category</a
              >
            </router-link>
          </li>         
          <li>
            <!-- <router-link :to="{ name: 'all-user' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >User</a
              >
            </router-link> -->
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" 
              class="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent
              mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
              >User
              <svg class="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                <!-- Dropdown menu -->
                <div id="dropdownNavbar" class="hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                  <li>
                    <router-link :to="{ name: 'add-user' }">
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Add new user</a>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'all-user' }">
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All users</a>
                    </router-link>
                  </li>
                </ul>
            </div>  
          </li>
          <!-- <li>
            <router-link :to="{ name: 'test' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Test</a
              >
            </router-link>
          </li>
          <!-- <li>
            <router-link :to="{ name: 'login-user' }">
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span class="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
              type="button" data-modal-toggle="authentication-modal">
              Login
              </span>
            </button>
          </router-link>
          </li> -->
          <li>
            <router-link :to="{ name: 'login-user' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Login</a
              >
            </router-link>
          </li>
          <!-- <li>
            <router-link :to="{ name: 'login-user' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white"
                >Logout</a
              >
            </router-link>
          </li>  -->
             
          <li tabindex="0" class="btn btn-ghost btn-circle avatar block md:p-0">     
              <div class="rounded-full">
                <img src="/02-3.png" />
              </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
