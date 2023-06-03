<script setup lang="ts">
    import LogoutButton from "@/components/LogoutButton.vue"
    import { onMounted, ref, computed } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { verifyToken } from '@/utils/tokenUtils'

    const userEmail = ref('')
    const router = useRouter()
    const route = useRoute();

    const year = computed(() => {
      return Number(route.params.year); // Convert to number if needed
    });

    const month = computed(() => {
      return Number(route.params.month); // Convert to number if needed
    });

    onMounted(async () => {
        verifyToken()
        .then(result => {
            userEmail.value = result
        }).catch(error => {
            router.push('/login')
    });
})
</script>

<template>
  <h1>Report {{ year }} {{ month }}</h1>
  <LogoutButton />
</template>