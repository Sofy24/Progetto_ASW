<script setup lang="ts">
    
    //import require from 'node'
    
    import axios from 'axios'
    import { onMounted, ref, reactive, watch, onBeforeMount} from 'vue'
    import { loadRouteLocation, useRouter} from 'vue-router'
    import { defineProps, watchEffect } from 'vue';
    import { verifyToken } from '@/utils/tokenUtils'
    import HistoryButtons from '@/components/HistoryButtons.vue'
    import niente from '../assets/images/niente.png'
    import carta from '../assets/images/carta.png'
    import plastica from '../assets/images/plastica e lattine.png'
    import indifferenziata from '../assets/images/indifferenziata.png'
    import tutto from '../assets/images/tutto.png'
    import olio from '../assets/images/olio.png'
    import organico from '../assets/images/organico.png'
    import vetro from '../assets/images/vetro.png'
    import potature from '../assets/images/potature.png'

    import carta5 from '../assets/images/carta 5.png'
    import plastica5 from '../assets/images/plastica e lattine 5.png'
    import indifferenziata5 from '../assets/images/indifferenziata 5.png'
    import tutto5 from '../assets/images/tutto 5.png'
    import olio5 from '../assets/images/olio 5.png'
    import organico5 from '../assets/images/organico 5.png'
    import vetro5 from '../assets/images/vetro 5.png'
    import potature5 from '../assets/images/potature 5.png'
    import carta20 from '../assets/images/carta 20.png'
    import plastica20 from '../assets/images/plastica e lattine 20.png'
    import indifferenziata20 from '../assets/images/indifferenziata 20.png'
    import tutto20 from '../assets/images/tutto 20.png'
    import olio20 from '../assets/images/olio 20.png'
    import organico20 from '../assets/images/organico 20.png'
    import vetro20 from '../assets/images/vetro 20.png'
    import potature20 from '../assets/images/potature 20.png'
    import carta50 from '../assets/images/carta 50.png'
    import plastica50 from '../assets/images/plastica e lattine 50.png'
    import indifferenziata50 from '../assets/images/indifferenziata 50.png'
    import tutto50 from '../assets/images/tutto 50.png'
    import olio50 from '../assets/images/olio 50.png'
    import organico50 from '../assets/images/organico 50.png'
    import vetro50 from '../assets/images/vetro 50.png'
    import potature50 from '../assets/images/potature 50.png'
    import carta75 from '../assets/images/carta 75.png'
    import plastica75 from '../assets/images/plastica e lattine 75.png'
    import indifferenziata75 from '../assets/images/indifferenziata 75.png'
    import tutto75 from '../assets/images/tutto 75.png'
    import olio75 from '../assets/images/olio 75.png'
    import organico75 from '../assets/images/organico 75.png'
    import vetro75 from '../assets/images/vetro 75.png'
    import potature75 from '../assets/images/potature 75.png'
    import carta100 from '../assets/images/carta 100.png'
    import plastica100 from '../assets/images/plastica e lattine 100.png'
    import indifferenziata100 from '../assets/images/indifferenziata 100.png'
    import tutto100 from '../assets/images/tutto 100.png'
    import olio100 from '../assets/images/olio 100.png'
    import organico100 from '../assets/images/organico 100.png'
    import vetro100 from '../assets/images/vetro 100.png'
    import potature100 from '../assets/images/potature 100.png'
    import LoadingScreen from '@/components/LoadingScreen.vue'


    


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
    const report = ref()
    const badgeMonth = ref()
    const extraBadges = ref()
    const data = reactive({
        isDataLoaded: false,
        isDataValid: false,
    })
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];



    const fetchData = async () => {
        try {
                            
                const result = await verifyToken();
                userEmail.value = result;

                const currentDate = new Date();
                const previousMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();

                if (currentYear < props.year || (currentYear === props.year && previousMonth < props.month)) {
                    data.isDataValid = false
                    data.isDataLoaded = true
                } else {
                    axios.get("http://localhost:3000/report", {
                    params: {
                        email: userEmail.value,
                        year: props.year,
                        month: props.month,
                    }
                })
                .then((response) => {
                    //data retrieved, now the template can load
                    report.value = response.data
                    //data.isDataLoaded = true
                    axios.get("http://localhost:3000/badge", {
                        params: {
                            email: userEmail.value,
                            year: props.year,
                            month: props.month,
                            //report: report
                        },
                    })
                    .then((response) => {
                        badges.value = response.data[1];
                        badgeMonth.value = response.data[0];
                        extraBadges.value = response.data[2];
                        data.isDataValid =true
                        data.isDataLoaded = true
                        
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log("LVE 1")
                        data.isDataValid = false
                        data.isDataLoaded = true
                    });
                }).catch((error) => {
                        console.log("LVE 2")
                        data.isDataValid = false
                        data.isDataLoaded = true
                });
                    
            }
            
        } catch (error) {
            //not authorized (token expired or not logged in)
            router.push('/login')
        }
    };

    

    onMounted(() => {
        fetchData();
    });

    //watch([props.year, props.month], fetchData)

    function getImg(src:string){

        
        //return src
        //return require(src)
        
        switch ( src ) {
            case "niente":
                return niente
            case "carta":
                return carta
            case "vetro":
                return vetro
            case "plastica e lattine":
                return plastica
            case "tutto":
                return tutto
            case "organico":
                return organico
            case "indifferenziata":
                return indifferenziata
            case "olio":
                return olio
            case "sfralci e potature":
                return potature
            case "carta 5":
                return carta5
            case "vetro 5":
                return vetro5
            case "plastica e lattine 5":
                return plastica5
            case "tutto 5":
                return tutto5
            case "organico 5":
                return organico5
            case "indifferenziata 5":
                return indifferenziata5
            case "olio 5":
                return olio5
            case "sfralci e potature 5":
                return potature5
            case "carta 20":
                return carta20
            case "vetro 20":
                return vetro20
            case "plastica e lattine 20":
                return plastica20
            case "tutto 20":
                return tutto20
            case "organico 20":
                return organico20
            case "indifferenziata 20":
                return indifferenziata20
            case "olio 20":
                return olio20
            case "sfralci e potature 20":
                return potature20
            case "carta 50":
                return carta50
            case "vetro 50":
                return vetro50
            case "plastica e lattine 50":
                return plastica50
            case "tutto 50":
                return tutto50
            case "organico 50":
                return organico50
            case "indifferenziata 50":
                return indifferenziata50
            case "olio 50":
                return olio50
            case "sfralci e potature 50":
                return potature50
            case "carta 75":
                return carta75
            case "vetro 75":
                return vetro75
            case "plastica e lattine 75":
                return plastica75
            case "tutto 75":
                return tutto75
            case "organico 75":
                return organico75
            case "indifferenziata 75":
                return indifferenziata75
            case "olio 75":
                return olio75
            case "sfralci e potature 75":
                return potature75
            case "carta 100":
                return carta100
            case "vetro 100":
                return vetro100
            case "plastica e lattine 100":
                return plastica100
            case "tutto 100":
                return tutto100
            case "organico 100":
                return organico100
            case "indifferenziata 100":
                return indifferenziata100
            case "olio 100":
                return olio100
            case "sfralci e potature 100":
                return potature100
        }

    }


</script>

<template>
    
    <div v-if ="data.isDataLoaded">
        <h1>Badge Container {{ year }}</h1>
        <div v-if = "data.isDataValid" class="yellow">
            <div class="grey">
                
                <h2> I tuoi badge speciali</h2>
                <div v-for="(elem,index) in extraBadges" :key="index">
                    <!--<div>{{ elem }}</div>-->
                    <div v-for="element in extraBadges[index]" class="imageBadges">
                        <!--<div>{{ element }}</div>-->
                        <img :src="getImg(element)" alt="badge"  width="52" height="52" class="specialbadge">
                    </div>
                </div>
            </div>
        
            <div class="medagliereGrid">
                <!-- grey" class="grid-item"  -->
                <div  v-for="(elem,index) in badgeMonth" :key="index"  class="medagliere_to_pad">
                    <h3> {{elem}}</h3>
                    <div class="gridMedglie medagliere">
                        
                        <div  v-for="element in badges[index]" > 
                            <!--
                            <img :src="require('../assets/images/'+ element +'.png')" alt={{element}} width="42" height="42" >
                            
                            <img :src="'../assets/images/'+ element +'.png'" alt={{element}} width="42" height="42" >
                            {{ element }}:src="require(item.imagePath)"-->
                            <img :src="getImg(element)" alt="badge" width="42" height="42">
                        </div>
                        <!--
                        <img v-for="element in badges[index]" :src="'../../assets/images/'+ element +'.png'" :alt="element" width="42" height="42">
                        <img src="../assets/images/niente.png" alt="pippo" width="42" height="42">
                        -->
                    </div>
                </div>
            </div>
            <div class="badgeButtonClass">
                <HistoryButtons :mode='"year"' :year="year" :month="month" :route='"/badge"' :email="userEmail" @navigate="fetchData" /> 
            </div>
            
        </div>
        <div v-else class="first-month">
            <p>Questa pagina non può essere visualizzata, le possibili cause sono:</p>
            <ul>
                <li>I dati richiesti risalgono a prima che ti registrassi sulla piattaforma</li>
                <li>Non è ancora passato un mese dalla tua registrazione alla piattaforma</li>
            </ul>
            <div >
                <RouterLink to="/personal">Ritorna alla tua pagina personale</RouterLink>
            </div>
        </div>
    </div>
    <div v-else>
        <LoadingScreen />
    </div>
</template>

<style lang="scss">
.badgeButtonClass{
    margin: 20% 0 10%;
}
.imageBadges{
    display: inline;
}
h2{
        text-align: center;
        color: white;
    }
    h3{
        text-align: center;
        color: black;
    }
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
@media (min-width: 1024px) {
    .specialbadge{
        width:10%;
        height:10%;
    }
    .badgeButtonClass{
    margin: 10% 0 5%;
}
}

</style>