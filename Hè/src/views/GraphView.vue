<script setup lang="ts">
import Graph from '../components/Graphs.vue'
</script>



<template>
  <main>
    <Graph />
  </main>
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
