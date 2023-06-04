<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
 
</template>


<script lang="ts">
  import { getServerData } from "@/utils/api";
  /*
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });*/
  
  export default {
    async mounted() {
      try {
        const response = await getServerData("about");
        // Handle the response data
        console.log(response);
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }    
  }
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
