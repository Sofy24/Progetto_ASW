<script setup lang="ts">
import { computed, watchEffect, reactive, ref } from 'vue';
import { useRouter} from 'vue-router'
import axios from 'axios'

const props = defineProps({
        mode: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
        route: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    });

    const router = useRouter()
    const regYear = ref(0)
    const regMonth = ref(0)
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because months are zero-based (0 - 11)
    const currentYear = currentDate.getFullYear();
    const datacomp = reactive({
        isDataLoaded: false,
    })


    watchEffect(() => {
        console.log("buttons watch")
        axios.get("http://localhost:3000/user/registrationDate", {
                params: {
                    email: props.email
                }
            })
            .then((response) => {
                regYear.value = response.data.year  
                regMonth.value = response.data.month
                datacomp.isDataLoaded = true
            })
            .catch((error) => {
                console.error(error)
                router.push('/login')
            })
    });

    //button texts
    const followingText = computed(() => {
        if (props.mode === 'month') {
            return 'mese successivo';
        } else if (props.mode === 'year') {
            return 'anno successivo'
        } else {
            return ''
        }
    });
    const previousText = computed(() => {
        if (props.mode === 'month') {
            return 'mese precedente';
        } else if (props.mode === 'year') {
            return 'anno precedente'
        } else {
            return ''
        }
    });

    //buttons are enabled or not
    const isForwardDisabled = computed(() => {
        if (props.mode === 'month') {
            if (props.year > currentYear || ( props.year === currentYear && (props.month + 1) >= currentMonth  )) {
                return true
            } else {
                return false
            }
        } else if (props.mode === 'year') {//Sezione per badge
            if (props.year + 1 > currentYear) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    });
    const isBackwardDisabled = computed(() => {
        if (props.mode === 'month') {
            if (props.year < regYear.value || ( props.year === regYear.value && (props.month - 1) <= regMonth.value )) {
                return true
            } else {
                return false
            }
        } else if (props.mode === 'year') {//sezione per badge
            if (props.year - 1 < regYear.value) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    });

    const handleClick = (scale : number) => {//scale == 1 -> next, scale == -1 -> previous
        if (props.mode === 'month') {
            let gotoMonth = props.month + scale
            let gotoYear = props.year
            if (gotoMonth == 13) {
                gotoMonth = 1
                gotoYear = gotoYear + 1
            }
            if (gotoMonth == 0) {
                gotoMonth = 12
                gotoYear = gotoYear - 1
            }
            router.push(props.route+"/"+gotoYear+"/"+gotoMonth)
        } else if (props.mode === 'year') {
            // scalare sulle medaglie
        }
    }

</script>

<template>
    <div v-if ="datacomp.isDataLoaded">
        <button @click="handleClick(1)" :disabled="isForwardDisabled"> {{ followingText }}</button>
        <button @click="handleClick(-1)" :disabled="isBackwardDisabled"> {{ previousText }}</button>
    </div>
</template>