<script setup lang="ts">

    type ReportItem = [string, number, number];

    const props = defineProps({
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        report: {
            type: Array as () => Array<ReportItem>,
            required: true,
        }
    });
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']


    const calculatePercentage = (previousValue: number, currentValue: number): string => {
        if (previousValue == 0) {
            return "" 
        } else {
            const percentage = ((currentValue - previousValue) / previousValue) * 100;
            const formattedPercentage = percentage.toFixed(0); // Adjust the number of decimal places as needed
            return `${formattedPercentage}%`
        }
    };
</script>

<template>
        <table>
        <thead>
            <tr>
            <th>Categoria</th>
            <th>{{ months[month - 1] }} {{ year }}</th>
            <th>{{ months[month - 2 === -1 ? 11 : month - 2] }} {{ month === 1 ? year - 1 : year }}</th>
            <th>Change</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in report" :key="index">
            <td>{{ row[0] }}</td>
            <td>{{ row[1] }} Kg</td>
            <td>{{ row[2] }} Kg</td>
            <td>{{ calculatePercentage(row[2], row[1]) }}</td>
            </tr>
        </tbody>
        </table>
</template>