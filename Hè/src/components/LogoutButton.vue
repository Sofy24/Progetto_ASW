<script lang="ts">
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()

        const logout = () => {
            localStorage.removeItem('token')
            router.push('/home')
        }

        return {
            logout
        }
    }
}
</script>


<template>
    
    <button @click="logout" type="button">Logout  </button>
</template>

<style lang="scss">
</style>