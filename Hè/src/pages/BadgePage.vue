<script setup lang="ts">
    import LogoutButton from "@/components/LogoutButton.vue"
    import BadgeContainer from "@/components/BadgeContainer.vue"
    import { onMounted, computed } from "vue";
    import { useStore } from 'vuex';

    const store = useStore();
    const year = computed(() => store.getters.getBadgeYear);
    const month = computed(() => store.getters.getBadgeMonth);
    console.log("CONDIZIONALE: "+ year.value +" "+ month.value)
    //onMounted(async () => { console.log(props.month, props.year) })
</script>

<template>
    <div class="mainContent">
        <BadgeContainer :year="year" :month="month" />
        <LogoutButton />
    </div>
    
</template>

<style lang="scss">
</style>