<script setup lang="ts">
    import { onMounted, ref, reactive} from 'vue'
    import { useRouter} from 'vue-router'
    import axios from 'axios'
    import { defineProps } from 'vue'
    import { verifyToken } from '@/utils/tokenUtils'
    import { checkReportDateValidity } from '../utils/checkReport'
    import ReportTable from '@/components/ReportTable.vue'
    import ReportRadarGraph from '@/components/ReportRadarGraph.vue'
    import HistoryButtons from '@/components/HistoryButtons.vue'
    import LoadingScreen from '@/components/LoadingScreen.vue'
    

    //Data for getting the requested report
    const props = defineProps({
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
    })

    const router = useRouter()
    const userEmail = ref('')
    const report = ref()
    const typologyPrices = ref()
    //data to check if we can visualzie report or not
    const data = reactive({
        isDataLoaded: false,
        isDataValid: false,
    })

    //rewrite report in order to make it show on radarGraph
    const extractColumns = (array: [string, string, string][]) => {
        const column1 = array.map((item) => item[0])
        const column2 = array.map((item) => parseFloat(item[1]))
        const column3 = array.map((item) => parseFloat(item[2]))
        const columns = [column1, column2, column3]
        return columns
    }

    //retieve report data
    const fetchData = async () => {
        const currentDate = new Date()
        const previousMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()
        try {
            //double-check if you are logged (in case of expired token)    
            const result = await verifyToken()
            userEmail.value = result
        } catch {//failed authtentication
            router.push('/login')
        }
        try {
            //check if month and year (future report)
            if (currentYear < props.year || (currentYear === props.year && previousMonth < props.month)) {
                data.isDataValid = false
                data.isDataLoaded = true
            } else {
                data.isDataValid = await checkReportDateValidity(currentYear, previousMonth, userEmail.value)
                //reuqest the report
                const response = await axios.get('http://localhost:3000/report', {
                params: {
                    email: userEmail.value,
                    year: props.year,
                    month: props.month,
                }})
                //set report
                report.value = response.data
                //retieve the prices for typology
                const res2 = await axios.get('http://localhost:3000/typology/price') 
                typologyPrices.value = res2.data
                //show data
                data.isDataLoaded = true
            }
        } catch (error) {
            //if requests produced an error
            data.isDataValid = false
            data.isDataLoaded = true
        }
    }

    onMounted(fetchData)

</script>

<template>
    <div v-if ="data.isDataLoaded">
        <div v-if ="data.isDataValid">
            <ReportTable :year="year" :month="month" :report="report" :prices="typologyPrices" :full=true />
            <ReportRadarGraph :columns="extractColumns(report)"/>
            <HistoryButtons :mode='"month"' :year="year" :month="month" :route='"/report"' :email="userEmail" @navigate="fetchData"  /> 
        </div>
        <div v-else class="first-month">
            <p>Questo report non può essere visualizzato, le possibili cause sono:</p>
            <ul>
                <li>Il report risale a prima che ti registrassi sulla piattaforma</li>
                <li>Non è ancora passato un mese dalla tua registrazione alla piattaforma</li>
            </ul>
            <div>
                <RouterLink to="/personal">Ritorna alla tua pagina personale</RouterLink>
            </div>
        </div>
    </div> 
    <div v-else>
        <LoadingScreen />
    </div>   

</template>

<style lang="scss">
    .first-month {
        margin-left: 2%;
        margin-right: 20%;

        div {
            background-color: #FFC700;
            border-radius: 10px;
            color: black;
            padding: 1% 2%;
            font-size: large;
            text-align: center;
            width: 50%;

            transition: background-color 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

            &:active {
                background-color: lighten(#FFC700, 30%);
            }
            @media (max-width: 767px) {
                width: 100%; 
            }
        }
    }
</style>