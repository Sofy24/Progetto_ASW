<script setup lang="ts">

const timevalues = ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2','2012 Q3', '2012 Q4']

var chartOptions= {
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
              categories: timevalues,
            },
            colors:['#3625d2', '#edca3d', '#20b4e1','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
            fill: {
              opacity: 1
            },
            legend: {
              position: 'bottom',
              offsetX: 0,
              offsetY: 0
            },
          }


var series= [{
    name: 'PRODUCT A',
    data: [44, 55, 41, 67, 22, 43, 21, 49]
  }, {
    name: 'PRODUCT B',
    data: [13, 23, 20, 8, 13, 27, 33, 12]
  }, {
    name: 'PRODUCT C',
    data: [11, 17, 15, 15, 21, 14, 15, 13]
  }]


const labels= ['carta', 'plastica', 'lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']
var res = [] as { name: string; data: number[];}[]
for(var i=0;i<labels.length;i++){
  res[i]=({
        name: labels[i],
        data: [11, 17, 15, 15, 21, 14, 15, 13]
      })
}
</script>

<template>
  <div id="chart">
    <apexchart type="bar" height="350" :options="chartOptions" :series="res"></apexchart>
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
