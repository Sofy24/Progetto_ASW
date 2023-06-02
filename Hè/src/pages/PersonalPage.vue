<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    axios.get('http://localhost:3000/user/verify', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => {
        console.log("valid token"+response.data)
    })
    .catch((error) => {
        console.log("wrong or expired token")
    });
});
</script>

<template>
  <h1>PERSONAL PAGE</h1>
</template>