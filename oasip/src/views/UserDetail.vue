<script setup>
import DetailUserCard from "../components/DetailUserCard.vue";
import { ref,onBeforeMount }from 'vue';
import { useRouter } from 'vue-router';

let token = localStorage.getItem("token");
let accountRole = localStorage.getItem("role");

const appRouter = useRouter();

const checkTokenAndUserRole = () => {
  if (token == "" || token == null) {
    alert("กรุณาเข้าสู่ระบบก่อนใช้งาน");
    appRouter.push({ name: "Login" });
  } else if (accountRole !== "admin") {
    alert("คุณไม่มีสิทธิ์ใช้งานหน้านี้");
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
    