<template>
  <div>
    <h1>Operator Dashboard</h1>

    <!-- Form Peminjaman -->
    <form @submit.prevent="submitBorrow">
      <h2>Form Peminjaman</h2>
      <label>Nama Barang: <input v-model="borrowForm.item_name" type="text" required /></label>
      <label>Jumlah Pinjam: <input v-model.number="borrowForm.amount" type="number" required /></label>
      <label>Nama Peminjam: <input v-model="borrowForm.borrower_name" type="text" required /></label>
      <label>Tanggal Pengembalian: <input v-model="borrowForm.return_date" type="date" required /></label>
      <button type="submit">Submit</button>
    </form>

    <!-- Tabel Data Barang -->
    <h2>Data Barang yang Dipinjam</h2>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Barang</th>
          <th>Jumlah</th>
          <th>Tanggal Pinjam</th>
          <th>Tanggal Kembali</th>
          <th>Peminjam</th>
          <th>Petugas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in borrowedItems" :key="item._id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.item_name }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ new Date(item.borrow_date).toLocaleDateString() }}</td>
          <td>{{ new Date(item.return_date).toLocaleDateString() }}</td>
          <td>{{ item.borrower_name }}</td>
          <td>{{ item.officer_name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      borrowForm: {
        item_name: '',
        amount: 1,
        borrow_date: new Date().toISOString().split('T')[0],
        return_date: '',
        borrower_name: '',
        officer_name: 'OperatorName', // Hardcoded for now, can be dynamic
      },
      borrowedItems: [],
    };
  },
  methods: {
    async submitBorrow() {
      try {
        await axios.post('/api/operator/book-equipment', this.borrowForm);
        alert('Peminjaman berhasil!');
        this.fetchBorrowedItems();
      } catch (error) {
        alert('Error: ' + error.response.data.error);
      }
    },
    async fetchBorrowedItems() {
      try {
        const response = await axios.get('/api/operator/all-equipment');
        this.borrowedItems = response.data;
      } catch (error) {
        alert('Error fetching data: ' + error.message);
      }
    },
  },
  mounted() {
    this.fetchBorrowedItems();
  },
};
</script>

<style>
/*ini entar style hehe*/
</style>
