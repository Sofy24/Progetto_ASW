<script setup lang="ts">
import { ref, onMounted, reactive, toRaw } from 'vue'
import axios from 'axios'

const props = defineProps<{
  path: string; 
}>()

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
            title: {
              text: 'Radar Chart - Multi Series'
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
              categories: ['carta', 'plastica e lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
            }
          }

const radarvalues= ref([] as number[][])
const series = ref([] as { name: string; data: number[]; }[])
onMounted(()=>{
  fetchData()
  //fetchOptions()
}) 
const fetchData = () => {
  axios.get(props.path)
    .then((response) => {
      radarvalues.value = response.data
      console.log(toRaw(radarvalues.value))
      console.log(radarvalues.value)
      series.value=[{
        name: 'This Month',
        data: toRaw(radarvalues.value)[0],
      }, {
        name: 'Last month',
        data: toRaw(radarvalues.value[1]),
      }]
      console.log(series)
    })
    .catch((error) => {
      console.error('Error retrieving municipalities names:', error)
    })
};

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
