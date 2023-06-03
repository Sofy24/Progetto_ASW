<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form @submit.prevent="onSubmit">
    <input v-model="value" />

    <button type="submit" :disabled="isLoading">Submit</button>
  </form>
  </div>
 
</template>


<script>
  import { socket } from "@/socket";
  socket.on("hello", (arg) => {
    console.log(arg); // world
  });
  export default {
    name: "MyForm",

    data() {
      return {
        isLoading: false,
        value: ""
      }
    },

    methods: {
      onSubmit() {
        this.isLoading = true;

        socket.timeout(5000).emit("create-something", this.value, () => {
          this.isLoading = false;
        });
      },
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
