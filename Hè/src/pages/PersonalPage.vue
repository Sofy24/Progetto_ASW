<script setup lang="ts">
    import PersonalContainer from "@/components/PersonalContainer.vue"
    import LogoutButton from "@/components/LogoutButton.vue"
    import { onMounted, ref, reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import { verifyToken } from '@/utils/tokenUtils'

    const userEmail = ref('')
    const router = useRouter()
    const pageData = reactive({
        isDataLoaded: false,
    })

    //check authorization
    onMounted(async () => {
        verifyToken()
        .then(result => {
            userEmail.value = result
            pageData.isDataLoaded = true
        }).catch(error => {
            console.error("error: "+error)
            router.push('/login')
        })
    })

</script>

<template>
    <div v-if ="pageData.isDataLoaded">
        <h1>Pagina personale di {{ userEmail }}</h1>
        <PersonalContainer :email="userEmail" />
    </div>
    <LogoutButton/>
</template>