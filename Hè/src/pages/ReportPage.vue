<script setup lang="ts">
    import LogoutButton from "@/components/LogoutButton.vue"
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
    <div>
      <h1>Report {{ months[month - 1] }} {{ year }}</h1>
    </div>
    <ReportContainer :year="year" :month="month" />
    <LogoutButton/>
</template>

<style lang="scss">
    //TODO
</style>
