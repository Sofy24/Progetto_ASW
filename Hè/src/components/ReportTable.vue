<script setup lang="ts">

    import { computed} from 'vue'

    type ReportItem = [string, number, number]
    type PriceItem = [string, number]

    //argument passed
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
        },
        prices: {
            type: Array as () => Array<PriceItem>,
            required: true,
        }
    });
    //string for all months
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto',
        'settembre', 'ottobre', 'novembre', 'dicembre']

    //add data to table
    const calculatePercentage = (previousValue: number, currentValue: number): string => {
        if (previousValue == 0) {
            return "" 
        } else {
            const percentage = ((currentValue - previousValue) / previousValue) * 100;
            const formattedPercentage = percentage.toFixed(0); // Adjust the number of decimal places as needed
            if (percentage > 0) {
                return `${formattedPercentage}% ↑`;
            } else if (percentage < 0) {
                return `${formattedPercentage}% ↓`;
            } else {
                return `${formattedPercentage}% ↔`;
            }
        }
    };

    //to set the class
    const getCellClass = (previousValue: number, currentValue: number): string => {
        if (previousValue == 0) {
            return "neutral" 
        } else {
            const percentage = ((currentValue - previousValue) / previousValue) * 100
            const formattedPercentage = percentage.toFixed(0); // Adjust the number of decimal places as needed
            if (percentage > 0) {
                return "up"
            } else if (percentage < 0) {
                return "down"
            } else {
                return "";
            }
        }
    };

    const totalCost =  computed(() => {
        let sum = 0
        for (const [itemName, itemPrice] of props.prices) {
            const reportItem = props.report.find(([name]) => name === itemName)
            const quantity = reportItem ? reportItem[1] : 0
            sum += itemPrice * quantity
        }   
        return Math.round(sum * 100) / 100
    });
</script>

<template>
    <div class="reporttable-container">
        <div class="table-container">
            <table>
            <thead>
                <tr>
                <th>Categoria</th>
                <th>{{ months[month - 1] }} {{ year }}</th>
                <th>{{ months[month - 2 === -1 ? 11 : month - 2] }} {{ month === 1 ? year - 1 : year }}</th>
                <th>Variazione</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in report" :key="index">
                <td>{{ row[0] }}</td>
                <td>{{ row[1] }} Kg</td>
                <td>{{ row[2] }} Kg</td>
                <td :class="getCellClass(row[2], row[1])">{{ calculatePercentage(row[2], row[1]) }}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="ul-container">
            <h2>Riassunto spese</h2>
            <ul>
                <li v-for="(row, index) in report">
                    Hai prodotto {{ row[1] }}Kg di {{ row[0] }} al prezzo di {{ prices[index][1] }} al Kg
                </li>
            </ul>
            <p>Per un totale di {{ totalCost }}€</p>
        </div>
    </div>
</template>

<style lang="scss">
    @import '../assets/style/reportTable.scss';
</style>