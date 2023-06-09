<script setup lang="ts">
    import axios from 'axios'
    import { onMounted, ref, reactive, onBeforeMount } from 'vue'
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
                        data.isDataLoaded = true;
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log("error: " + error);
                        redirectToPreviousBadges(currentYear, previousMonth);
                    });
                })
                    
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

    

    function getImg(src:string){
        switch ( src ) {
            case "carta":
                return carta
            case "vetro":
                return vetro
            case "niente":
                return niente
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
        //return await new URL(`../../lib/Carousel/assets/${src}`, import.meta.url).href
        /*
        var string = "../../assets/images/".concat(src).concat(".png")
        import img from string
        return img
        return eval(src)"../../assets/images/".concat(src).concat(".png")
        */
    }



    

</script>

<template>
    <div v-if ="data.isDataLoaded" class="yellow">
        <h1>Badge Container {{ year }}</h1>
        <h3> extra</h3>
        <div v-for="elem in extraBadges" >
            <div>{{ elem }}</div>
        </div>
        <div class="medagliereGrid">
            <!-- grey" class="grid-item"  -->
            <div  v-for="(elem,index) in badgeMonth" :key="index">
                <h3> {{elem}}</h3>
                <div class="gridMedglie medagliere">
                    
                    <div  v-for="element in badges[index]" :key="element" > 
                        <!--<img :src="'../assets/images/'+ element +'.png'" alt={{element}} width="42" height="42" >
                        {{ element }}-->
                        <img :src="getImg(element)" alt="pippo" width="42" height="42">
                    </div>
                    <!--
                    <img v-for="element in badges[index]" :src="'../../assets/images/'+ element +'.png'" :alt="element" width="42" height="42">
                    <img src="../assets/images/niente.png" alt="pippo" width="42" height="42">
                    -->
                </div>
            </div>
        </div>
        <HistoryButtons :mode='"year"' :year="year" :month="month" :route='"/badge"' :email="userEmail"  /> 
    </div>
</template>

<style>
h3{
    text-align: center;
    color: white;
}

</style>