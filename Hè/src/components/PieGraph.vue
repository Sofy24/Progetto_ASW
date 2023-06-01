<script setup lang="ts">

var series=[44, 55, 41, 17, 15, 10, 10,20]
</script>

<template>
  <div id="chart">
        <apexchart type="donut" :options="{
            chart: {
              type: 'donut',
            },
            labels: ['carta', 'plastica', 'lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio'],
            colors:['#3625d2', '#edca3d', '#20b4e1','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
            //fill:{
              //colors:['#3d63ed', '#edca3d', '#ed663d','#3ded49','#742727','#742727','#bdbdbd']
            //},
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
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
