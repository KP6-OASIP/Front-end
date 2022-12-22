<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeMount } from 'vue'

const myRouter = useRouter()

let token = ref(localStorage.getItem('token'))
let accountRole = ref(localStorage.getItem('role'))

const signout = () => {
  localStorage.clear();
  sessionStorage.clear();
  location.reload();
  myRouter.push({ name: "home" });
};

</script>

<template>
  <div class="navbar bg-base-100 fixed z-50">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <router-link :to="{ name: 'home' }">
        <a class="flex items-center">
          <span class="self-center text-3xl text-black font-bold whitespace-nowrap dark:text-white">dun<span
              class="text-purple-400">turang</span></span>
        </a>
      </router-link>
      <button data-collapse-toggle="mobile-menu" type="button"
        class="inline-flex items-center p-2 ml-3 text-base xs:text-base sm:text-base md:text-xl lg:text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        aria-controls="mobile-menu" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li>
            <router-link :to="{ name: 'home' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white">
                Home</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'sch-events' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white">
                Scheduled Events</a>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'clinic-cat' }">
              <a
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white">
                Clinic Categories</a>
            </router-link>
          </li>
          <li v-if="accountRole == 'admin'">
            <router-link :to="{ name: 'add-user' }">
              <a href="#"
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white">
                Add new user</a>
            </router-link>
          </li>
          <li v-if="accountRole == 'admin'">
            <router-link :to="{ name: 'all-user' }">
              <a href="#"
                class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white">
                All users</a>
            </router-link>
          </li>
          <li v-if="token == null">
            <router-link :to="{ name: 'login-user' }">
              <div>
                <a
                  class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white">
                  Sign in</a>
              </div>
            </router-link>
          </li>
          <li v-if="token != null">
            <a href="#" @click="signout()"
              class="mt-3 text-base text-white xs:text-base sm:text-base md:text-base lg:text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-rose-500 md:p-0 dark:text-white">
              Sign out</a>
          </li>
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
