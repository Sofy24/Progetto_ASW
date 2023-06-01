<script setup lang="ts">

const series= [30, 40, 45, 50, 49, 60, 70, 91]
const timelabels= [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
const labels= ['carta', 'plastica', 'lattine', 'vetro', 'potature', 'organico', 'indifferenziata','olio']

var res = [] as { name: string; data: number[];}[]
for(var i=0;i<labels.length;i++){
  res[i]=({
        name: labels[i],
        data: [30, 40, 45, 50, 49, 60, 70, 91-i]
      })
}


/*"[{
        name: labels[0],
        data: series
      }]"*/
</script>

<template>
  <apexchart width="500" type="line" :options="{
        chart: {
          id: 'vuechart-example'
        },
        colors:['#3625d2', '#edca3d', '#20b4e1','#097416','#3ded49','#742727','#bdbdbd','#ff671b'],
        xaxis: {
          categories: timelabels
        }
      }" :series=res></apexchart>
      
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
