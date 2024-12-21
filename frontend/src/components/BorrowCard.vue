<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BorrowCard',
  props: {
    borrowObj: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    };

    return {
      formatDate,
    };
  },
});
</script>

<template>
  <tr>
    <td class="py-2 px-4 border border-gray-200">{{ index + 1 }}</td>
    <td class="py-2 px-4 border border-gray-200">{{ borrowObj.item_name }}</td>
    <td class="py-2 px-4 border border-gray-200">{{ borrowObj.amount }}</td>
    <td class="py-2 px-4 border border-gray-200">{{ formatDate(borrowObj.borrow_date) }}</td>
    <td class="py-2 px-4 border border-gray-200">{{ formatDate(borrowObj.return_date) }}</td>
    <td class="py-2 px-4 border border-gray-200">{{ borrowObj.borrower_name }}</td>
    <td class="py-2 px-4 border border-gray-200">{{ borrowObj.officer_name }}</td>
  </tr>
</template>