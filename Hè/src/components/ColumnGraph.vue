<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps<{
  path: string; 
}>()

const chartOptions= ref('')
const series= ref('')
const searchQuery= ref('')
onMounted(()=>{
  fetchData()
  //fetchOptions()
}) 
const fetchData = () => {
  axios.get(props.path)
    .then((response) => {
      series.value = response.data
      console.log(series)
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
const labels= ['carta', 'plastica', 'lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
var res = [] as { x: string; y: number; goals:[{name: string,value:number,strokeDashArray:number,strokeColor:string}] }[]
for(var i=0;i<labels.length;i++){
  res[i]=({
        x: labels[i],
        y: 1292,
        goals: [
          {
            name: 'Expected',
            value: 1400,
            strokeDashArray: 2,
            strokeColor: '#ff0000'
          }
        ]
      })
}


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
      colors:['#3625d2', '#edca3d', '#20b4e1','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
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
          fillColors: [/*'#00E396',*/ '#775DD0']
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
