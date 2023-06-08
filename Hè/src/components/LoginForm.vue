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
                        errorMessage.value = "Email o Password errata"
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
    <div class="container">
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <div v-if="errorMessage !== ''" class="error-message">
                <p>{{ errorMessage }}</p>
            </div>
            <button type="submit">Login</button>
        </form>
        <hr class="separator">
        <RouterLink to="/register" class="custom-link">Registrati</RouterLink>
    </div>
</template>

<style lang="scss">
    @import '../assets/style/formElement.scss'; 
</style>
  
