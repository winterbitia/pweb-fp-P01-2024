<script lang="ts">
import { ref, onMounted } from 'vue';
import BorrowCard from '@/components/BorrowCard.vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface BorrowObj {
  _id: string;
  item_name: string;
  amount: number;
  borrow_date: Date;
  return_date: Date;
  borrower_name: string;
  officer_name: string;
}

export default {
  name: 'AdminBorrows',
  components: {
    BorrowCard,
  },
  setup() {
    const borrowsData = ref<BorrowObj[]>([]);
    const fetchError = ref(false);
    const isLoading = ref(true);

    const fetchBorrows = async () => {
      try {
        const response = await fetch("http://localhost:3000/borrow/all-equipment");
        if (!response.ok) {
          throw new Error("Failed to fetch borrow data");
        }
        const data = await response.json();
        borrowsData.value = [...data];
      } catch (error) {
        console.error(error);
        fetchError.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    const exportToPDF = () => {
      const doc = new jsPDF();
      doc.text("Borrow Item Summary", 14, 16);
      doc.autoTable({
        head: [['#', 'Item Name', 'Amount', 'Borrow Date', 'Return Date', 'Borrower Name', 'Officer Name']],
        body: borrowsData.value.map((borrow, index) => [
          index + 1,
          borrow.item_name,
          borrow.amount,
          formatDate(borrow.borrow_date, false),
          formatDate(borrow.return_date, false),
          borrow.borrower_name,
          borrow.officer_name,
        ]),
        startY: 20,
      });
      const timestamp = new Date();
      doc.save(`borrow_summary_${formatDate(timestamp, true)}.pdf`);
    };

    const formatDate = (dateString: Date, filename: Boolean) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      if (filename) {
        return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
      } else {
        return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
      }
    };

    onMounted(fetchBorrows);

    return {
      borrowsData,
      fetchError,
      isLoading,
      fetchBorrows,
      exportToPDF,
    };
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold">Borrow Item Summary</h2>
    
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <span class="ml-2 text-lg text-gray-600">Loading borrows...</span>
    </div>
    
    <div v-else-if="fetchError" class="text-red-500 text-center text-lg">
      Failed to fetch borrows. Please try again later.
    </div>
    
    <div v-else-if="borrowsData.length === 0" class="text-gray-500 text-center text-lg">
      No borrows found.
    </div>
    
    <div v-else class="overflow-x-auto mt-8">
      <button @click="exportToPDF" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4">Export to PDF</button>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">#</th>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Item Name</th>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Amount</th>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Borrow Date</th>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Return Date</th>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Borrower Name</th>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Officer Name</th>
          </tr>
        </thead>
        <tbody>
          <BorrowCard
            v-for="(borrow, index) in borrowsData"
            :key="borrow._id"
            :borrowObj="borrow"
            :index="index"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>