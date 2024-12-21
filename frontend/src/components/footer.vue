<template>
    <footer class="footer bg-gray-800 text-white text-center fixed bottom-0 left-0 w-full">
      <div class="flex items-center justify-center h-full space-x-4">
        <p class="text-base font-medium">powered by:</p>
        <a href="https://www.instagram.com/kcks_its" target="_blank" rel="noopener noreferrer">
          <img src="../assets/logo/logoKCKS.png" alt="Instagram Account 1" class="instagram-icon" />
        </a>
        <a href="https://www.instagram.com/amoesn_" target="_blank" rel="noopener noreferrer">
          <img src="../assets/logo/amoes-IG.jpg" alt="Instagram Account 2" class="instagram-icon" />
        </a>
        <a href="https://www.instagram.com/qurr_ay_" target="_blank" rel="noopener noreferrer">
          <img src="../assets/logo/farida-IG.jpg" alt="Instagram Account 4" class="instagram-icon" />
        </a>
        <a href="https://www.instagram.com/karisuta.san" target="_blank" rel="noopener noreferrer">
          <img src="../assets/logo/callista-IG.jpg" alt="Instagram Account 3" class="instagram-icon" />
        </a>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  .footer {
    font-family: Arial, sans-serif;
    height: 60px;
    padding: 0 20px; 
  }
  
  .instagram-icon {
    width: 35px; 
    height: 35px;
    border-radius: 50%; /* Make the icon circular */
  }
  </style>