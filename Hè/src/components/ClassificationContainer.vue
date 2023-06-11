<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import {type Classification} from "../types/Classification"



const classification = ref<Classification[]>([])

const getPercentage = async () => {
  try {
    const data = (await axios.get("http://localhost:3000/classification")).data
    classification.value = data.map((item: any): Classification => {
        return {
            municipality: item[0],
            percentage: item[1]
        }
        })
  } catch (e) {
    console.error(e)
  }
}
onMounted(getPercentage)

</script>

<template v-if="classification !== undefined" id="templateClassification">
  <div id="OuterContainer">
    <h1 id="title">Classifica dei comuni più virtuosi</h1>
    <h2>Viene mostrata la percentuale dei rifiuti riciclati sul totale dei rifiuti</h2>
    <div id="InnerContainer">
      <ol>
        <li v-for="i in classification" class="item">{{ i.municipality }} = {{ i.percentage }}%</li>
      </ol> 
    </div>
  </div>
</template>

<style lang="scss">
#templateClassification{
    display: flex;
    
}

#OuterContainer{
    background-color: #FFC700;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.2), 1px 2px 2px 0 rgba(0, 0, 0, 0.19);
    margin: auto;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-bottom: 2%;
    margin-top: 2%;

    h2{
      padding: 0 3% 0;
      text-align: center;
    }
}


#InnerContainer{
  background-color: #FFFFFF;
  padding: 3% 0 0;
  border-radius: 10px;
  margin: 3%;
}

.item{
  font-size: 125%;
  padding: 1% 2% 1%;
}

#title{
    padding: 3% 3% 0;
    color: black;
    text-align: center;
}


</style>
