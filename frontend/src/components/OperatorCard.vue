<template>
  <tr>
    <td class="py-2 px-4 border-b border-gray-200">{{ operator.username }}</td>
    <td class="py-2 px-4 border-b border-gray-200">{{ operator.role }}</td>
    <td class="py-2 px-4 border-b border-gray-200">
      <div class="flex flex-wrap gap-2">
        <button @click="toggleEditMode" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700">Edit</button>
        <button @click="deleteOperator" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
      </div>
    </td>
  </tr>
  <tr v-if="editMode">
    <td colspan="3" class="py-2 px-4 border-b border-gray-200">
      <form @submit.prevent="editOperator" class="space-y-4">
        <div>
          <label for="edit-username" class="block text-sm font-medium text-gray-700">Username</label>
          <input v-model="editedOperator.username" type="text" id="edit-username" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <label for="edit-role" class="block text-sm font-medium text-gray-700">Role</label>
          <input v-model="editedOperator.role" type="text" id="edit-role" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
          <button @click="toggleEditMode" type="button" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">Cancel</button>
        </div>
      </form>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'OperatorCard',
  props: {
    operator: {
      type: Object,
      required: true,
    },
    fetchOperators: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const editMode = ref(false);
    const editedOperator = ref({ ...props.operator });

    const toggleEditMode = () => {
      editMode.value = !editMode.value;
      if (!editMode.value) {
        editedOperator.value = { ...props.operator };
      }
    };

    const editOperator = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${editedOperator.value._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedOperator.value),
        });
        if (!response.ok) {
          throw new Error("Failed to edit operator");
        }
        // Handle success, e.g., refresh the operator list
        await props.fetchOperators();
        toggleEditMode();
      } catch (error) {
        console.error(error);
      }
    };

    const deleteOperator = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${props.operator._id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error("Failed to delete operator");
        }
        // Handle success, e.g., refresh the operator list
        await props.fetchOperators();
      } catch (error) {
        console.error(error);
      }
    };

    return {
      editMode,
      editedOperator,
      toggleEditMode,
      editOperator,
      deleteOperator,
    };
  },
});
</script>