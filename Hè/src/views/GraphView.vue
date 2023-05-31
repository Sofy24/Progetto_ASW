<script setup lang="ts">
import Graph from '../components/Graphs.vue'

import axios from 'axios';

type User = {
  id: number;
  email: string;
  first_name: string;
};

type GetUsersResponse = {
  data: User[];
};

async function getUsers() {
  try {
    // 👇️ const data: GetUsersResponse
    const { data, status } = await axios.get<GetUsersResponse>(
      'http://localhost:5173/graph',
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    console.log(JSON.stringify(data, null, 4));

    // 👇️ "response status is: 200"
    console.log('response status is: ', status);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return error.message;
    } else {
      console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

getUsers();

</script>



<template>
  <main>
    <Graph />
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .graph {
    min-height: 100vh;
    display: flex;
    align-items: start;
  }
}
</style>
