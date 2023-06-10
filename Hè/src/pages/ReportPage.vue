<script setup lang="ts">
    import LogoutButton from "@/components/LogoutButton.vue"
    import ReportContainer from "@/components/ReportContainer.vue"
    import { useRouter } from 'vue-router'

    const props = defineProps({
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        }
    });
    const months: string[] = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto',
        'settembre', 'ottobre', 'novembre', 'dicembre']
    const router = useRouter()

</script>

<template>
    <div class="ellipse">
        <h1>Report {{ months[month - 1] }} {{ year }} </h1>
    </div>
    <ReportContainer :year="year" :month="month" />
    <LogoutButton/>
</template>

<style lang="scss">
    .ellipse {
  position: relative;
  width: 100%;
  height: 100%;
}

.ellipse::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 1500%;
  height: 300%;
  background-color: lightblue;
  border-radius: 50%;
  transform: translateX(150%);
  transform: translateY(-50%);
  margin-left: -1258%;
  padding-left: 150%;
  z-index: -1;
}
</style>