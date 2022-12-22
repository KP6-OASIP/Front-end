<script setup>
import DetailUserCard from "../components/DetailUserCard.vue";
import { ref,onBeforeMount }from 'vue';
import { useRouter } from 'vue-router';

let token = localStorage.getItem("token");
let accountRole = localStorage.getItem("role");

const appRouter = useRouter();

const checkTokenAndUserRole = () => {
  if (token == "" || token == null) {
    alert("Please, Sign in first");
    appRouter.push({ name: "Login" });
  } else if (accountRole !== "admin") {
    alert("Your role do not have a permission to see details. Please, contact to your admin.");
    appRouter.push({ name: "Home" });
  }
};

onBeforeMount(async () => {
  checkTokenAndUserRole()
})
</script>
    
<template>
  <body class="w-full bg-sky-100 dark:bg-sky-100">
    <div class="p-10">
      <DetailUserCard />
    </div>
  </body>
</template>
    
<style></style>
    