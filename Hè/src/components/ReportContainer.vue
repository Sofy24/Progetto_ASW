<script setup lang="ts">
    import axios from 'axios'
    import { onMounted, ref, computed } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { defineProps } from 'vue';
    import { verifyToken } from '@/utils/tokenUtils'

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

    const router = useRouter()
    const userEmail = ref('')

    onMounted(async () => {
    try {
        const result = await verifyToken();
        userEmail.value = result;

        const currentDate = new Date();
        const previousMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        if (currentYear < props.year || (currentYear === props.year && previousMonth < props.month)) {
        if (previousMonth === 0) {
            router.push(`/report/${currentYear - 1}/12`);
        } else {
            router.push(`/report/${currentYear}/${previousMonth}`);
        }
        } else {
        const response = await axios.get("http://localhost:3000/report", {
            params: {
            email: userEmail.value,
            year: props.year,
            month: props.month,
            },
        });
        console.log("res " + response.data);
        }
    } catch (error) {
        console.log(error);
        router.push('/login');
    }
});

</script>

<template>
    <p>Report Container {{ year }}</p>
</template>