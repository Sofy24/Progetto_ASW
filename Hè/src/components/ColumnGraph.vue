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
  fetchOptions()
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
const fetchOptions = () =>{
  axios.get('http://localhost:3000/options')
    .then((response) => {
      chartOptions.value = response.data
    })
    .catch((error) => {
      console.error('Error retrieving municipalities names:', error)
    });
};
</script>

<template>
  <div id="chart">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
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
