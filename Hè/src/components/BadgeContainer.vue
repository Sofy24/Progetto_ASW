<script setup lang="ts">
    import axios from 'axios'
    import { onMounted, ref, reactive } from 'vue'
    import { useRouter} from 'vue-router'
    import { defineProps, watchEffect } from 'vue';
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
    const badges = ref()
    const badgeMonth = ref()
    const extraBadges = ref()
    const data = reactive({
        isDataLoaded: false,
    })
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];

    const redirectToPreviousBadges = (currentYear: number, previousMonth: number) => {
        if (previousMonth === 0) {
            router.push(`/badge/${currentYear - 1}/12`);
        } else {
            router.push(`/badge/${currentYear}/${previousMonth}`);
        }
    };

    const fetchData = async () => {
        try {
            const result = await verifyToken();
            userEmail.value = result;

            const currentDate = new Date();
            const previousMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            if (currentYear < props.year || (currentYear === props.year && previousMonth < props.month)) {
                redirectToPreviousBadges(currentYear, previousMonth);
            } else {
                axios.get("http://localhost:3000/badge", {
                    params: {
                        email: userEmail.value,
                        year: props.year,
                        month: props.month,
                    },
                })
                .then((response) => {
                    badges.value = response.data[1];
                    badgeMonth.value = response.data[0];
                    extraBadges.value = response.data[2];
                    data.isDataLoaded = true;
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log("error: " + error);
                    redirectToPreviousBadges(currentYear, previousMonth);
                });
            }
        } catch (error) {
            //not authorized (token expired or not logged in)
            console.log("error: " + error);
            router.push('/login');
        }
    };

    watchEffect(() => {
        fetchData();
    });

    onMounted(() => {
        fetchData();
    });


</script>

<template>
    <h1>Badge Container {{ year }}</h1>
    <h3> extra</h3>
    <div v-for="elem in extraBadges" >
        <div>{{ elem }}</div>
    </div>
    <div class="grid-container">
        <div class="grid-item" v-for="(elem,index) in badgeMonth" :key="index">
            <h3> {{elem}}</h3>
            <div> {{ badges[index] }}</div>
        </div>
    </div>
</template>

<style>
.grid-container {
    display: grid;
  }
</style>