<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
console.clear()

  defineProps({
    users: {
      type: Array,
      required: true,
    },
  });
  
  const router = useRouter()

  const showDetails = (id) => {
    router.push({
      name: 'user-detail',
      query: { id: id },
    })
  }
  // const users = ref([])
  
  // const getUsers = async () => {
  //   const res = await fetch(`${import.meta.env.VITE_APP_TITLE}/api/users`)
  //   if (res.status === 200) {
  //     users.value = await res.json()
  //   } else {
  //     console.log("can not get values")
  //   }
  // };
  // onBeforeMount(async () => {
  //   await getUsers()
  // });

  

  </script>
  
  <template>
    <div @click="showDetails(users.id)">
    <!-- <router-link :to="`/event-detail?id=${events.id}`"> -->
    <!-- <div
        class="card card-side max-w-ml bg-white rounded-lg border border-gray-200 p-10 shadow-md hover:bg-gray-100 hover:ring-gray-100 dark:bg-gray-800 dark:border-gray-700 text-kanit cursor-pointer"
      > -->
    <div
      class="card card-side m-4 bg-base-100 shadow-xl w-auto h-50 flex items-stretch px-5 dark:border-gray-700 text-kanit cursor-pointer hover:bg-gray-100"
    >
      <!-- <div class="flex flex-col w-full"> -->
      <figure>
        <img class="shrink-0 mb-14 w-20 rounded-full" src="/02-2.png" alt="1" />
      </figure>
      <div class="card-body">
        <h5 class="mb-1 text-left font-kanit text-gray-900 dark:text-white">
          <div class="ltr:ml-3">
            <p class="font-bold text-2xl">
              {{
                users.name && users.name.length < 14
                  ? users.name
                  : users.name.substring(0, 14) + '...'
              }}
            </p>
            <p class="text-gray-500 dark:text-white">
              <!-- Email : -->
              {{ users.email }}
            </p>
            <div
              class="bg-gray-200 p-1 rounded-lg text-center dark:bg-white dark:text-black"
            >
            {{ users.role}}
            </div>
          </div>
          <br />
        </h5>
      </div>
    </div>
  </div>
  </template>
  
  <style></style>
  