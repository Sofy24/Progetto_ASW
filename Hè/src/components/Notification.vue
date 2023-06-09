<script setup lang="ts">
  import { ref, watch } from "vue"
  import Card from 'primevue/card';

  const props = defineProps(["n"])

</script>


<template>
  <div v-if="n !== undefined">
  <Card class="cards" :style="{ backgroundColor: n.isRead ? 'red' : 'yellow' }">
    <template #title> Notifica </template>
    <template #subtitle>{{ n.isRead ? "Letta" : "!Da leggere" }}</template>
    <template #content>
        <p v-if="n.type === 'report'" >
          {{n.text}} <RouterLink to="/graph">Link al report</RouterLink>
        </p>
        <p v-if="n.type === 'deposit'">
          {{n.text}}
        </p>
    </template>
  </Card>
</div>
</template>

<style scoped>

.p-card {
  background-color: rgb(249, 245, 186);
}



h1 {
  font-weight: 500;
  font-size: 100%;
  top: -10px;
}
/*.p-card .p-card-subtitle */


.notify h1 {
  text-align: center;
}

@media (min-width: 1024px) {
  .notify h1 {
    text-align: left;
  }
}
</style>
