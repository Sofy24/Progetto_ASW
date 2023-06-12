<script setup lang="ts">
  import carta from '../assets/images/carta.png'
  const props = defineProps(["n"])
  const percentage = (props.n.actual_kg * 100 / props.n.max_kg).toFixed(2)
  
</script>


<template>
  <div class="specificBin" v-if="n !== undefined">
    <div class="leftSide">
      <img width="50" height="50" :src="carta" alt="paper bin"/>
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
  margin-left: 5%;
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
