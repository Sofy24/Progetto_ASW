<script setup lang="ts">

import ImpiledGraph from '@/components/ImpiledGraph.vue'
import RadarGraph from '@/components/RadarGraph.vue'
import ColumnGraph from '@/components/ColumnGraph.vue'
import PieGraph from '@/components/PieGraph.vue'
import LineGraph from '@/components/LineGraph.vue'
import { io } from "socket.io-client"
</script>

<template>
    
  <div>
    <h3>Distribuzione dei rifiuti prodotti nel mese corrente</h3>
    <PieGraph :email='"general"'/>
  </div>
    

  <div>
    <h3>Rifiuti prodotti nel corso dell'anno (in kg) </h3>
      <LineGraph :email='"general"'/>
  </div>


  <div>
    <h3>Distribuzione rifiuti prodotti nel corso dell'anno (%)</h3>
    
    <ImpiledGraph :email='"general"'/>
    
  </div>

  
  <div>
  <h3>Confronto tra i risultati ottenuti questo mese e il mese scorso</h3>
    <RadarGraph :email='"general"' />
  </div>
  
  
  
    
  <div>
    <h3>Rifiuti depositati in questo mese rispetto alla media mensile (in kg)</h3>
    <ColumnGraph :email='"general"' />
  </div>
  
</template>

