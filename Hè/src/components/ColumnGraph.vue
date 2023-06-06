<script setup lang="ts">
import { ref, onMounted, toRaw} from 'vue'
import axios from 'axios'
import {getColumnData} from '../utils/api'

const props = defineProps<{
  path: string; 
}>()

const chartOptions= ref('')
const series= ref([] as number[][])
const searchQuery= ref('')
const labels= ['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
var res = ref([] as { x: string; y: number; goals:[{name: string,value:number,strokeDashArray:number,strokeColor:string}] }[])

onMounted(()=>{
  fetchData()
  //fetchOptions()
}) 
const fetchData = () => {

  getColumnData("graph").then((response) => {
      series.value = response
      console.log(series)
      for(var i=0;i<labels.length;i++){
        res.value[i]=({
        x: labels[i],
        y: toRaw(series.value)[0][i],
        goals: [
          {
            name: 'Expected',
            value: toRaw(series.value)[1][i],
            strokeDashArray: 2,
            strokeColor: '#ff0000'
          }
        ]
      })
}

    })
    .catch((error) => {
      console.error('Error retrieving municipalities names:', error)
    })
};
/*
const fetchOptions = () =>{
  axios.get('http://localhost:3000/options')
    .then((response) => {
      chartOptions.value = response.data
    })
    .catch((error) => {
      console.error('Error retrieving municipalities names:', error)
    });
};*/


console.log(res)
console.log(series)





</script>

<template>
  <div id="chart">
    <apexchart type="bar" height="350" :options="{
      chart: {
        height: 350,
        type: 'bar'
      },
      colors:['#0062CC', '#edca3d','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
      plotOptions: {
        bar: {
          distributed: true,
          columnWidth: '60%'
        }
      },
      //colors: ['#00E396'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        showForSingleSeries: true,
        customLegendItems: [/*'Actual',*/ 'kg medi'],
        markers: {
          fillColors: [/*'#00E396',*/ '#ff0000']
        }
      }
    }" :series="[
      {
        name: 'Actual',
        data: res }]"></apexchart>
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
