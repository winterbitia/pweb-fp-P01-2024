<script lang="ts">
import { useRouter } from 'vue-router';

export default {
  name: 'AdminView',
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
};

</script>

<template>
  <div class="container mt-16 mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
    <nav class="mb-6">
      <router-link to="/admin/" class="mr-4">Manage Items</router-link>
      <router-link to="/admin/all-operators" class="mr-4">Manage Operators</router-link>
      <router-link to="/admin/summary">Summary</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>