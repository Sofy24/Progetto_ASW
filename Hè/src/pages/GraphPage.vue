<script setup lang="ts">
  import GraphContainer from "@/components/GraphContainer.vue"
</script>

<template>
  <div class="mainContent">
    <h1>Grafici </h1>
    <div class="grid">
      <GraphContainer />
    </div>
  </div>
  
  
</template>


<style>
@media (min-width: 1024px) {
  .graph {
    min-height: 100vh;
    display: flex;
    align-items: start;
  }
}
</style>
