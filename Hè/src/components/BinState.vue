<script setup lang="ts">

  const props = defineProps(["n"])
  function getGif(){
    /*const gifArray2 = [["136.306%", "https://gifer.com/embed/L9dQ"], ["100.000%", "https://gifer.com/embed/73Ve"],
    ["83.333%", "https://gifer.com/embed/EZaC"], ["56.200%", "https://gifer.com/embed/94Sy"], ["100.000%", "https://gifer.com/embed/LekV"],
    ["56.300%", "https://gifer.com/embed/CkgR"], ["60.938%", "https://gifer.com/embed/1Faa"], ["78.889%", "https://gifer.com/embed/OOn"] ];
    */
   const gifArray = ["https://gifer.com/embed/L9dQ", "https://gifer.com/embed/73Ve", "https://gifer.com/embed/EZaC", "https://gifer.com/embed/94Sy",
    "https://gifer.com/embed/LekV", "https://gifer.com/embed/CkgR", "https://gifer.com/embed/1Faa", "https://gifer.com/embed/OOn"];
    return gifArray[Math.floor(Math.random() * gifArray.length)];
  }
  const gifValue = getGif()
</script>


<template>
  <div class="specificBin" v-if="n !== undefined">
    <div class="leftSide">
      <div style="padding-top:100%;position:relative;"><iframe :src="gifValue" width="100%" height="100%" style='position:absolute;top:0;left:0;' frameBorder="0" allowFullScreen></iframe></div>
      <p class="percent">Percentuale riempimento bidone {{n.actual_kg*100/n.max_kg}}%</p>
    </div>
    <p class="info">
        id bidone: {{ n.id }}<br>
        tipologia: {{ n.typology }}<br>
        indirizzo: {{ n.address }}<br>
        località: {{n.municipality}}<br>
        capacità: {{ n.max_kg }}<br>
        riempimento attuale: {{ n.actual_kg }}<br>
    </p>
  </div>
</template>

<style scoped>
.specificBin{
    background-color: rgb(245, 245, 245);
    border-radius: 10px;
}
/*.specificBin p{
    padding: 8%;
    background-color: aqua;

}*/

.leftSide{
    width: 50%;

}

.percent{
    font-weight: bold;
    padding: 2%;
}

.info{
 padding: 2%;
}


</style>
