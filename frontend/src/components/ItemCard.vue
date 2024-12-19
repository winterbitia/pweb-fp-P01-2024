<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ItemCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
    fetchItems: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const editMode = ref(false);
    const editedItem = ref({ ...props.item });

    function formatTimestamp(timestamp: string): string {
      const date = new Date(timestamp);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
    }

    const formattedDate = formatTimestamp(props.item.created_at);

    const toggleEditMode = () => {
      editMode.value = !editMode.value;
      if (!editMode.value) {
        editedItem.value = { ...props.item };
      }
    };

    const editItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/items/${editedItem.value._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedItem.value),
        });
        if (!response.ok) {
          throw new Error("Failed to edit item");
        }
        // Handle success, e.g., refresh the item list
        await props.fetchItems();
        toggleEditMode();
      } catch (error) {
        console.error(error);
      }
    };

    const deleteItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/items/${props.item._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error("Failed to delete item");
        }
        // Handle success, e.g., refresh the item list
        await props.fetchItems();
      } catch (error) {
        console.error(error);
      }
    };

    return {
      editMode,
      editedItem,
      formattedDate,
      toggleEditMode,
      editItem,
      deleteItem,
    };
  },
});
</script>

<template>
  <tr>
    <td class="py-2 px-4 border-b border-gray-200">{{ item.name }}</td>
    <td class="py-2 px-4 border-b border-gray-200">{{ item.amount }}</td>
    <td class="py-2 px-4 border-b border-gray-200">{{ item.condition }}</td>
    <td class="py-2 px-4 border-b border-gray-200">{{ formattedDate }}</td>
    <td class="py-2 px-4 border-b border-gray-200">
      <div class="flex flex-wrap gap-2">
        <button @click="deleteItem" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
        <button @click="toggleEditMode" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700">Edit</button>
      </div>
    </td>
  </tr>
  <tr v-if="editMode">
    <td colspan="5" class="py-2 px-4 border-b border-gray-200">
      <form @submit.prevent="editItem" class="space-y-4">
        <div>
          <label for="edit-name" class="block text-sm font-medium text-gray-700">Name</label>
          <input v-model="editedItem.name" type="text" id="edit-name" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label for="edit-amount" class="block text-sm font-medium text-gray-700">Amount</label>
          <input v-model="editedItem.amount" type="text" id="edit-amount" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label for="edit-condition" class="block text-sm font-medium text-gray-700">Condition</label>
          <input v-model="editedItem.condition" type="text" id="edit-condition" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
          <button @click="toggleEditMode" type="button" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">Cancel</button>
        </div>
      </form>
    </td>
  </tr>
</template>