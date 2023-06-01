<script setup lang="ts">

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
  var chartOptions= {
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              stackType: '100%'
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
              categories: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2012 Q1', '2012 Q2',
                '2012 Q3', '2012 Q4'
              ],
            },
            fill: {
              opacity: 1
            },
            legend: {
              position: 'right',
              offsetX: 0,
              offsetY: 50
            },
          }

</script>

<template>
  <apexchart width="500" type="line" :options="{
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      }" :series="[{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]"></apexchart>
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
