<script setup lang="ts">
    
    //import require from 'node'
    import SpecialBadgeContainer from '@/components/SpecialBadgeContainer.vue'
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
            
        }

    }


</script>

<template>
    
    <div v-if ="data.isDataLoaded">
        <h1>Badge Container {{ year }}</h1>
        <div v-if = "data.isDataValid" class="yellow">
            <h2> I tuoi badge speciali</h2>
            <div class="medagliere">
                <SpecialBadgeContainer :year="year" :month="month" :extraBadges="extraBadges" :full=true />
                <!--
                <div v-for="(elem,index) in extraBadges" :key="index">
                    
                    <div v-for="element in extraBadges[index]" class="imageBadges">
                        
                        <img :src="getImg(element)" alt="badge"  width="52" height="52" class="specialbadge">
                    </div>
                </div>
                -->
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
    @import '../assets/style/badgeElement.scss';
</style>