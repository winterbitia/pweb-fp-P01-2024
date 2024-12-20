<template>
    <div class="min-h-screen flex flex-col">
      <navbar :username="username" />
      <div class="flex-grow flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 class="text-2xl font-bold text-center mb-4">Aturan & Alur Peminjaman</h1>
          <p>Berikut adalah aturan dan alur peminjaman alat:</p>
          <ul class="list-disc pl-5">
            <li>Aturan 1</li>
            <li>Aturan 2</li>
            <li>Aturan 3</li>
            <li>Alur 1</li>
            <li>Alur 2</li>
            <li>Alur 3</li>
          </ul>
          <div class="text-center mt-4">
            <RouterLink to="/" class="scale-on-hover text-blue-500 hover:underline">Kembali ke Home</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
  import { RouterLink } from 'vue-router';
  
  export default {
    components: { Navbar, Footer, RouterLink },
    data() {
      return {
        username: localStorage.getItem('username') || '',
      };
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
  }
  
  .scale-on-hover {
    transition: transform 0.3s ease;
  }
  
  .scale-on-hover:hover {
    transform: scale(1.1);
  }
  </style>