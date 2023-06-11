<script setup lang="ts">
    
    import ReportContainer from "@/components/ReportContainer.vue"
    import { computed } from "@vue/reactivity"
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    //conncection to the store vuex
    const store = useStore()
    const year = computed(() => store.getters.getReportYear)
    const month = computed(() => store.getters.getReportMonth)
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto',
        'settembre', 'ottobre', 'novembre', 'dicembre']
    const router = useRouter()

</script>

<template>
    <div class="page-title">
      <h1>Report {{ months[month - 1] }} {{ year }}</h1>
    </div>
    <ReportContainer :year="year" :month="month" />
   
</template>

<style lang="scss">
    .page-title {
    display: flex;
    justify-content: center;
    align-items: center; 
        
    h1 {
        text-align: center;
    }
    }


</style>
