<script setup lang="ts">
  import { RouterLink, RouterView} from 'vue-router'
  import { onMounted, ref} from 'vue'
  import { verifyToken } from '@/utils/tokenUtils'
  import { useRouter } from 'vue-router'
  import LogoutButton from "@/components/LogoutButton.vue"

  const router = useRouter()
  const isAuthorized = ref(false)

  onMounted(() => { 
    checkAuthorization()
  })

  const excludedPaths = ['/login', '/register', '/classification', '/graph']

  router.beforeEach((to, from, next) => {
    if (excludedPaths.includes(to.path)) {
    next()
    return
    } 
    //every time i change route to a protected one it check if it is still logged
    checkAuthorization()
    next()
  })

  async function checkAuthorization(): Promise<boolean> {
    try {

      const token = localStorage.getItem('token');
      if (token == null) {
        isAuthorized.value = false
        return false
      }

      await verifyToken()
      isAuthorized.value = true
      return true
    } catch (error) {
      isAuthorized.value = false
      return false
    }
  } 
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/images/logo2.png" />
    
    <div class="wrapper">
      <nav>

        <LogoutButton v-if="isAuthorized"/>
        <RouterLink v-if="!isAuthorized" to="/register"><p >Register  </p><em class="pi pi-user-plus"></em></RouterLink>
        <RouterLink v-if="!isAuthorized" to="/login"><p >Login  </p><em class="pi pi-sign-in"></em></RouterLink>
        
        <div class="dropdown">
          <button class="dropbtn">
            
            <em class="pi pi-bars"></em>
          </button>
          <div class="dropdown-content">
            <RouterLink  to="/graph">Grafici</RouterLink>
            <RouterLink  to="/classification">Classifica</RouterLink>
            <RouterLink  to="/">Home</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/notification">Notifiche</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/binState">Stato corrente bidoni</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/personal">MyPage</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/report">Report Mensile</RouterLink>
            <RouterLink  v-if="isAuthorized" to=/badge>Medagliere</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/userGraph">Statistiche utente</RouterLink>
          </div>
        </div> 
        
      </nav>
    </div>
  </header>
  <div>
    <RouterView />
    <RouterView name="personal"></RouterView>
    <RouterView name="home"></RouterView>
  </div>
  
</template>



<style scoped lang="scss">
    @import './assets/style/navElement.scss'; 
</style>

