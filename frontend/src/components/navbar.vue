<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <img src="../assets/logo/logoKCKS.png" alt="Logo" class="h-8 w-auto" />
      <span class="text-lg font-semibold">Peminjaman Barang</span>
    </div>
    <div class="flex items-center space-x-4">
      <span v-if="username" class="text-sm">Hello, {{ username }}</span>
      <RouterLink v-if="role === 'admin'" to="/admin" class="text-sm hover:underline">Admin Dashboard</RouterLink>
      <RouterLink v-if="role === 'operator'" to="/operator" class="text-sm hover:underline">Operator Dashboard</RouterLink>
      <RouterLink to="/" class="text-sm hover:underline">Home</RouterLink>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  props: {
    username: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
nav {
  font-family: Arial, sans-serif;
}
</style>