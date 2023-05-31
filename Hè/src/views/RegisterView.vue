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

<script>
//import areas from '@/assets/comuni.json'
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      municipality: '',
      municipalities: [],
      searchQuery: '',
    };
  },
  mounted() {
    this.fetchMunicipalityNames();
  },
  computed: {
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
        municipality: this.municipality,
      };
      // Do something with the form data, such as sending it to the server
      console.log(formData);
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