<script lang="ts">
import { ref, onMounted } from 'vue';
import OperatorCard from '@/components/OperatorCard.vue';

interface OperatorObj {
  _id: string;
  username: string;
  password?: string;
  role: 'Admin' | 'Operator';
}

export default {
  name: 'AdminOperators',
  components: {
    OperatorCard,
  },
  setup() {
    const operatorsData = ref<OperatorObj[]>([]);
    const fetchError = ref(false);
    const isLoading = ref(true);
    const isFormVisible = ref(false);
    const newOperator = ref({
      username: '',
      password: '',
      role: 'Operator' as 'Admin' | 'Operator',
    });

    const fetchOperators = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch operator data");
        }
        const data = await response.json();
        operatorsData.value = [...data];
      } catch (error) {
        console.error(error);
        fetchError.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    const addOperator = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOperator.value),
        });
        if (!response.ok) {
          throw new Error("Failed to add operator");
        }
        await fetchOperators(); // Refresh the operators list
        newOperator.value = { username: '', role: 'Operator', password: '' }; // Reset the form
        isFormVisible.value = false; // Hide the form
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchOperators);

    return {
      operatorsData,
      fetchError,
      isLoading,
      newOperator,
      addOperator,
      fetchOperators,
      isFormVisible,
    };
  },
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold">Manage Operators</h2>
    <button @click="isFormVisible = !isFormVisible" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-8">
      {{ isFormVisible ? 'Hide Form' : 'Add New Operator' }}
    </button>
    
    <div v-if="isFormVisible" class="mt-8">
      <h3 class="text-xl font-bold mb-4">Add New Operator</h3>
      <form @submit.prevent="addOperator" class="space-y-4">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="newOperator.username" type="text" id="username" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
          <select v-model="newOperator.role" id="role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required>
            <option value="Admin">Admin</option>
            <option value="Operator">Operator</option>
          </select>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="newOperator.password" type="password" id="password" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Operator</button>
        </div>
      </form>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <span class="ml-2 text-lg text-gray-600">Loading operators...</span>
    </div>
    
    <div v-else-if="fetchError" class="text-red-500 text-center text-lg">
      Failed to fetch operators. Please try again later.
    </div>
    
    <div v-else-if="operatorsData.length === 0" class="text-gray-500 text-center text-lg">
      No operators found.
    </div>
    
    <div v-else class="overflow-x-auto mt-8">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Username</th>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Role</th>
            <th class="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <OperatorCard
            v-for="operator in operatorsData"
            :key="operator._id"
            :operator="operator"
            :fetchOperators="fetchOperators"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>