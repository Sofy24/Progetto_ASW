<script setup lang="ts">
    import axios from 'axios'
    import ReportTable from '@/components/ReportTable.vue'
    import { computed } from '@vue/reactivity';
    import { onMounted, reactive, ref } from 'vue';

    const props = defineProps({
        email: {
            type: String,
            required: true,
        }
    });

    const report = ref()
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto',
        'settembre', 'ottobre', 'novembre', 'dicembre']
    const containerData = reactive({
        isDataLoaded: false,
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
            containerData.isDataLoaded = true
        })
        .catch((error) => {
            //error in report (wrong date, server down, ...), redirect to standard report page 
            console.log("error: " + error)
        });
    });

</script>

<template>
    <p>qui ci sono i componenti della pagina personale di {{ email }}</p>
    <div v-if ="containerData.isDataLoaded">
        <h2>Report del mese di {{ months[reportMonthYear[1] - 1] }} {{ reportMonthYear[0] }}</h2>
        <ReportTable :year="reportMonthYear[0]" :month="reportMonthYear[1]" :report="report" />
        <RouterLink :to="`/report/${reportMonthYear[0]}/${reportMonthYear[1]}`">Visualizza altri Report</RouterLink>
    </div>
    <div v-else>
        <p>Il report sarà disponibile il prossimo mese</p>
    </div>
</template>