<script setup lang="ts">
import { ref, onMounted, toRaw, onUpdated, onBeforeUpdate, watchEffect, reactive, onServerPrefetch} from 'vue'
import {getPieData, getPieDataPeriodically} from '../utils/api'
import { defineProps } from 'vue'

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

const series=ref([]as number[])
onMounted(()=>{
  fetchData()
  const interval = setInterval(fetchData, 60000);
  
  return () => {
    clearInterval(interval);
  };
})

const fetchData = () => {
  
  getPieData(props.email).then((response)=>{
    series.value = response
    
  }).catch((error)=>{
        
    console.error(error);
  });        

} 


</script>

<template>
  <div id="chart">
        <apexchart type="donut" :options="{
            chart: {
              type: 'donut',
            },
            labels: ['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio'],
            colors:['#0062CC', '#edca3d','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
            responsive: [{
              breakpoint: 325,
              options: {
                legend: {
                  position: 'bottom'
                }
              }
            }]}" :series="series"></apexchart>
      </div>
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
