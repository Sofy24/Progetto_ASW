<script setup lang="ts">
import WelcomeItem from "@/components/WelcomeItem.vue"
import DocumentationIcon from './icons/IconDocumentation.vue'
import GrafoProva from '@/components/ImpiledGraph.vue'
import GrafoProva2 from '@/components/RadarGraph.vue'
import ColumnGraph from '@/components/ColumnGraph.vue'
import PieGraph from '@/components/PieGraph.vue'
//import areas from '@/assets/comuni.json'
</script>

<template>
    
  <WelcomeItem>
    <PieGraph/>
  </WelcomeItem>
  

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Grafico prova2</template>

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
  </WelcomeItem>


  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Grafo prova 3</template>

    <template #default>
      <GrafoProva/>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Grafo prova 4</template>

    <template #default>
      <GrafoProva2 :series="[{
            name: 'Series 1',
            data: [80, 50, 30, 40, 100, 20],
          }, {
            name: 'Series 2',
            data: [20, 30, 40, 80, 20, 80],
          }, {
            name: 'Series 3',
            data: [44, 76, 78, 13, 43, 10],
          }]" :chart-options="{
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
              categories: ['2011', '2012', '2013', '2014', '2015', '2016']
            }
          }" />
    </template>
  </WelcomeItem>
  
  <WelcomeItem>
    <ColumnGraph :path="'http://localhost:3000/data'" />
  </WelcomeItem>
</template>

