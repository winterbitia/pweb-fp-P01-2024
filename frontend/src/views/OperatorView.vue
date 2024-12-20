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
    await axios.post('http://localhost:3000/borrow/book-equipment', this.borrowForm);
    alert('Peminjaman berhasil!');
    this.fetchBorrowedItems(); // Refresh tabel setelah submit
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      alert('Error: ' + error.response.data.error);
    } else {
      console.error('Unknown error:', error); // Debugging tambahan
      alert('Terjadi kesalahan saat mengirim data.');
    }
  }
},
    async fetchBorrowedItems() {
      try {
        const response = await axios.get('http://localhost:3000/borrow/all-equipment');
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
/* General Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  color: #333;
}

/* Container */
div {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Headings */
h1 {
  text-align: center;
  color: #444;
}

h2 {
  color: #555;
  margin-top: 20px;
}

/* Form Styles */
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

form label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60%;
}

form button {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #0056b3;
}

/* Table Styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table th,
table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

table thead {
  background-color: #007BFF;
  color: white;
}

table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tbody tr:hover {
  background-color: #f1f9ff;
}

/* Responsive Design */
@media (max-width: 768px) {
  form label {
    flex-direction: column;
    align-items: flex-start;
  }

  form input {
    width: 100%;
  }

  table {
    font-size: 14px;
  }
}
</style>
