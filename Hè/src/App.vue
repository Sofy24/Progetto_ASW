<script setup lang="ts">
  import { RouterLink, RouterView} from 'vue-router'
  import { onMounted, ref} from 'vue'
  import { verifyToken } from '@/utils/tokenUtils'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const isAuthorized = ref(false)

  onMounted(() => { 
    //checkAuthorization()
  })

  const excludedPaths = ['/login', '/register', '/home', '/classification', '/graph']

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
      <!----<HelloWorld msg="Hè" />-->
      <nav>

        <RouterLink v-if="!isAuthorized" to="/register"><p >Register  </p><i class="pi pi-user-plus"></i></RouterLink>
        <RouterLink v-if="!isAuthorized" to="/login"><p >Login  </p><i class="pi pi-sign-in"></i></RouterLink>
        
        <div class="dropdown">
          <button class="dropbtn">
            
            <i class="pi pi-bars"></i>
          </button>
          <div class="dropdown-content">
            <RouterLink  to="/graph">Grafici</RouterLink>
            <RouterLink  to="/classification">Classifica</RouterLink>
            <RouterLink  to="/">Home</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/notification">MyNotifications</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/binState">Stato corrente bidoni</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/personal">MyPage</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/report">Resoconto Mensile</RouterLink>
            <RouterLink  v-if="isAuthorized" to=/badge>Le tue medaglie</RouterLink>
            <RouterLink  v-if="isAuthorized" to="/userGraph">MyGraph</RouterLink>
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


<!--

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: start center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>


-->

