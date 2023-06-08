<script setup lang="ts">
    import axios from 'axios'
    import { onMounted, ref, reactive } from 'vue'
    import { useRouter} from 'vue-router'
    import { defineProps, watchEffect } from 'vue'
    import { onBeforeMount } from 'vue';    
    import type {RouteLocationNormalized } from 'vue-router'
    import { verifyToken } from '@/utils/tokenUtils'
    import ReportTable from '@/components/ReportTable.vue'
    import ReportRadarGraph from '@/components/ReportRadarGraph.vue'
    import HistoryButtons from '@/components/HistoryButtons.vue'
    import {checkReportDateValidity} from '../utils/checkReport'

    //arguments passed from ReportPage
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
        isDataValid: false,
    })
    
    //everytime is asked a report that can't exist (future date or before registration)
    const redirectToPreviousReport = (currentYear: number, previousMonth: number) => {
        router.push('/personal')
        //it always send to the report of the month previous to the current
        if (previousMonth == 0) {//case for january
            router.push(`/report/${currentYear - 1}/12`)
        } else {
            router.push(`/report/${currentYear}/${previousMonth}`)
        }
    };

    //format the report to be processed by a graph
    const extractColumns = (array: [string, string, string][]) => {
        const column1 = array.map((item) => item[0])
        const column2 = array.map((item) => parseFloat(item[1]))
        const column3 = array.map((item) => parseFloat(item[2]))
        const columns = [column1, column2, column3]
        return columns
    }

    //authentication and retrieving of report
    const fetchData = async () => {
        try {
            const currentDate = new Date()
            const previousMonth = currentDate.getMonth()
            const currentYear = currentDate.getFullYear()        
            //token validation
            const result = await verifyToken()
            userEmail.value = result
            //check if report is possible with the year and month given
            if (currentYear < props.year || (currentYear === props.year && previousMonth < props.month)) {
                redirectToPreviousReport(currentYear, previousMonth)
            } else {
                //check report date validity
                data.isDataValid = await checkReportDateValidity(currentYear, previousMonth, userEmail.value)
                //ask for report
                axios.get("http://localhost:3000/report", {
                    params: {
                        email: userEmail.value,
                        year: props.year,
                        month: props.month,
                    }
                })
                .then((response) => {
                    //data retrieved, now the template can load
                    console.log("VALIDDDDD")
                    report.value = response.data
                    data.isDataLoaded = true
                })
                .catch((error) => {
                    //error in report (wrong date, server down, ...), redirect to standard report page 
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

    //all possible way to reload this component
    watchEffect(() => {//reload page from this
        fetchData()
    });
    onMounted(() => {//first time
        fetchData()
    });
    onBeforeMount(() => {//reload from child component of this
        router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
            fetchData()
            next()
        });
    });
</script>

<template>
    <p>Report Container {{ year }}</p>
    <div v-if ="data.isDataLoaded && data.isDataValid">
        <ReportTable :year="year" :month="month" :report="report" />
        <ReportRadarGraph :columns="extractColumns(report)"/>
        <HistoryButtons :mode='"month"' :year="year" :month="month" :route='"/report"' :email="userEmail"  /> 
    </div>
    <div v-else>
        <p>Questo report non può essere visualizzato, le possibili cause sono:</p>
        <ul>
            <li>Il report risale a prima che ti registrassi sulla piattaforma</li>
            <li>Non è ancora passato un mese dalla tua registrazione alla piattaforma</li>
        </ul>
        <RouterLink to="/personal">Ritorna alla tua pagina personale</RouterLink>
    </div>
</template>