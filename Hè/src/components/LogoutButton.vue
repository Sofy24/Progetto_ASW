<script lang="ts">
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    const logout = () => {
      localStorage.removeItem('token')
      router.push('login')
    }
    
    return {
      logout
    }
  }
}
</script>

<template>
    <button @click="logout">Logout</button>
</template>