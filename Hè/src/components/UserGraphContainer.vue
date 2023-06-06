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
  <div v-if="data.isDataLoaded">
    <UserPieContainer :email="userEmail" />
  

    <WelcomeItem>
        <template #heading>Grafico mese corrente</template>
        
        <PieGraph :email="userEmail" />
        
    </WelcomeItem>
    

    <WelcomeItem>
        <template #heading>Grafico confornto kg </template>
        <LineGraph :email="userEmail"/>
        
    </WelcomeItem>


    <WelcomeItem>
        <template #heading>Grafo confronto percentuale</template>
        <template #default>
        <ImpiledGraph :email="userEmail"/>
        </template>
    </WelcomeItem>

    <WelcomeItem>
        <template #icon>
        <DocumentationIcon />
        </template>
        <template #heading>Grafo confronto mese scorso</template>

        <template #default>
        <RadarGraph :email="userEmail" />
        </template>
    </WelcomeItem>
    
    <WelcomeItem>
        <template #heading>Grafo kg depositati e media</template>
        <ColumnGraph :email="userEmail" />
    </WelcomeItem>
    </div>
</template>