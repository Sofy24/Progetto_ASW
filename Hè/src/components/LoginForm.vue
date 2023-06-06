<script lang="ts">
    import { defineComponent, ref } from 'vue'
    import axios from 'axios'
    import router from '@/router'

    export default defineComponent({
    setup() {
        const email = ref('')
        const password = ref('')
        const errorMessage = ref('')

        const submitForm = () => {
            const formData = {
                email: email.value,
                password: password.value,
            };

            console.log(formData);

            // Send the login request to the server
            axios.post('http://localhost:3000/login', formData)
                .then(response => {
                    console.log('Login successful')
                    //save the auth token in local storage
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    //reset errorMessage
                    errorMessage.value = ''
                    //go to personal page
                    router.push('personal')
                })
                .catch(error => {
                    if (error.response.status == 401){
                        errorMessage.value = error.response.data.error
                    }
                    console.error('Login failed:', error)
                    // Handle login failure, such as displaying an error message
                })
        }

        return {
            email,
            password,
            errorMessage,
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
    <div v-if="errorMessage != ''" class="error-message">{{ errorMessage }}</div>
</template>
  
