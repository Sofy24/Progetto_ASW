<script setup lang="ts">
import BinState from "@/components/BinState.vue"
import { onMounted, ref } from "vue"
import {type Note} from "../types/Note"
//import { getNotifications} from '@/utils/api'

//const bins = ref<Note[]>([])

onMounted(()=>{
  fetchData()
  const interval = setInterval(fetchData, 60000);
  
  return () => {
    clearInterval(interval);
  };
}) 


const fetchData = () => {

  /*getNotifications("ciaoo").then((response)=>{
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
        */
      } 

</script>

<template v-if="bins !== undefined">
  
</template>

<style>
</style>
