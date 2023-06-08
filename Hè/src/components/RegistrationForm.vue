<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import axios from 'axios'
  import router from '@/router'

  const name = ref('')
  const surname = ref('')
  const email = ref('')
  const municipality = ref('')
  const password = ref('')
  const municipalities = ref([] as string[])
  const searchQuery = ref('')
  const errorMessage = ref('')

  onMounted(() => {
    fetchMunicipalityNames()
  });

  const filteredOptions = computed(() => {
    const query = searchQuery.value.toLowerCase()
    return municipalities.value.filter((option) =>
      option.toLowerCase().includes(query)
    );
  });

  const isPasswordValid = computed(() => {
    const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    return passwordRegex.test(password.value)
  });

  const submitForm = () => {
    const formData = {
      name: name.value,
      surname: surname.value,
      email: email.value,
      municipality: municipality.value,
      password: password.value,
    };

    console.log(formData)

    axios.post('http://localhost:3000/register', formData)
      .then((response) => {
        errorMessage.value=""
        console.log('Form data sent and stored successfully:', response.data)
        console.log("good"+response.statusText)
        router.push('home');
      })
      .catch((error) => {
        if (error.response.status == 409) {
          errorMessage.value = "Email già registrata"
        } else if (error.response.status == 400){
          errorMessage.value = error.response.data.error
        } else {
          console.error('Error sending form data:', error)
        }
      });
  };

  const fetchMunicipalityNames = () => {
    axios.get('http://localhost:3000/municipality/names')
      .then((response) => {
        municipalities.value = response.data;
      })
      .catch((error) => {
        console.error('Error retrieving municipalities names:', error)
      })
  };
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="name" required pattern="[A-Za-z]+">
      </div>
      <div class="form-group">
        <label for="surname">Cognome:</label>
        <input type="text" id="surname" v-model="surname" required pattern="[A-Za-z]+">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <div v-if="!isPasswordValid" class="error-message error">
            <p>La password deve avere almeno 8 caratteri di cui almeno una maiuscola, una minuscola, un numero e un simbolo.</p>
        </div>
        <div v-else class="error-message success">
          <p> Password valida</p>
        </div>
      </div>
      <div class="form-group">
        <label for="municipality">Comune di Residenza:</label>
        <select id="municipality" v-model="municipality" required>
            <option value="">Seleziona il tuo Comune</option>
            <option v-for="option in filteredOptions" :value="option" :key="option">
              {{ option}}
            </option>
        </select>
      </div>
      <div v-if="errorMessage != ''" class="error-message">{{ errorMessage }}</div>
      <button type="submit">Registrati</button>
    </form>
    <hr class="separator">
    <RouterLink to="/login" class="custom-link">Login</RouterLink>
  </div>
</template>

<style lang="scss">
    @import '../assets/style/formElement.scss'; 
</style>
