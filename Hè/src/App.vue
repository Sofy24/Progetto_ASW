<script setup lang="ts">
  import { RouterLink, RouterView} from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import { onMounted, ref} from 'vue'
  import { verifyToken } from '@/utils/tokenUtils'
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const isAuthorized = ref(false)
  onMounted(() => { 
    checkAuthorization()
  })
  router.beforeEach((to, from, next) => {
      //every time i change route it check if it is still logged
      checkAuthorization()
      next();
  })

  async function checkAuthorization(): Promise<boolean> {
    try {
      await verifyToken();
      console.log("True");
      isAuthorized.value = true
      return true;
    } catch (error) {
      console.log("False");
      isAuthorized.value = false
      return false;
    }
  } 
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    
    <div class="wrapper">
      <HelloWorld msg="Hè" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">Chi siamo</RouterLink>

        <RouterLink to="/graph">Grafici</RouterLink>
        <RouterLink to="/classifica">Classifica</RouterLink>

        <RouterLink v-if="!isAuthorized" to="/register">Register</RouterLink>
        <RouterLink v-if="!isAuthorized" to="/login">Login</RouterLink>
        <RouterLink to="/notification">Mess</RouterLink>

        <RouterLink v-if="isAuthorized" to="/personal">MyPage</RouterLink>
        <RouterLink v-if="isAuthorized" to="/report">Resoconto Mensile</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
  <RouterView name="personal"></RouterView>
  <RouterView name="home"></RouterView>
</template>

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
