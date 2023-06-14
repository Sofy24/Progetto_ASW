<script setup lang="ts">
  import carta from '../assets/images/bidone_carta.jpg'
  import vetro from '../assets/images/bidone_vetro.jpg'
  import plastica from '../assets/images/bidone_plastica.jpg'
  import indifferenziata from '../assets/images/bidone_indifferenziata.jpg'
  import organico from '../assets/images/bidone_organico.jpg'
  import potature from '../assets/images/bidone_potatura.jpg'
  import olio from '../assets/images/bidone_olio.jpg'

  //computes the correct image for each bin
  function getImg(src:string){
    switch ( src ) {
      case "carta":
          return carta
      case "vetro":
          return vetro
      case "plastica e lattine":
          return plastica
      case "indifferenziata":
          return indifferenziata
      case "organico":
          return organico
      case "olio":
          return olio
      case "sfralci e potature":
          return potature
    }
}

  const props = defineProps(["n"])
  //compute the percentage for the bin
  const percentage = (props.n.actual_kg * 100 / props.n.max_kg).toFixed(2)
  
</script>


<template>
  <div class="specificBin" v-if="n !== undefined">
    <div class="leftSide">
      <img width="50" height="50" :src="getImg(props.n.typology)" alt="bin of the correct typology"/>
      <p class="percent">Percentuale riempimento bidone {{percentage}}%</p>
    </div>
    <p class="info">
        id bidone: {{ n.id }}<br>
        tipologia: {{ n.typology }}<br>
        indirizzo: {{ n.address }}<br>
        località: {{n.municipality}}<br>
        capacità: {{ n.max_kg }} kg<br>
        riempimento attuale: {{ n.actual_kg.toFixed(2) }} kg<br>
    </p>
  </div>
</template>

<style scoped>
.specificBin{
    background-color: rgb(245, 245, 245);
    border-radius: 10px;
}


.leftSide{
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.leftSide img{
  margin-top: 1%;
}

.percent{
    font-weight: bold;
    padding: 2%;
    margin-left: 1%;
}

.info{
 padding: 2%;
}


</style>
