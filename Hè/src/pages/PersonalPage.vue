<script setup lang="ts">
import PersonalContainer from "@/components/PersonalContainer.vue"
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { verifyToken } from '@/utils/tokenUtils';

const userEmail = ref('')
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('login')
}

onMounted(async () => {
    verifyToken()
    .then(result => {
        userEmail.value = result;
    }).catch(error => {
        router.push('/login');
    });
})
</script>

<template>
  <h1>Pagina personale di {{ userEmail }}</h1>
  <PersonalContainer />
  <button @click="logout">Logout</button>
</template>