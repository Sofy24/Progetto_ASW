<template>
  <div>
    <h1>Registration Page</h1>
  </div>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="name" required>
    </div>
    <div>
      <label for="surname">Cognome:</label>
      <input type="text" id="surname" v-model="surname" required>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$">
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <span v-if="!isPasswordValid" class="password-requirements">
          La password deve avere almeno 8 caratteri di cui almeno una maiuscola, una minuscola, un numero e un simbolo.
      </span>
    </div>
    <div>
      <label for="municipality">Comune di Residenza:</label>
      <select id="municipality" v-model="municipality" required>
          <option value="">Seleziona il tuo Comune</option>
          <option v-for="option in filteredOptions" :value="option" :key="option">
            {{ option}}
          </option>
        </select>
      </div>
    <button type="submit">Registrati</button>
  </form>
</template>

<style>
.password-requirements {
  color: red;
  font-size: 0.8em;
}
</style>

<script lang="ts">
//import areas from '@/assets/comuni.json'
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      municipality: '',
      password: '',
      municipalities: [] as string[],
      searchQuery: '',
    };
  },
  mounted() {
    this.fetchMunicipalityNames();
  },
  computed: {
    isPasswordValid() {
      const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);
      return passwordRegex.test(this.password);
    },
    filteredOptions() {
      const query = this.searchQuery.toLowerCase();
      return this.municipalities.filter((option) =>
        option.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    submitForm() {
      const formData = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password,
        municipality: this.municipality,
      };
      
      console.log(formData);
      
      axios.post('http://localhost:3000/user/register', formData)
        .then(response => {
          console.log('Form data sent and stored successfully:', response.data);
        })
        .catch(error => {
          console.error('Error sending form data:', error);
        });
    },
    fetchMunicipalityNames() {
      axios.get('http://localhost:3000/municipality/names')
        .then((response) => {
          this.municipalities = response.data;
        })
        .catch((error) => {
          console.error('Error retrieving municipalities names:', error);
        });
    },
  },
};
</script>