<script setup lang="ts">
  import { onMounted, ref, reactive, watch } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { defineProps } from 'vue'
  import { verifyToken } from '@/utils/tokenUtils'
  import { checkReportDateValidity } from '../utils/checkReport'
  import ReportTable from '@/components/ReportTable.vue'
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
    },
  })

  const router = useRouter()
  const userEmail = ref('')
  const report = ref()
  const data = reactive({
    isDataLoaded: false,
    isDataValid: false,
  })

  const redirectToPreviousReport = (currentYear: number, previousMonth: number) => {
    data.isDataLoaded = false
    data.isDataValid = false
    // Redirect to the report of the previous month
    /*const targetYear = previousMonth === 0 ? currentYear - 1 : currentYear
    const targetMonth = previousMonth === 0 ? 12 : previousMonth
    router.push(`/report/${targetYear}/${targetMonth}`)*/
  }

  const extractColumns = (array: [string, string, string][]) => {
    const column1 = array.map((item) => item[0])
    const column2 = array.map((item) => parseFloat(item[1]))
    const column3 = array.map((item) => parseFloat(item[2]))
    const columns = [column1, column2, column3]
    return columns
  }

  const fetchData = async () => {
    try {
      const currentDate = new Date()
      const previousMonth = currentDate.getMonth()
      const currentYear = currentDate.getFullYear()

      const result = await verifyToken()
      userEmail.value = result

      if (currentYear < props.year || (currentYear === props.year && previousMonth < props.month)) {
        redirectToPreviousReport(currentYear, previousMonth)
      } else {
        data.isDataValid = await checkReportDateValidity(currentYear, previousMonth, userEmail.value)

        console.log('DATTTTIIT: ' + props.year + ' ' + props.month)
        const response = await axios.get('http://localhost:3000/report', {
          params: {
            email: userEmail.value,
            year: props.year,
            month: props.month,
          },
        })

        report.value = response.data
        data.isDataLoaded = true
      }
    } catch (error) {
      console.log('error: ' + error)
      data.isDataLoaded = false
      data.isDataValid = false
    }
  }

  onMounted(fetchData)

  watch([props.year, props.month], fetchData)
</script>

<template>
    <p>Report Container {{ year }}</p>
    <div v-if ="data.isDataLoaded && data.isDataValid">
        <ReportTable :year="year" :month="month" :report="report" />
        <ReportRadarGraph :columns="extractColumns(report)"/>
        <HistoryButtons :mode='"month"' :year="year" :month="month" :route='"/report"' :email="userEmail" @navigate="fetchData"  /> 
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