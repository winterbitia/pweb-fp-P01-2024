<template>
  <nav class="navbar bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
    <div class="flex items-center space-x-4">
      <div class="logo-container">
        <img src="../assets/logo/logoKCKS.png" alt="Logo" class="logo" />
      </div>
      <span class="text-lg font-semibold">Peminjaman Barang</span>
    </div>
    <div class="flex items-center space-x-4">
      <span v-if="username" class="text-sm">Hello, {{ username }}</span>
      <span v-if="username" class="separator">|</span>
      <RouterLink v-if="role === 'admin'" to="/admin" class="text-sm hover:underline">Admin Dashboard</RouterLink>
      <span v-if="role === 'admin'" class="separator">|</span>
      <RouterLink v-if="role === 'operator'" to="/operator" class="text-sm hover:underline">Operator Dashboard</RouterLink>
      <span v-if="role === 'operator'" class="separator">|</span>
      <RouterLink to="/rules" class="text-sm hover:underline">Rules</RouterLink>
      <span class="separator">|</span>
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
.navbar {
  font-family: Arial, sans-serif;
  height: 60px; 
  padding: 0 20px; 
}

.logo-container {
  height: 40px; 
  display: flex;
  align-items: center;
}

.logo {
  height: 100%; 
  width: auto;
}

.separator {
  margin: 0 8px; 
}
</style>