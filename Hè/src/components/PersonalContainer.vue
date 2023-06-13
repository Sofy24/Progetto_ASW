<script setup lang="ts">
    import SpecialBadgeContainer from '@/components/SpecialBadgeContainer.vue'
    import axios from 'axios'
    import ReportTable from '@/components/ReportTable.vue'
    import { computed } from '@vue/reactivity'
    import { onMounted, reactive, ref } from 'vue'
    import {checkReportDateValidity} from '../utils/checkReport'
    import LoadingScreen from '@/components/LoadingScreen.vue'

    //current user email
    const props = defineProps({
        email: {
            type: String,
            required: true,
        }
    })

    const extraBadges = ref()
    const report = ref()
    const typologyPrices = ref()
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto',
        'settembre', 'ottobre', 'novembre', 'dicembre']
    //loaded = obtained from server without errors
    //valid = there are data to show that represent something logical    
    const containerData = reactive({
        isDataLoaded: false,
        isDataValid: false
    })

    //variable to control the month and year
    const reportMonthYear = computed(() => {
        const currentDate = new Date()
        const previousMonth = currentDate.getMonth() // months are zero-based (0 - 11)
        const currentYear = currentDate.getFullYear()
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
        //retrieve the last report
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
        }).then((response) => {
                    //data retrieved, now the template can load
                    
                    //data.isDataLoaded = true
                    axios.get("http://localhost:3000/badge", {
                        params: {
                            email: props.email,
                            year: reportMonthYear.value[0],
                            month: reportMonthYear.value[1]
                            //report: report
                        },
                    }).then((response) => {
                        
                        extraBadges.value = response.data[2];
                        
                        
                    })
                })
        .catch((error) => {
            //error in report (wrong date, server down, ...), redirect to standard report page 
            containerData.isDataValid = false
            containerData.isDataLoaded = true
        })
        
        
        
                    


    })

</script>

<template>
    <div v-if ="containerData.isDataLoaded">
        <div v-if="containerData.isDataValid" class="personal-container">
            <!-- put here the components that should not be seen the first month-->
            <!--<h2>Report del mese di {{ months[reportMonthYear[1] - 1] }} {{ reportMonthYear[0] }}</h2>-->
            <div class="last-report-block">
                <div class="section-title">
                    <h2>Report dell'ultimo mese</h2>
                </div>
                <ReportTable :year="reportMonthYear[0]" :month="reportMonthYear[1]" :report="report" :prices="typologyPrices" :full=false />
                <div class="goto-link">
                    <RouterLink to="/report">Visualizza altri Report</RouterLink>
                </div>
            </div>
            <div class="badge-block">
                <div class="section-title-medaglie">
                    <h2>Medagliere</h2>
                </div>
                <div>
                    <p>
                        Queste sono le tue medaglie speciali! Forza! Collezionale tutte!
                    </p>
                    <h3>Cosa sono </h3>
                    <p>
                        Ogni mese vengono assegnate delle medaglie agli utenti che si impegano particolarmente nel riciclaggio. Esiste una medaglia per ogni tipo di rifiuto, e se in un mese riesci ad ottenerle tutte ti guadagnerai una medaglia extra!
                    </p>
                    <h3>Come si ottengono</h3>
                    <p>
                        Puoi ottenere medaglie riciclando più dell'utente medio o migliorando rispetto al mese scorso, se ottieni un numero di medaglie pari a 5, 20, 50, 75 o 100 per una tipologia di rifiuto otterrai una medaglia speciale per quella tipologia! 
                    </p>
                </div>
               
                <div class="medagliere marginAdd">
                    <div class="gridMedglieSpeciali">
                        <SpecialBadgeContainer :year="reportMonthYear[0]" :month="reportMonthYear[1]" :extraBadges="extraBadges" :full=false></SpecialBadgeContainer>
                
                    </div>
                </div>    
                
                
                <div class="goto-link-badge">
                    <RouterLink to="/badge">Visualizza i medaglieri</RouterLink>
                </div>    
            </div>
        </div>
        <div v-else class="first-month">
            <p>Benvenuto/a, questo è ancora il tuo primo mese su Hé, con il tempo questa pagina si riempirà sempre più</p>
        </div>
    </div>
    <div v-else>
        <LoadingScreen />>
    </div>
</template>

<style lang="scss">
.marginAdd{
    margin: 5%;
}
    .personal-container {
        display: grid;
        grid-template-columns: 60% 40%;
        //grid-gap: 20px;
    }

    .last-report-block {
        width:150%;
    }
    .badge-block {

        margin: 1rem;
        
    }

    .gridMedglieSpeciali{
    height: 120%;
    
    /*overflow:none;*/
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));/*1fr 1fr 1fr 1fr;*/
    
    padding: 8% 5% 8%;
    gap: 10% 5%;
  }

    @media (max-width: 767px) {
        .personal-container {
            grid-template-columns: 100%;
        }

        .last-report-block {
            width:100%;
        }

        .gridMedglieSpeciali{
            height: 120%;
            
           /* overflow:none;*/
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));/*1fr 1fr 1fr 1fr;*/
            
            padding: 8% 5% 8%;
            gap: 20% 5%;
        }
    }

    .first-month {
        margin-left: 20px;
        margin-right: 20px;

    }
    .section-title {
        display: flex;
        justify-content: left;
        align-items: start; 
        margin-left: 5%;
            
        h1 {
            text-align: center;
        }
    }

    .section-title-medaglie {
        display: flex;
        justify-content: left;
        align-items: start; 
        //margin-left: 5%;
            
        h1 {
            text-align: center;
        }
    }
    .goto-link{
        background-color: #FFC700;
        border-radius: 10px;
        color: black;
        padding: 1% 2%;
        font-size: medium;
        text-align: center;
        width: 50%;
        margin: 1% 1%;

        transition: background-color 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        &:active {
            background-color: lighten(#FFC700, 30%);
        }
        @media (max-width: 767px) {
            width: 100%; 
        }
    }    


    .goto-link-badge{
        background-color: #FFC700;
        border-radius: 10px;
        color: black;
        padding: 1% 2%;
        font-size: medium;
        text-align: center;
        width: 100%;
        margin: 1% 1%;

        transition: background-color 0.3s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        &:active {
            background-color: lighten(#FFC700, 30%);
        }
        @media (max-width: 767px) {
            width: 100%; 
        }
    }    
</style>