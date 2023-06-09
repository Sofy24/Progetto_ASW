<script setup lang="ts">
import Notification from "@/components/Notification.vue"
import axios from "axios"
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


/*const getNotifications = async () => {
  try {
    const data = (await axios.get("http://localhost:3000/notification")).data
    notifications.value = data
    
  } catch (e) {
    console.error(e)
  }
}
onMounted(getNotifications)*/


/*import axios from "axios"
import { onMounted, ref } from "vue"
import MovieMiniCard from "@/components/MovieMiniCard.vue"
import replaceByDefault from "@/lib/replaceByDefault"

const movie = ref({})

const getLastMovie = async () => {
  try {
    const data = (await axios.get("http://localhost:3000/movies?last")).data
    if (data.poster != null && data.poster !== "") {
      data.poster = data.poster.replace("http://ia.media-imdb.com/", "https://m.media-amazon.com/")
    } else {
      data.poster = "https://www.stillisolutions.com/wp-content/uploads/2017/09/no-image-box-300x155.png"
    }
    movie.value = data
  } catch (e) {
    console.error(e)
  }
}
onMounted(getLastMovie)*/
</script>

<template v-if="notifications !== undefined">
  <Notification type="report" year="2023" month="aprile"/>
  <Notification v-for="n in notifications" :n="n"/>

  <!--<div class="notificationContainer">
    <div class="last">
      <div class="coverImage"><img :src="movie.poster" class="card-img" alt="" @error="replaceByDefault" /></div>
      <div class="pattern"></div>
      <div class="coverText">
        <div>
          <h1>{{ movie.title }}</h1>
          <p>{{ movie.plot }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid d-flex justify-content-center gap-5">
    <MovieMiniCard id="5692a15524de1e0ce2dfcfa3" />
    <MovieMiniCard id="5692a56f24de1e0ce2dfdd0b" />
    <MovieMiniCard id="5692a57524de1e0ce2dfdd14" />
  </div>-->
</template>

<style>
.homeContainer {
  margin-bottom: 200px;
}
.last {
  margin: 50px;
  border-radius: 30px;
  box-sizing: border-box;
  overflow: hidden;
}
.last > * {
  width: 100%;
  height: 500px;
}
.coverImage {
  filter: blur(5px);
  position: relative;
  overflow: hidden;
  margin-bottom: -500px;
}
.coverImage img {
  margin-top: -200px;
}
.pattern {
  position: relative;
  background-image: url("https://pngimg.com/uploads/dot/dot_PNG4.png");
  background-repeat: repeat;
  background-size: 5px;
  opacity: 0.5;
  margin-bottom: -500px;
}
.coverText {
  justify-content: center;
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;
}
.coverText div {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  margin: auto;
  padding: 20px 40px;
  text-align: center;
}
.filmCard {
  width: 30%;
  box-sizing: border-box;
  height: 200px;
  display: inline-flex;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 10px;
  overflow: hidden;
  background-color: #f5f5f5;
}
.filmCard h1 {
  font-size: 22px;
}
.filmCardImg {
  height: 100%;
}
.filmCardImg img {
  height: 100%;
  width: auto;
}
.filmCardTxt {
  padding: 2px;
}
</style>
