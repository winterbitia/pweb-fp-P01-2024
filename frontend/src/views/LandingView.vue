<template>
  <div class="min-h-screen flex flex-col">
    <navbar :username="username" />
    <div class="flex-grow flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-4">Login</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium">Username</label>
            <input
              v-model="loginData.username"
              id="username"
              type="text"
              class="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium">Password</label>
            <input
              v-model="loginData.password"
              id="password"
              type="password"
              class="mt-1 block w-full p-2 border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label for="role" class="block text-sm font-medium">Role</label>
            <select
              v-model="loginData.role"
              id="role"
              class="mt-1 block w-full p-2 border rounded-md"
            >
              <option value="operator">Operator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            class="w-full bg-gray-700 text-white p-2 rounded-md hover:bg-blue-950"
          >
            Login
          </button>
        </form>
        <div class="text-center mt-4">
          <RouterLink to="/rules" class="text-blue-500 hover:underline">Aturan & Alur Peminjaman</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';

export default {
  components: { Navbar, Footer, RouterLink },
  data() {
    return {
      loginData: {
        username: "",
        password: "",
        role: "operator",
      },
      username: "",
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', this.loginData);
        const { token, username } = response.data;
        localStorage.setItem('token', token);
        this.username = username;
        alert("Login successful!");
        setTimeout(() => {
          localStorage.removeItem('token');
          alert("Session expired. Please log in again.");
        }, 2 * 60 * 60 * 1000); // 2 hours

        // Redirect based on role
        if (this.loginData.role === 'admin') {
          this.router.push('/admin');
        } else if (this.loginData.role === 'operator') {
          this.router.push('/operator');
        }
      } catch (error) {
        alert("Invalid login credentials.");
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
</style>