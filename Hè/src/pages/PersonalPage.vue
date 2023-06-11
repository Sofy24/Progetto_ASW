<script setup lang="ts">
    import PersonalContainer from "@/components/PersonalContainer.vue"
    import LogoutButton from "@/components/LogoutButton.vue"
    import { onMounted, ref, reactive } from 'vue'
    import { useRouter } from 'vue-router'
    import { verifyToken } from '@/utils/tokenUtils'
    import axios from 'axios'

    const userEmail = ref('')
    const userName = ref('')
    const userSurname = ref('')
    const router = useRouter()
    const pageData = reactive({
        isDataLoaded: false,
    })

    //check authorization
    onMounted(async () => {
        verifyToken()
        .then(result => {
            userEmail.value = result
            axios.get("http://localhost:3000/user/fullname", {
                params: {
                    email: userEmail.value,
                }
             }).then(result => {
                userName.value = result.data[0]
                userSurname.value = result.data[1]
                pageData.isDataLoaded = true
             }).catch(error => {
                router.push('/login')
             })
            
        }).catch(error => {
            //console.error("error: "+error)
            router.push('/login')
        })
    })

</script>

<template>
    <div v-if ="pageData.isDataLoaded">  
        <div  class="page-title">
            <h1>Pagina di {{ userName }} {{ userSurname }}</h1>
        </div>
        <PersonalContainer :email="userEmail" />
    </div>
    <LogoutButton/>
</template>

<style lang="scss">
    .page-title {
        display: flex;
        justify-content: center;
        align-items: center; 
            
        h1 {
            text-align: center;
        }
    }
</style>