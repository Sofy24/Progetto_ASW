<script setup lang="ts">
    import { onMounted, ref, reactive  } from 'vue'
    import { useRouter } from 'vue-router'
    import { verifyToken } from '@/utils/tokenUtils'
    import UserPieContainer from './UserPieContainer.vue';
    import WelcomeItem from "@/components/WelcomeItem.vue"
    import DocumentationIcon from './icons/IconDocumentation.vue'
    import ImpiledGraph from '@/components/ImpiledGraph.vue'
    import RadarGraph from '@/components/RadarGraph.vue'
    import ColumnGraph from '@/components/ColumnGraph.vue'
    import PieGraph from '@/components/PieGraph.vue'
    import LineGraph from '@/components/LineGraph.vue'

    const userEmail = ref('')
    const router = useRouter()
    const data = reactive({
        isDataLoaded: false,
    })

    onMounted(async () => {
        verifyToken()
        .then(result => {
            userEmail.value = result
            data.isDataLoaded = true
        }).catch(error => {
            router.push('/login')
        });
    })
</script>

<template>
    <h1>I tuoi grafici</h1>
  <div v-if="data.isDataLoaded"  class="grid">

    
    <div>
        <h3>Distribuzione dei rifiuti prodotti nel mese corrente</h3>
        
        <PieGraph :email="userEmail" />
        
    </div>
    

    <div>
        <h3>Rifiuti prodotti nel corso dell'anno (in kg) </h3>
        <LineGraph :email="userEmail"/>
        
    </div>


    <div>
        <h3>Distribuzione rifiuti prodotti nel corso dell'anno (%)</h3>
        
        <ImpiledGraph :email="userEmail"/>
        
    </div>

    <div>
        <h3>Confronto tra i risultati ottenuti questo mese e il mese scorso</h3>
        <RadarGraph :email="userEmail" />
    </div>
    
    <div>
        <h3>Rifiuti depositati in questo mese rispetto alla media di altri utenti (in kg)</h3>
        <ColumnGraph :email="userEmail" />
    </div>
  </div>
</template>