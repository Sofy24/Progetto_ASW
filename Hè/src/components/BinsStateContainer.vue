<script setup lang="ts">
import BinState from "@/components/BinState.vue"
import axios from "axios"
import { onMounted, ref } from "vue"
import {type StateOfBins} from "../types/StateOfBins"
import { sendEmail} from '@/utils/api'


const bins = ref<StateOfBins[]>([])
const municipality = ref<string>("")

const getBinState = async () => {
  try {
    sendEmail()
  .then((responseData) => {
    console.log("Response data:", responseData);
    bins.value = responseData.map((item: any): StateOfBins => {
        return {
            id: item._id,
            actual_kg: item.actual_kg,
            max_kg: item.typology[0].max_kg,
            address: item.address, 
            typology: item.typology[0].name,
            municipality: item.municipality[0].name
        }
        })
        if (bins !== undefined){
          municipality.value = bins.value[0].municipality
        }
  })
  .catch((error) => {
    console.log("Error:", error);
    // Handle the error if needed
  }); 
  } catch (e) {
    console.error(e)
  }
}
onMounted(getBinState)

</script>

<template v-if="bins !== undefined" id="templateBinState">
  <div id="currentBinContainer">
    <h1 class="title" >Stato corrente dei bidoni di {{ municipality ? municipality : "nessun comune" }}</h1>
    <BinState class="innerContainer" v-for="n in bins" :n="n"/>
  </div>
</template>

<style>
#templateBinState{
    display: flex;
}

#currentBinContainer{
    background-color: #FFC700;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2), 1px 2px 2px 0 rgba(0, 0, 0, 0.19);
    margin: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 2%;
    margin-bottom: 3%;
}
.title{
    padding:2%;
    color: black;
    text-align: center;
}

.innerContainer{
    background-color: #FFFFFF;
    padding: 3% 0 0;
    border-radius: 10px;
    margin: 3%;
    display: flex;
    justify-content: space-around;
}

</style>
