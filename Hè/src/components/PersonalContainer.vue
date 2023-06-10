<script setup lang="ts">
    import axios from 'axios'
    import ReportTable from '@/components/ReportTable.vue'
    import { computed } from '@vue/reactivity';
    import { onMounted, reactive, ref } from 'vue';
    import {checkReportDateValidity} from '../utils/checkReport'

    const props = defineProps({
        email: {
            type: String,
            required: true,
        }
    });

    const report = ref()
    const typologyPrices = ref()
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto',
        'settembre', 'ottobre', 'novembre', 'dicembre']
    const containerData = reactive({
        isDataLoaded: false,
        isDataValid: false
    })

    const reportMonthYear = computed(() => {
        const currentDate = new Date();
        const previousMonth = currentDate.getMonth(); // months are zero-based (0 - 11)
        const currentYear = currentDate.getFullYear();
        if (previousMonth == 0) {
            return [(currentYear - 1), 12]
        } else {
            return [currentYear, previousMonth]
        }
    })

    onMounted(() => {
        checkReportDateValidity(reportMonthYear.value[0], reportMonthYear.value[1], props.email)
        .then(response => {
            containerData.isDataValid = response
        }).catch(ignored => {})
        axios.get("http://localhost:3000/report", {
            params: {
                email: props.email,
                year: reportMonthYear.value[0],
                month: reportMonthYear.value[1]
            }
        })
        .then((response) => {
            //data retrieved, now the template can load
            report.value = response.data
            axios.get('http://localhost:3000/typology/price')
            .then(response => {
                typologyPrices.value = response.data
                containerData.isDataLoaded = true
            }).catch(ignored =>{})
        })
        .catch((error) => {
            //error in report (wrong date, server down, ...), redirect to standard report page 
            containerData.isDataValid = false
            containerData.isDataLoaded = true
        });
    });

</script>

<template>
    <div v-if ="containerData.isDataLoaded">
        <div v-if="containerData.isDataValid">
            <!-- put here the components that should not be seen the first month-->
            <h2>Report del mese di {{ months[reportMonthYear[1] - 1] }} {{ reportMonthYear[0] }}</h2>
            <ReportTable :year="reportMonthYear[0]" :month="reportMonthYear[1]" :report="report" :prices="typologyPrices" />
            <RouterLink to="/report">Visualizza altri Report</RouterLink>
        </div>
        <div v-else>
            <p>Benvenuto/a, questo è ancora il tuo primo mese su Hé, con il tempo questa pagina si riempirà sempre più</p>
        </div>
    </div>
</template>