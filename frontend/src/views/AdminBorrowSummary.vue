<script lang="ts">
import { ref, onMounted } from 'vue';
import BorrowCard from '@/components/BorrowCard.vue';

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

    onMounted(fetchBorrows);

    return {
      borrowsData,
      fetchError,
      isLoading,
      fetchBorrows,
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