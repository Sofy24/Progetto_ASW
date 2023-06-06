<script setup lang="ts">
    import UserGraphContainer from "@/components/UserGraphContainer.vue"
    import LogoutButton from "@/components/LogoutButton.vue"
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { verifyToken } from '@/utils/tokenUtils'

    const userEmail = ref('')
    const router = useRouter()

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
    <h1>USer GRaph PaGe</h1>
    <UserGraphContainer />
    <LogoutButton />
</template>