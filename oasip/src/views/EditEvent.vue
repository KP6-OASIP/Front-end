<script setup>
import EditEventForm from '../components/EditEventForm.vue'
import { useRouter } from 'vue-router';
const appRouter = useRouter();
let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')

const checkUserRole = () => {
    if (accountRole == 'lecturer' || token == '' || token == null || token == ' ') {
        appRouter.push({ name: "Home" })
    }
}

onBeforeMount(async () => {
  checkUserRole();
})
</script>

<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100">
    <div class="p-20">
      <EditEventForm />
    </div>
  </body>
</template>

<style></style>
