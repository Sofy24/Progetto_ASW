<script setup lang="ts">

    import niente from '../assets/images/niente.png'
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
    


    import { computed} from 'vue'

    //complex types
    type SpecialBadgeItem = string

    //argument passed from reportContainer
    const props = defineProps({
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        extraBadges: {
            type: Array as () => Array<SpecialBadgeItem>,
            required: true,
        },
        full: {
            type: Boolean,
            required: true,
        }
    })

    function getImg(src:string){
        switch(src){
            case "niente":
                return niente
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
   
                    
    <div v-for="element in extraBadges" class="imageBadges">
        
        <img :src="getImg(element)" alt="badge"  width="52" height="52" class="specialbadge">
    </div>
   
</template>

<style lang="scss">
    @import '../assets/style/badgeElement.scss';
</style>