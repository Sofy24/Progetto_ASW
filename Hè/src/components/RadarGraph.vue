
<script setup lang="ts">
import { ref, onMounted, reactive, toRaw } from 'vue'
import { getRadarData} from '@/utils/api';

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})

const chartOptions={
  chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },
  markers: {
    size: 0
  },
  xaxis: {
    categories: ['carta', 'plastica e lattine', 'vetro', 'sfralci e potature', 'organico', 'indifferenziata','olio']
  }
}


const radarvalues= ref([] as number[][])
const series = ref([] as { name: string; data: number[]; }[])

  

onMounted(()=>{
  fetchData()
  const interval = setInterval(fetchData, 60000);
  
  return () => {
    clearInterval(interval);
  };
}) 
  const fetchData = () => {
    
    getRadarData(props.email).then((response)=>{
      radarvalues.value = response
      series.value=[{
        name: 'Questo mese',
        data: toRaw(radarvalues.value)[0],
      }, {
        name: 'Mese scorso',
        data: toRaw(radarvalues.value[1]),
      }]
    }).catch((error)=>{
        // Handle the error
        console.error(error);
      });
        // Handle the response data
        
      } 
 
</script>

<template>
  <div id="chart">
    <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
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
