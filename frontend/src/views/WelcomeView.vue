<template>
    <div class="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat" style="background-image: url('@/assets/logo/background.jpeg');">
      <div class="flex-grow flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg w-85 max-w-xl text-center">
          <h1 class="text-3xl font-bold mb-6">💻Selamat Datang Di Lab KCKS💻</h1>
          <p class="mb-10">akses aplikasi peminjaman barang dengan klik tombol di bawah ini untuk login</p>
          <RouterLink to="/login" class="bg-gray-700 text-white p-2 rounded-md hover:bg-indigo-950">Login</RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router';
  
  export default {
    components: { RouterLink },
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
  }
  
  .bg-cover {
    background-size: cover;
  }
  
  .bg-center {
    background-position: center;
  }
  
  .bg-no-repeat {
    background-repeat: no-repeat;
  }
  
  .min-h-screen {
    min-height: 100vh;
  }
  </style>