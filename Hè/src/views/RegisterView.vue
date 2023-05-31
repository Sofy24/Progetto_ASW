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
      <label for="area">Comune di Residenza:</label>
      <select id="area" v-model="area" required>
        <option v-for="option in areas" :value="option" :key="option">{{ option }}</option>
      </select>
    </div>
    <button type="submit">Registrati</button>
  </form>
</template>

<script>
import areas from '@/assets/comuni.json'

export default {
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      area: '',
      areas: [],
    };
  },
  created() {
    this.areas = areas;
  },
  methods: {
    submitForm() {
      const formData = {
        name: this.name,
        surname: this.surname,
        email: this.email,
        area: this.area,
      };
      // Do something with the form data, such as sending it to the server
      console.log(formData);
    },
  },
};
</script>