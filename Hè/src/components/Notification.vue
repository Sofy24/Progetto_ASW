<script setup lang="ts">
  import { ref, computed } from "vue"
  const props = defineProps(["message"])
  //const sms = ref("r")
  const displayMessage = computed(() => "Questo è il messaggio" + props.message)
</script>


<template>
  <div class="notify">
    <h1 class="green">Notifica</h1>
    <p>This is the message {{message}}</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 100%;
  top: -10px;
}




.notify h1 {
  text-align: center;
}

@media (min-width: 1024px) {
  .notify h1 {
    text-align: left;
  }
}
</style>
