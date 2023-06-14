<script setup lang="ts">
import Notification from "@/components/Notification.vue"
import { onMounted, ref, computed } from "vue"
import {type Note} from "../types/Note"
import { getNotifications, getNotReadNotification} from '@/utils/api'
import LoadingScreen from '@/components/LoadingScreen.vue'

const notifications = ref<Note[]>([])
const isDataLoaded = ref<boolean>(false)
const notRead = ref<number>(0)
const currentIndex = ref<number>(0)
const itemsPerPage = ref<number>(5)

onMounted(()=>{
  fetchData()
  const interval = setInterval(fetchData, 6000);
  
  return () => {
    clearInterval(interval);
  };
}) 


const fetchData = () => {
  //get all the notifications given the email of the user
  getNotifications("notificationss").then((response)=>{
    notifications.value = []
    notifications.value = response.map((item: any): Note => {
    return {
      id: item._id,
      date: item.date,
      email: item.email,
      isRead: item.isRead,
      text: item.text,
      type: item. type
    }
    })
    isDataLoaded.value = true
    }).catch((error)=>{
        // Handle the error
        console.error(error)
        isDataLoaded.value = false
    })
        
  //get the notifications not read    
  getNotReadNotification("not read").then((res) =>{
    notRead.value = res
  }).catch((error)=>{
        // Handle the error
        console.error(error)
    })

    
  } 
  //calculate the items to be visualized
  const visibleItems = computed(() => {
    const start = currentIndex.value * itemsPerPage.value
    const end = start + itemsPerPage.value
    return notifications.value.slice(start, end)
  })

  //calculate the first and the last page to disable/enable the buttons
  const isFirstPage = computed(() => currentIndex.value === 0);
  const isLastPage = computed(() => {
    const maxIndex = Math.ceil(notifications.value.length / itemsPerPage.value) - 1;
    return currentIndex.value === maxIndex;
  });

//to show the previous page
function previous() {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  }

//to show the next page
function next() {
  const maxIndex = Math.ceil(notifications.value.length / itemsPerPage.value) - 1
  if (currentIndex.value < maxIndex) {
    currentIndex.value++
  }
}

</script>

<template v-if="notifications !== undefined">
  <div v-if ="isDataLoaded">
  <h1 id="titleNotifiche">Notifiche</h1>
  <div id="containerCounter">
    <h2 id="notReadCounter">Notifiche da leggere:</h2>
    <p id="counter">{{ notRead }}</p>
  </div>
  <div id="containerNotification">
    <Notification class="notificationElement" v-for="n in visibleItems" :n="n"/>
  </div>
  <div class="button-container">
    <button class="prevnext" @click="previous" :disabled="isFirstPage">Precedente</button>
    <button class="prevnext" @click="next" :disabled="isLastPage">Successivo</button>
  </div>
  </div>
  <div v-else>
      <LoadingScreen />
  </div>
</template>

<style>
@media (min-width: 551px) {
  #containerNotification{
    width: 80%;
    margin: auto;
  }

  .notificationElement{
    margin-bottom: 1%;
  }
}

@media (max-width: 550px) {
  #containerNotification{
    width: 90%;
    margin: auto;
  }

  .notificationElement{
    margin-bottom: 3%;
  }
}

#titleNotifiche{
    text-align: center;
    margin: 1% 0 1%;
  }

#notReadCounter{
  font-size: small;
  margin-bottom: 2%;
}

#counter{
  font-size: small;
  text-align: center;
  margin-bottom: 2%;
  margin-left: 1%;
  background-color: #ab0808;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  width: 40px;
}

#containerCounter{
  margin-right: 10%;
  display: flex;
  justify-content: flex-end;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 2%;
  margin-bottom: 2%;

}
      
.prevnext {
    background-color: #FFC700;
    border-radius: 10px;
    color: black;
    padding: 1% 2%;
    font-size: large;
    text-align: center;
    border: 0px;
    transition: background-color 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  .prevnext:active {
      background-color: lighten(#FFC700, 30%);
  }

  .prevnext:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      box-shadow: none;
  }

</style>
