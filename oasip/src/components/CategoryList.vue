<script setup>
import { onBeforeMount, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
console.clear();

const router = useRouter()

defineProps({
  eventCategories: {
    type: Array,
    required: true,
  },
});

const eventCategories = ref([]);

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อรับค่า event categories และถ้าติดต่อไม่ได้ให้แสดง error
const getEventCategories = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/eventCategories`
  );
  if (res.status === 200) {
    eventCategories.value = await res.json();
  } else {
    console.log("can not get values");
  }
};
onBeforeMount(async () => {
  await getEventCategories();
});

// สร้างตัวแปรเพื่อเก็บ async func. เพื่อ fetch ไปติดต่อกับ data ที่ backend เพื่อใช้ method PUT ในการ update event categories
const editEventCategory = async (updateEventCategory) => {
  const res = await fetch(
    `${import.meta.env.VITE_APP_TITLE}/api/eventCategories/${
      updateEventCategory.id
    }`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        eventCategoryDesc: updateCat.desc,
        eventDuration: updateCat.duration,
      }),
    }
  );
};

const editCat = (id) => {
  router.push({
    name: "edit-cat",
    query: { id: id },
  });
};
</script>

<template>
  <div>
    <div class="card p-10 w-full">
      <div
        class="
          card
          dark:bg-gray-800
          shadow-xl
          m-auto
          p-6
          w-10/12
          mt-20
        "
      >
<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <div
            class="
              p-5
              rounded-lg
              text-center text-2xl
              font-bold
              dark:bg-white dark:text-black
              m-auto
            "
          >
            Category list
          </div>
    <table class=" w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-5 px-5">
                  ID
                </th>
                <th scope="col" class="py-5 px-5">Clinic Name</th>
                <th scope="col" class="py-5 px-3">Duration</th>
                <th scope="col" class="py-5 px-5">Description</th>
                <th scope="col" class="py-5 px-5"></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <!-- ใช้ v-for เพื่อ loop ข้อมูลของแต่ละ event category ออกมา -->
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                v-for="eventCategory in eventCategories"
                :key="eventCategory"
                :eventCategories="eventCategory"
              >
                <!-- v-text เพื่อ show ข้อมูลที่กำหนด -->
                <th scope="row" class="py-2 px-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ eventCategory.id }}
                </th>
                <td class="py-4 px-5">
                    {{ eventCategory.eventCategoryName }}
                </td>
                <td class="py-2 px-3">
                    {{ eventCategory.eventDuration }} mins
                </td>
                <!-- <td v-if="eventCategory.eventCategoryDesc.length == 0">-</td>
                <td v-else class="font-kanit"> -->
                <td class="py-2 px-3">
                  {{ eventCategory.eventCategoryDesc }}
                </td>
                <td class="py-2 px-3">
                    <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    @click="editCat(eventCategory.id)">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
