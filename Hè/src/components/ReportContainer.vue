<script setup lang="ts">
    import axios from 'axios'
    import { onMounted, ref, reactive } from 'vue'
    import { useRouter} from 'vue-router'
    import { defineProps, watchEffect } from 'vue'
    import { onBeforeMount } from 'vue';    
    import type {RouteLocationNormalized } from 'vue-router'
    import { verifyToken } from '@/utils/tokenUtils'
    import ReportRadarGraph from '@/components/ReportRadarGraph.vue'
    import HistoryButtons from '@/components/HistoryButtons.vue'
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
    const report = ref()
    const data = reactive({
        isDataLoaded: false,
    })
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
    
    const redirectToPreviousReport = (currentYear: number, previousMonth: number) => {
        if (previousMonth === 0) {
            router.push(`/report/${currentYear - 1}/12`)
        } else {
            router.push(`/report/${currentYear}/${previousMonth}`)
        }
    };

    const extractColumns = (array: [string, string, string][]) => {
        const column1 = array.map((item) => item[0])
        const column2 = array.map((item) => parseFloat(item[1]))
        const column3 = array.map((item) => parseFloat(item[2]))
        const columns = [column1, column2, column3]
        return columns
    }

    const fetchData = async () => {
        console.log("componente intermedio")
        try {
            const result = await verifyToken()
            userEmail.value = result

            const currentDate = new Date()
            const previousMonth = currentDate.getMonth()
            const currentYear = currentDate.getFullYear()

            if (currentYear < props.year || (currentYear === props.year && previousMonth < props.month)) {
                redirectToPreviousReport(currentYear, previousMonth)
            } else {
                axios.get("http://localhost:3000/report", {
                    params: {
                        email: userEmail.value,
                        year: props.year,
                        month: props.month,
                    }
                })
                .then((response) => {
                    report.value = response.data
                    data.isDataLoaded = true
                    console.log("res " + response.data)
                })
                .catch((error) => {
                    console.log("error: " + error)
                    redirectToPreviousReport(currentYear, previousMonth)
                });
            }
        } catch (error) {
            //not authorized (token expired or not logged in)
            console.log("error: " + error)
            router.push('/login')
        }
    };

    watchEffect(() => {
        fetchData()
    });

    onMounted(() => {
        fetchData()
    });


    onBeforeMount(() => {
        router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
            fetchData()
            next()
        });
    });

    const calculatePercentage = (previousValue: number, currentValue: number): string => {
        if (previousValue == 0) {
            return "" 
        } else {
            const percentage = ((currentValue - previousValue) / previousValue) * 100;
            const formattedPercentage = percentage.toFixed(0); // Adjust the number of decimal places as needed
            return `${formattedPercentage}%`
        }
    };

</script>

<template>
    <p>Report Container {{ year }}</p>
    <div v-if ="data.isDataLoaded">
        <table>
        <thead>
            <tr>
            <th>Categoria</th>
            <th>{{ months[month - 1] }} {{ year }}</th>
            <th>{{ months[month - 2 === -1 ? 11 : month - 2] }} {{ month === 1 ? year - 1 : year }}</th>
            <th>Change</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in report" :key="index">
            <td>{{ row[0] }}</td>
            <td>{{ row[1] }} Kg</td>
            <td>{{ row[2] }} Kg</td>
            <td>{{ calculatePercentage(row[2], row[1]) }}</td>
            </tr>
        </tbody>
        </table>
        <ReportRadarGraph :columns="extractColumns(report)"/>
        <HistoryButtons :mode='"month"' :year="year" :month="month" :route='"/report"' :email="userEmail"  /> 
    </div>
</template>