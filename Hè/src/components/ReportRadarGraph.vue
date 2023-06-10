<script setup lang="ts">

    import { defineProps, computed} from 'vue'
    import type { PropType } from 'vue'

    //populate the graph
    const props = defineProps({
        columns: {
            type: Array as PropType<(string[] | number[])[]>,
            required: true,
        },
    })

    //structure of the radar graph
    const chartOptions = computed(() => ({
        chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
                enabled: true,
                blur: 1,
                left: 1,
                top: 1,
            },
        },
        title: {
            text: 'Confronto ultimi 2 mesi',
            style: {
                fontWeight: 'bold', 
            },
        },
        stroke: {
            width: 2,
        },
        fill: {
            opacity: 0.1,
        },
        markers: {
            size: 0,
        },
        xaxis: {
            categories: props.columns[0],
        }
    }))

    const series = computed(() => [
        {
            name: 'This Month',
            data: props.columns[1],
        },
        {
            name: 'Last month',
            data: props.columns[2],
        }
    ])
</script>

<template>
    <div id="chart">
        <apexchart type="radar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<style lang="scss">
    #chart {
        margin-top: 20px;
    }

    .apexcharts-canvas {
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
</style>