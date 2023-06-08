<script setup lang="ts">
    import LogoutButton from "@/components/LogoutButton.vue"
    import BadgeContainer from "@/components/BadgeContainer.vue"
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
    <BadgeContainer :year="year" :month="month" />
    <LogoutButton />
</template>