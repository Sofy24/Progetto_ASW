<script setup lang="ts">
import PersonalContainer from "@/components/PersonalContainer.vue"
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const userEmail = ref('')
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}


onMounted(async () => {
  const token = localStorage.getItem('token')
  console.log('Token:', token)
  axios.get('http://localhost:3000/user/verify', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    console.log("valid token" + response.data.email)
    userEmail.value = response.data.email
  }).catch((error) => {
    console.log("wrong or expired token")
    // Redirect to login
    router.push('login')
  })
})
</script>

<template>
  <h1>Pagina personale di {{ userEmail }}</h1>
  <PersonalContainer />
  <button @click="logout">Logout</button>
</template>