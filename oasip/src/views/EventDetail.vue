<script setup>
import DetailCard from '../components/DetailCard.vue'
import { onBeforeMount }from 'vue';
import { useRouter } from 'vue-router';
const appRouter = useRouter();

let token = localStorage.getItem('token')
let accountRole = localStorage.getItem('role')

const checkUserRole = () => {
    if (token == '' || token == null || token == ' ') {
        appRouter.push({ name: "Home" })
    }
}

onBeforeMount(async () => {
  checkUserRole()
})
</script>

<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100">
    <div class="p-10">
      <DetailCard />
    </div>
  </body>
</template>

<style></style>
