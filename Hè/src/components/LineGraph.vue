<script setup lang="ts">
import { ref, onMounted, toRaw} from 'vue'
import {getLineData} from '../utils/api'

//const series=ref([]as number[])
onMounted(()=>{
  fetchData()
}) 

const series= ref([] as number[])
const timelabels= ref([] as number[][])
const labels= ['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
var res = ref([] as { name: string; data: number[];}[])
const fetchData = () => {
  getLineData("graph").then((response)=>{
    console.log("response")
    console.log(response)
    console.log(response[0])
    console.log(response[1])
    for(var i=0;i<labels.length;i++){
      res.value[i]=({
        name: labels[i],
        data: response[0][i]
      })
    }
    timelabels.value = response[1]
    //console.log(toRaw(series.value))
    //console.log(series.value)
  }).catch((error)=>{
        
    console.error(error);
  });        
}






/*"[{
        name: labels[0],
        data: series
      }]"*/
</script>

<template>
  <apexchart width="500" type="line" :options="{
        chart: {
          id: 'vuechart-example'
        },
        colors:['#0062CC', '#edca3d','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
        xaxis: {
          categories: timelabels
        }
      }" :series=res></apexchart>
      
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
