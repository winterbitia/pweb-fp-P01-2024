<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Navbar :username="username" :role="role" />
    <div class="flex-grow">
      <router-view @update-user="updateUser" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      username: localStorage.getItem('username') || '',
      role: localStorage.getItem('role') || '',
    };
  },
  methods: {
    updateUser(username, role) {
      this.username = username;
      this.role = role;
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.flex-grow {
  flex: 1;
}
</style>