<script setup lang="ts">

    import { defineProps} from 'vue'
    import type { PropType } from 'vue'

    const props = defineProps({
        columns: {
            type: Array as PropType<(string[] | number[])[]>,
            required: true,
        },
    });

    console.log(props.columns[0])

    const chartOptions = {
    chart: {
        height: 350,
        type: 'radar',
        dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
        }
    },
    title: {
        text: 'Radar Chart - Multi Series'
    },
    stroke: {
        width: 2
    },
    fill: {
        opacity: 0.1
    },
    markers: {
        size: 0
    },
    xaxis: {
        categories: (props.columns[0])
    }
    }


    const series = [{
        name: 'This Month',
        data: props.columns[1]
      }, {
        name: 'Last month',
        data: props.columns[2]
      }]

</script>
<template>
    <div id="chart">
        <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>