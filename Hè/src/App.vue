<script setup lang="ts">
  import { RouterLink, RouterView} from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import { onMounted, ref} from 'vue'
  import { verifyToken } from '@/utils/tokenUtils'
  import { useRouter } from 'vue-router';
  import { computed } from '@vue/reactivity';
  
  const router = useRouter()
  const isAuthorized = ref(false)

  const reportLink = computed(() => {
    const currentDate = new Date();
    const previousMonth = currentDate.getMonth(); // months are zero-based (0 - 11)
    const currentYear = currentDate.getFullYear();
    if (previousMonth == 0) {
      return `/report/${currentYear - 1}/12`;//january goes to december previous year
    } else {
      return `/report/${currentYear}/${previousMonth}`;
    }
  })

  const badgeLink = computed(() => {
    const currentDate = new Date();
    const previousMonth = currentDate.getMonth(); // months are zero-based (0 - 11)
    const currentYear = currentDate.getFullYear();
    if (previousMonth == 0) {
      return `/badge/${currentYear - 1}/12`;//january goes to december previous year
    } else {
      return `/badge/${currentYear}/${previousMonth}`;
    }
  })

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
      <!----<HelloWorld msg="Hè" />-->
      <nav>
        <RouterLink to="/">Home</RouterLink>

        <RouterLink to="/graph">Grafici</RouterLink>
        <RouterLink to="/classifica">Classifica</RouterLink>

        <RouterLink v-if="!isAuthorized" to="/register">Register</RouterLink>
        <RouterLink v-if="!isAuthorized" to="/login">Login</RouterLink>
        <RouterLink to="/notification">Mess</RouterLink>

        <RouterLink v-if="isAuthorized" to="/personal">MyPage</RouterLink>
        <RouterLink v-if="isAuthorized" :to="reportLink">Resoconto Mensile</RouterLink>
        <RouterLink v-if="isAuthorized" :to="badgeLink">Le tue medaglie</RouterLink>
        <RouterLink v-if="isAuthorized" to="/userGraph">MyGraph</RouterLink>
      </nav>
    </div>
  </header>
  <div id="mainContent">
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

