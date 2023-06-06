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
    
  <WelcomeItem>
    <template #heading>Grafico mese corrente</template>
    <PieGraph :email='"general"'/>
  </WelcomeItem>
  

  <WelcomeItem>
    <template #heading>Grafico confornto kg </template>
      <LineGraph :email='"general"'/>
    
  </WelcomeItem>


  <WelcomeItem>
    <template #heading>Grafo confronto percentuale</template>
    <template #default>
      <ImpiledGraph :email='"general"'/>
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Grafo confronto mese scorso</template>

    <template #default>
      <RadarGraph :email='"general"' />
    </template>
  </WelcomeItem>
  
  <WelcomeItem>
    <template #heading>Grafo kg depositati e media</template>
    <ColumnGraph :email='"general"' />
  </WelcomeItem>
</template>

