<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
      <div class="flex-grow flex items-center justify-center space-x-16"> 
        <div class="flip-card" @click="flipCard('rules')">
          <div :class="['flip-card-inner', { flipped: flippedCard === 'rules' }]">
            <div class="flip-card-front bg-gradient-to-tr from-gray-500 to-blue-950 p-12 rounded-lg shadow-lg w-full max-w-2xl h-[450px] flex items-center justify-center"> <!-- Center content -->
              <h1 class="text-2xl font-bold text-center mb-5 text-white">Aturan Peminjaman</h1>
            </div>
            <div class="flip-card-back bg-gray-600 p-12 rounded-lg shadow-lg w-full max-w-2xl h-[450px]"> 
              <ul class="list-disc pl-8 text-base text-left text-white font-medium">
                <li>Peminjaman minimal 3 hari sebelumnya melalui sistem online, disertai surat resmi</li>
                <li>Peminjam wajib menjaga kebersihan dan bertanggung jawab atas kerusakan/peralatan yang hilang</li>
                <li>Laboratorium hanya bisa digunakan sesuai jadwal, maksimal 8 jam/hari (izin khusus diperlukan di luar jam kerja)</li>
              </ul>
            </div>
          </div>
        </div>
  
        <div class="flip-card" @click="flipCard('flow')">
          <div :class="['flip-card-inner', { flipped: flippedCard === 'flow' }]">
            <div class="flip-card-front bg-gradient-to-tr from-gray-500 to-blue-950 p-12 rounded-lg shadow-lg w-full max-w-2xl h-[450px] flex items-center justify-center"> <!-- Center content -->
              <h1 class="text-2xl font-bold text-center mb-5 text-white">Alur Peminjaman</h1>
            </div>
            <div class="flip-card-back bg-gray-600 p-12 rounded-lg shadow-lg w-full max-w-2xl h-[450px]"> <!-- Increase width and height -->
              <ul class="list-disc pl-8 text-base text-left text-white font-medium">
                <li><strong>Pengajuan</strong> – Peminjam mengisi formulir online dan mengunggah surat permohonan resmi</li>
                <li><strong>Verifikasi</strong> – Penanggung jawab laboratorium memverifikasi dan menyetujui peminjaman</li>
                <li><strong>Jadwal</strong> – Jadwal penggunaan dikonfirmasi dan disampaikan kepada peminjam</li>
                <li><strong>Pengembalian</strong> – Peminjam mengembalikan alat sesuai jadwal yang telah ditentukan</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: { Footer },
    data() {
      return {
        flippedCard: null,
      };
    },
    methods: {
      flipCard(card) {
        this.flippedCard = this.flippedCard === card ? null : card;
      },
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: Arial, sans-serif;
  }
  
  .flip-card {
    background-color: transparent;
    width: 450px;
    max-width: 500px;
    height: 300px; 
    perspective: 1000px;
    cursor: pointer;
  }
  
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .flip-card-inner.flipped {
    transform: rotateY(180deg);
  }
  
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
  }
  
  .flip-card-front {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .flip-card-back {
    transform: rotateY(180deg);
  }
  </style>