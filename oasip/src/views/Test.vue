<!-- <script setup></script>

<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100 m-auto">
    <div class="p-20">
      <div class="card bg-base-100 shadow-xl m-auto p-20 w-6/12">
        <form class="leading-loose flex flex-col gap-3 w-[100%]">
          <div>
            <p
              class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Name :
            </p>
            <input
              placeholder=" Input your name"
              v-model="name"
              :maxlength="maxCountName"
              :minlength="minCount"
              class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            />
            <span
              class="text-xs ml-[95%] text-gray-400"
              :style="[name.length == 100 ? 'color:red' : '']"
              >{{ minCount + name.length }}/{{ maxCountName }}</span
            >
          </div>
          <div>
            <p
              class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >
              Email :
            </p>
            <input
              placeholder=" Input your email"
              type="email"
              v-model="email"
              :maxlength="maxCountmail"
              :minlength="minCount"
              class="peer bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
            />
            <span
              class="text-xs ml-[95%] text-gray-400"
              :style="[email.length == 50 ? 'color:red' : '']"
              >{{ minCount + email.length }}/{{ maxCountmail }}</span
            >
            <p
              class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
            >
              Please provide a valid email address.
            </p>
          </div>
          <p
            class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
          >
            Role :
          </p>
          <select
            v-model="role"
            class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] h-8 rounded-lg"
          >
            <option disabled value="">Select Role</option>
            <option>student</option>
            <option>admin</option>
            <option>lecturer</option>
          </select>
          <div>
            <button
              class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
              @click="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </body>
</template>

<style></style> -->
