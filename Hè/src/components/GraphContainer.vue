<script setup lang="ts">
import WelcomeItem from "@/components/WelcomeItem.vue"
import DocumentationIcon from './icons/IconDocumentation.vue'
import ImpiledGraph from '@/components/ImpiledGraph.vue'
import RadarGraph from '@/components/RadarGraph.vue'
import ColumnGraph from '@/components/ColumnGraph.vue'
import PieGraph from '@/components/PieGraph.vue'
import LineGraph from '@/components/LineGraph.vue'
import { io } from "socket.io-client"
//import areas from '@/assets/comuni.json'
</script>

<template>
    
  <!--
    <WelcomeItem>
    <template #heading>Grafico mese corrente</template>
  <template #default>
     </WelcomeItem></template>
  -->
  <div>
    <h3>Grafico mese corrente</h3>
    <PieGraph :email='"general"'/>
  </div>
    

  <div>
    <h3>Grafico confornto kg </h3>
      <LineGraph :email='"general"'/>
  </div>


  <div>
    <h3>Grafo confronto percentuale</h3>
    
    <ImpiledGraph :email='"general"'/>
    
  </div>

  
  <div>
  <h3>Grafo confronto mese scorso</h3>
    <RadarGraph :email='"general"' />
  </div>
  
  
  
    
  <div>
    <h3>Grafo kg depositati e media</h3>
    <ColumnGraph :email='"general"' />
  </div>
  
</template>

