<script setup lang="ts">
  import Card from 'primevue/card'
  import { ref } from "vue"
  import Dialog from 'primevue/dialog'
  import { readNotification} from '@/utils/api'

  function reading() {
    props.n.isRead = false
    read.value = true
    readNotification(props.n.id)
}

const props = defineProps(["n"])
const visible = ref(false)
const read = ref(props.n.isRead)

</script>


<template>
  <div v-if="n !== undefined">
  <template>
    <div class="card flex justify-content-center">
        <Dialog v-model:visible="visible" modal header="Notifica" :style="{ width: '50vw' }">
            <p>{{ n.text }} </p>
        </Dialog>
    </div>
  </template>
  <Card class="cards" @click="reading(), visible = true" :style="{ backgroundColor: '#f9f5ba' }">
    <template #title> Notifica <span v-if="read === false" class="subtitle">"!Da leggere"</span></template>
    <template #content>
        <p v-if="n.isRead === true || read === true" >
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
    margin-left: 30%; 
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

.cardsContainer:hover{
  background-color: blue;
}


</style>
