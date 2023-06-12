<script setup lang="ts">
import { ref, onMounted, toRaw, onUpdated} from 'vue'
import {getLineData} from '../utils/api'

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

onMounted(()=>{
  fetchData()
  const interval = setInterval(fetchData, 60000);
  
  return () => {
    clearInterval(interval);
  };
}) 

const series= ref([] as number[])
const timelabels= ref([] as number[][])
const labels= ['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
var res = ref([] as { name: string; data: number[];}[])
const fetchData = () => {
  getLineData(props.email).then((response)=>{

    for(var i=0;i<labels.length;i++){
      res.value[i]=({
        name: labels[i],
        data: response[0][i]
      })
    }
    timelabels.value = response[1]
    
  }).catch((error)=>{
        
    console.error(error);
  });        
}




</script>

<template>

  <apexchart height="350" type="line" :options="{
        chart: {
          id: 'vuechart-example'
        },
        colors:['#0062CC', '#edca3d','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
        xaxis: {
          categories: timelabels
        }
      }" :series=res></apexchart>
      
</template>



