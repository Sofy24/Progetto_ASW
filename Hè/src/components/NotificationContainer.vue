<script setup lang="ts">
import Notification from "@/components/Notification.vue"
import { onMounted, ref } from "vue"
import {type Note} from "../types/Note"
import { getNotifications} from '@/utils/api'

const notifications = ref<Note[]>([])

onMounted(()=>{
  fetchData()
  const interval = setInterval(fetchData, 60000);
  
  return () => {
    clearInterval(interval);
  };
}) 


const fetchData = () => {

  getNotifications("ciaoo").then((response)=>{
    notifications.value = []
    console.log("this is response2, i'm client", response)
    notifications.value = response.map((item: any): Note => {
    return {
      date: item.date,
      email: item.email,
      isRead: item.isRead,
      text: item.text,
      type: item. type
    }
  })
    console.log("notifications print", notifications)
    }).catch((error)=>{
        // Handle the error
        console.error(error);
      });
        // Handle the response data
        
      } 

</script>

<template v-if="notifications !== undefined">
  <h1>Notifiche</h1>
  <div id="containerNotification">
    <Notification class="notificationElement" v-for="n in notifications" :n="n"/>
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

</style>
