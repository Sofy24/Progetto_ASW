<script setup lang="ts">
import { ref, onMounted, toRaw} from 'vue'
import {getImpiledData} from '../utils/api'


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
  getImpiledData(props.email).then((response)=>{

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
  <div id="chart">
    <apexchart type="bar" height="350" :options=" {
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    stackType: '100%'
  },
  plotOptions: {
    bar: {
    columnWidth: '100%'
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }],
  xaxis: {
    categories: timelabels,
  },
  colors:['#0062CC', '#edca3d','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
  fill: {
    opacity: 1
  },
  legend: {
    position: 'bottom',
    offsetX: 0,
    offsetY: 0
  },
}" :series="res"></apexchart>
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
