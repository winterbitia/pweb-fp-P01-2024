<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export interface ItemObj {
  _id: string;
  name: string;
  amount: string;
  condition: string;
  created_at: Date;
}

export default defineComponent({
  name: 'ItemCard',
  props: {
    item: {
      type: Object as PropType<ItemObj>,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
      editedItem: { ...this.item },
    };
  },
  methods: {
    async deleteItem() {
      try {
        const response = await fetch(`http://localhost:3000/items/${this.item._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        this.$emit('item-deleted');
      } catch (error) {
        console.error(error);
      }
    },
    async editItem() {
      try {
        const response = await fetch(`http://localhost:3000/items/${this.item._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.editedItem),
        });
        if (!response.ok) {
          throw new Error('Failed to edit item');
        }
        this.editMode = false;
        this.$emit('item-edited');
      } catch (error) {
        console.error(error);
      }
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
      this.editedItem = { ...this.item };
    },
  },
  computed: {
    formattedDate(): string {
      const date = new Date(this.item.created_at);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
});
</script>

<template>
  <div class="">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ item.name }}</h2>
        <p class="text-3xl font-semibold text-green-600 mb-4">{{ item.amount }}</p>
        <div class="flex justify-between items-center mb-4">
          <span class="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{{ item.condition }}</span>
          <span class="text-sm text-gray-500">{{ formattedDate }}</span>
        </div>
        <button @click="deleteItem" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
        <button @click="toggleEditMode" class="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 ml-2">Edit</button>
        <div v-if="editMode" class="mt-4">
          <h3 class="text-xl font-bold mb-2">Edit Item</h3>
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
        </div>
      </div>
    </div>
  </div>
</template>