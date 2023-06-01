<script setup lang="ts">
  import { ref, computed } from "vue"
  import Card from 'primevue/card';

  const props = defineProps(["type", "month", "year", "category", "weight", "money"])
  //const sms = ref("r")
  //const displayMessage = computed(() => "Questo è il messaggio" + props.message)
</script>


<template>
  <Card class="cards">
    <template #title> Notifica </template>
    <template #content>
        <p v-if="type === 'report'">
          Il tuo report riguardo al {{month}}/{{year}} è pronto! <RouterLink to="/graph">Link al report</RouterLink>
        </p>
        <p v-if="type === 'deposit'">
          Hai consegnato {{category}} di peso {{weight}} kg. Questo ti verrà a costare {{money}} euro.
        </p>
    </template>
  </Card>
</template>

<style scoped>

.cards {
  background-color: rgb(249, 245, 186);
}



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
