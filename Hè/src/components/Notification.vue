<script setup lang="ts">
  import { ref, watch } from "vue"
  import Card from 'primevue/card';

  const props = defineProps(["n"])
</script>


<template>
  <div v-if="n !== undefined">
  <Card class="cards" :style="{ backgroundColor: '#f9f5ba' }">
    
    <template #title> Notifica <span class="subtitle">{{ n.isRead ? "" :  "!Da leggere" }}</span></template>
    <template #content>
        <p v-if="n.type === 'report'" >
          {{n.text}}
        </p>
        <p v-if="n.type === 'deposit'">
          {{n.text}}
        </p>
    </template>
  </Card>
</div>
</template>

<style scoped>

@media (min-width: 1167px) {
  .subtitle{
    color: rgb(255, 255, 255);
    background-color: #ab0808;
    margin-left: 80%; 
    padding: 1%;
    border-radius: 5px;
    font-size: 50%;
  }
}

@media (min-width: 801px) and (max-width: 1166px) {
  .subtitle{
    color: rgb(255, 255, 255);
    background-color: #ab0808;
    margin-left: 60%; 
    padding: 1%;
    border-radius: 5px;
    font-size: 50%;
  }
}

@media (max-width: 800px) {
  .subtitle{
    color: rgb(255, 255, 255);
    background-color: #ab0808;
    margin-left: 40%; 
    padding: 1%;
    border-radius: 5px;
    font-size: 50%;
  }
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
