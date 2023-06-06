<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
})
</script>

<template>
    <div class="test-graph-container">
      <p>User Email: {{ email }}</p>
    </div>
</template>
  
