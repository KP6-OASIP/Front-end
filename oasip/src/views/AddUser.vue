<script setup>
import { computed, onBeforeMount, ref, defineAsyncComponent } from "vue";
import { useRouter } from 'vue-router';
const appRouter = useRouter();
defineEmits(["addUser"]);
const userName = ref("");
const emailUser = ref("");
const maxCountName = 100; // ตัวแปรเพื่อบอกว่า name ใส่ได้สูงสุด 100 ตัว
const minCount = 0; // ตัวแปรเพื่อบอกจำนวนตัวอักษรของ name, notes
const maxCountmail = 50;
const name = ref("");
const role = ref("");
const password = ref("")
const email = ref("");
const users = ref([]);
const userLink = `${import.meta.env.VITE_APP_TITLE}/api/users`;

let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')

const checkUserRole = () => {
  if (accountRole !== 'admin' || token == "" || token == null) {
    appRouter.push({ name: "Home" })
  }
}


//validate
const checkNameN = ref(undefined);
const checkEmailN = ref(undefined);
const submit = () => {
  //check name null
  if (name.value.length == 0) {
    checkNameN.value = true;
    console.log("name is null");
  } else checkNameN.value = false;

  //cheak email null
  if (email.value.length == 0) {
    checkEmailN.value = true;
    console.log("email is null");
  } else checkEmailN.value = false;

  //last check
  if (checkNameN.value == false && checkEmailN.value == false) {
    console.log("Name: " + name.value + " | " + "E-mail: " + email.value + " | " + "Role: " + role.value)
    addUsers();
    console.log("last check");
  }
};

const props = defineProps({
  users: {
    type: Array,
    default: [],
  },
});

const getAllusers = async () => {
  const res = await fetch(userLink, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });
  if (res.status === 201) {
    users.value = await res.json();
  } else {
    console.log("Can not get all users");
  }
};

onBeforeMount(async () => {
  checkUserRole();
  await getAllusers();
});

const addUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name.value.trim(),
      email: email.value.trim(),
      role: role.value.trim(),
      password: password.value.trim(),
    }),
  });
  if (res.status == 201) {
    console.log('Add a new user successfully')
    alert('Add a new user successfully')
  } else {
    console.log('error, cannot added')
    alert('Can not add a new user, please check it again')
  }
};
// if (res.status == 200) {
//     console.log("good status");
//   } else console.log("bad status");
// };

</script>

<template>

  <body class="w-full bg-sky-100 dark:bg-sky-100 m-auto">
    <div class="p-20">
      <div class="card bg-base-100 shadow-xl m-auto p-20 w-6/12">
        <form v-if="accountRole == 'admin'" class="leading-loose flex flex-col gap-3 w-[100%]">
          <div class="relative z-0 group">
            <input v-model="name" :maxlength="maxCountName" :minlength="minCount" type="text" id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required="" />
            <span class="text-xs ml-[95%] text-gray-400" :style="[name.length == 100 ? 'color:red' : '']">{{ minCount +
                name.length
            }}/{{ maxCountName }}</span>
            <p></p>
            <label for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input v-model="email" :maxlength="maxCountmail" :minlength="minCount" type="email" id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required="" />
            <span class="text-xs ml-[95%] text-gray-400" :style="[email.length == 50 ? 'color:red' : '']">{{ minCount +
                email.length
            }}/{{ maxCountmail }}</span>
            <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
              Please provide a valid email address.
            </p>
            <label for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <label for="underline_select"
              class="peer-focus:font-medium text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 after:content-['*'] after:ml-0.5 after:text-red-500">Role
            </label>
            <select v-model="role"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer after:content-['*'] after:ml-0.5 after:text-red-500 ">
              <option disabled value="">Select Role</option>
              <option>student</option>
              <option>admin</option>
              <option>lecturer</option>
            </select>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input v-model="password" type="password" id="floating_repeat_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required="" />
            <label
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input type="password" id="floating_repeat_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" " required="" />
            <label
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 after:content-['*'] after:ml-0.5 after:text-red-500">Confirm
              password</label>
          </div>
          <button type="submit"
            class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5"
            @click="submit()">
            Submit
          </button>
        </form>
        <div v-else>
          <p class="text-center text-lg mt-10">Your role do not have a permission to see details.</p>
        </div>
      </div>

    </div>
  </body>
</template>

<style>

</style>
