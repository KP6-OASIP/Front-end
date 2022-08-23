<script setup>

import UserForm from '../components/UserForm.vue'
</script>

<template><body class="w-full bg-sky-100 dark:bg-sky-100 m-auto">
    <div class="p-20">
      <UserForm
        :eventCategories="eventCategories"
        :events="events"
        @createEvent="createNewEvent"
      />
    </div>
  </body>
</template>

<style></style>