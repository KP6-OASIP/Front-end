<script setup>
  import { computed, onBeforeMount, ref, defineAsyncComponent } from 'vue'
  
  defineEmits(['addUser'])
  const userName = ref('')
  const emailUser = ref('')
  const role = ref('')
  const maxCountName = 100 // ตัวแปรเพื่อบอกว่า name ใส่ได้สูงสุด 100 ตัว
  const minCount = 0 // ตัวแปรเพื่อบอกจำนวนตัวอักษรของ name, notes
  const name = ref('')
  const maxCountmail = 50
  const email = ref('')
  const users =ref([])
  const userLink = `${import.meta.env.VITE_APP_TITLE}/api/users`
  
  //validate
  const checkNameN = ref(undefined)
  const checkEmailN = ref(undefined)
  const submit = ()=>{
  
  //check name null
  if(name.value.length == 0){
    checkNameN.value = true
    console.log('name is null')
  }else checkNameN.value = false
  
  //cheak email null
  if(email.value.length == 0){
    checkEmailN.value = true
    console.log('email is null')
  }else checkEmailN.value = false
  
  //last check
  if(checkNameN.value == false && checkEmailN.value == false){
    addUsers()
    console.log('last check')
  }
    // console.log(name.value)
    // console.log(email.value)
    // console.log(role.value)
  }
  
  const props = defineProps({
    users: {
      type: Array,
      default: [],
    }
  })
  
  const getAllusers = async () => {
    const res = await fetch(
      userLink
    )
    if (res.status === 201) {
      users.value = await res.json()
    } else {
      console.log('can not get values')
    }
  }
  onBeforeMount(async () => {
    await getAllusers()
  })
  
  const addUsers = async () => {
    const  res = await fetch(userLink, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value ,
        email: email.value,
        role: role.value
      })
    }) ;
    if (res.status === 201) {
    const addEvent = await res.json()
    events.value.push(addEvent)
    console.log('Booked Successfully')
    alert('Booked Successfully')
    router.go(-1)
  } else  {
  console.log('error, cannot create')
  alert('Cannot book, please check it again')
  }
}
  </script>
  
  <template>
    <body class="w-full bg-sky-100 dark:bg-sky-100 m-auto">
      <div class="p-20">
  <div class="card bg-base-100 shadow-xl m-auto p-20 w-6/12 ">
  <form class="leading-loose flex flex-col gap-3 w-[100%] ">
    <div>
              <p class="font-bold after:content-['*'] after:ml-0.5 after:text-red-500">
                Name :
              </p>
              <input
                placeholder=" Input your name"
                v-model="name"
                :maxlength="maxCountName"
                :minlength="minCount"
                class="bg-white border border-gray-300 text-black text-m focus:ring-0 w-[100%] rounded-lg"
              />
              <span class="text-xs ml-[95%] text-gray-400"
              :style="[name.length == 100?'color:red':'']"
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
              <span class="text-xs ml-[95%] text-gray-400"
              :style="[email.length == 50?'color:red':'']"
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
            <button class="text-white bg-pink-400 hover:bg-pink-600 focus:ring-0 focus:ring-pink-600 font-medium rounded-lg text-sm px-5 py-2.5" 
            @click="submit">Submit</button>
          </div>
  </form>
  </div>
  </div>  
  </body> 
  </template>
  
  <style></style>