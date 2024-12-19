// src/components/Navbar.vue
<template>
  <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="text-lg font-bold">Peminjaman Barang</div>
    <div v-if="username" class="text-sm">
      Logged in as: <span class="font-semibold">{{ username }}</span>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    username: {
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
