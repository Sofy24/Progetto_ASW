<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import axios from 'axios'

    export default defineComponent({
    setup() {
        const email = ref('')
        const password = ref('')

        const submitForm = () => {
        const formData = {
            email: email.value,
            password: password.value,
        };

        console.log(formData);

        // Send the login request to the server
        axios
            .post('http://localhost:3000/login', formData)
            .then(response => {
            console.log('Login successful')
            // Do something with the response, such as storing the user token
            })
            .catch(error => {
            console.error('Login failed:', error)
            // Handle login failure, such as displaying an error message
            })
        }

        return {
        email,
        password,
        submitForm,
        }
    },
    })
</script>


<template>
    <form @submit.prevent="submitForm">
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
    </form>
</template>
  
