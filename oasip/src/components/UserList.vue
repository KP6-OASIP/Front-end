<script setup>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
console.clear()

const router = useRouter()

defineProps({
  users: {
    type: Array,
    required: true,
  },
})

const users = ref([])

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
   <div>
    <div class="card p-10 w-full">
      <div
        class="
          card
          lg:card-side
          bg-base-100
          shadow-xl
          m-auto
          p-5
          w-auto

        "
      >
        <div class="overflow-x-auto">
          <div
            class="
              p-5
              rounded-lg
              text-center text-2xl
              font-bold
              dark:bg-white dark:text-black
            "
          >
            All Users
          </div>
          <table class="table table-zebra ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in users"
                :key="user"
                :users="user"
              >
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.role }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
 
<style>

</style>