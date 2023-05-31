<script setup lang="ts">
defineProps<{
  series: { name: string; data: number[]; }[]
  chartOptions: { chart: { height: number; type: string; dropShadow: { enabled: true; blur: number; left: number; top: number; }; }; title: { text: string; }; stroke: { width: number; }; fill: { opacity: number; }; markers: { size: number; }; xaxis: { categories:string[]; }; } 
}>()
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
