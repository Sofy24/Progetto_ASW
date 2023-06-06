<script setup lang="ts">
    import { onMounted, ref, reactive  } from 'vue'
    import { useRouter } from 'vue-router'
    import { verifyToken } from '@/utils/tokenUtils'
    import UserPieContainer from './UserPieContainer.vue';

    const userEmail = ref('')
    const router = useRouter()
    const data = reactive({
        isDataLoaded: false,
    })

    onMounted(async () => {
        verifyToken()
        .then(result => {
            userEmail.value = result
            data.isDataLoaded = true
        }).catch(error => {
            router.push('/login')
        });
    })
</script>

<template>
  <div v-if="data.isDataLoaded">
    <UserPieContainer :email="userEmail" />
  </div>
</template>