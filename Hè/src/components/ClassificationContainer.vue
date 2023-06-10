<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"
import {type Classification} from "../types/Classification"



const classification = ref<Classification[]>([])

const getPercentage = async () => {
  try {
    const data = (await axios.get("http://localhost:3000/classification")).data
    classification.value = data.map((item: any): Classification => {
        return {
            municipality: item[0],
            percentage: item[1]
        }
        })
  } catch (e) {
    console.error(e)
  }
}
onMounted(getPercentage)

</script>

<template v-if="classification !== undefined">
  <ul>
    <li v-for="i in classification">{{ i.municipality }} = {{ i.percentage }}</li>
  </ul>
</template>

<style>

</style>
