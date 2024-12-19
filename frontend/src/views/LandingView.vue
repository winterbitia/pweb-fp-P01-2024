// src/views/LandingView.vue
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
            class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    <footer class="bg-gray-800 text-white text-center py-4">
      <p>&copy; 2024 Peminjaman Barang</p>
    </footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import dummyData from "../dummyData";

export default {
  components: { Navbar },
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
  methods: {
    handleLogin() {
      const user = dummyData.find(
        (u) =>
          u.username === this.loginData.username &&
          u.password === this.loginData.password &&
          u.role === this.loginData.role
      );
      if (user) {
        this.username = user.username;
        alert("Login successful!");
      } else {
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
