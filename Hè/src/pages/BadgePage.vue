<script setup lang="ts">

    import BadgeContainer from "@/components/BadgeContainer.vue"
    import {computed } from "vue"
    import { useStore } from 'vuex'

    const store = useStore()
    const year = computed(() => store.getters.getBadgeYear)
    const month = computed(() => store.getters.getBadgeMonth)
</script>

<template>
    <div class="mainContent">
        <BadgeContainer :year="year" :month="month" />
        
    </div>
    
</template>

<style lang="scss">
</style>