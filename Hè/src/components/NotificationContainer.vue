<script setup lang="ts">
import Notification from "@/components/Notification.vue"
import { onMounted, ref } from "vue"
import {type Note} from "../types/Note"
import { getNotifications, getNotReadNotification} from '@/utils/api'
import LoadingScreen from '@/components/LoadingScreen.vue'

const notifications = ref<Note[]>([])
const isDataLoaded = ref<boolean>(false)
const notRead = ref<number>(0)

onMounted(()=>{
  fetchData()
  const interval = setInterval(fetchData, 6000);
  
  return () => {
    clearInterval(interval);
  };
}) 


const fetchData = () => {

  getNotifications("notificationss").then((response)=>{
    notifications.value = []
    console.log("this is response2, i'm client", response)
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
        // Handle the response data
      
  getNotReadNotification("not read").then((res) =>{
    //insert res
    console.log("res count", res)
    notRead.value = res
  }).catch((error)=>{
        // Handle the error
        console.error(error)
    })
} 

</script>

<template v-if="notifications !== undefined">
  <div v-if ="isDataLoaded">
  <h1>Notifiche</h1>
  <div id="containerCounter">
    <h2 id="notReadCounter">Notifiche da leggere:</h2>
    <p id="counter">{{ notRead }}</p>
  </div>
  <div id="containerNotification">
    <Notification class="notificationElement" v-for="n in notifications" :n="n" :notRead="notRead"/>
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

h1{
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

</style>
