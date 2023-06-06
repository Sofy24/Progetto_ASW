<script setup lang="ts">
    import LogoutButton from "@/components/LogoutButton.vue"
    import ReportContainer from "@/components/ReportContainer.vue"
import { onMounted } from "vue";

    const props = defineProps({
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        }
    });

    //onMounted(async () => { console.log(props.month, props.year) })
</script>

<template>
    <h1>Report {{ year }} {{ month }}</h1>
    <ReportContainer :year="year" :month="month" />
    <LogoutButton />
</template>