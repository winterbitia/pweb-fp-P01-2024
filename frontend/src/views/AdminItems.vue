<script lang="ts">
import { ref, onMounted } from 'vue';
import ItemCard from '@/components/ItemCard.vue';

interface ItemObj {
  _id: string;
  name: string;
  amount: string;
  condition: string;
  created_at: Date;
}

export default {
  name: 'AdminItems',
  components: {
    ItemCard,
  },
  setup() {
    const itemsData = ref<ItemObj[]>([]);
    const fetchError = ref(false);
    const isLoading = ref(true);
    const isFormVisible = ref(false);
    const newItem = ref({
      name: '',
      amount: '',
      condition: '',
    });

    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/items");
        if (!response.ok) {
          throw new Error("Failed to fetch item data");
        }
        const data = await response.json();
        itemsData.value = [...data];
      } catch (error) {
        console.error(error);
        fetchError.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    const addItem = async () => {
      try {
        const response = await fetch("http://localhost:3000/items", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem.value),
        });
        if (!response.ok) {
          throw new Error("Failed to add item");
        }
        await fetchItems(); // Refresh the items list
        newItem.value = { name: '', amount: '', condition: '' }; // Reset the form
        isFormVisible.value = false; // Hide the form
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchItems);

    return {
      itemsData,
      fetchError,
      isLoading,
      newItem,
      addItem,
      fetchItems,
      isFormVisible,
    };
  },
};
</script>

<template>
  <button @click="isFormVisible = !isFormVisible" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-8">Add New Item</button>
    
    <div v-if="isFormVisible" class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Add New Item</h2>
      <form @submit.prevent="addItem" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="newItem.name" type="text" id="name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
          <input v-model="newItem.amount" type="text" id="amount" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label for="condition" class="block text-sm font-medium text-gray-700">Condition</label>
          <input v-model="newItem.condition" type="text" id="condition" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Item</button>
        </div>
      </form>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <span class="ml-2 text-lg text-gray-600">Loading items...</span>
    </div>
    
    <div v-else-if="fetchError" class="text-red-500 text-center text-lg">
      Failed to fetch items. Please try again later.
    </div>
    
    <div v-else-if="itemsData.length === 0" class="text-gray-500 text-center text-lg">
      No items found.
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ItemCard v-for="item in itemsData" :key="item._id" :item="item" @item-deleted="fetchItems" @item-edited="fetchItems" />
    </div>
</template>