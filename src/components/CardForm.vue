<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md text-white">
      <h2 class="text-2xl font-bold mb-4">Create New Card</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-300">Title</label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="details" class="block text-sm font-medium text-gray-300">Details</label>
          <textarea
            id="details"
            v-model="formData.details"
            rows="3"
            class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="creationDate" class="block text-sm font-medium text-gray-300">Creation Date</label>
          <input
            type="date"
            id="creationDate"
            v-model="formData.creationDate"
            class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div class="mb-4">
          <label for="completionDate" class="block text-sm font-medium text-gray-300">Completion Date</label>
          <input
            type="date"
            id="completionDate"
            v-model="formData.completionDate"
            class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="status" class="block text-sm font-medium text-gray-300">Status</label>
          <select
            id="status"
            v-model="formData.status"
            class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-300">Choose Color</label>
          <div class="mt-1 grid grid-cols-5 gap-2">
            <div
              v-for="colorOption in colorOptions"
              :key="colorOption"
              :class="[colorOption, 'w-8 h-8 rounded-full cursor-pointer border-2', { 'border-blue-400': formData.color === colorOption, 'border-transparent': formData.color !== colorOption }]"
              @click="formData.color = colorOption"
            ></div>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="cancelForm"
            class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Card
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['submit', 'cancel']);

const today = new Date().toISOString().split('T')[0];

const formData = ref({
  title: '',
  details: '',
  creationDate: today,
  completionDate: '',
  status: 'normal', // Default status
  color: 'bg-blue-500', // Default color
});

const colorOptions = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-gray-500',
];

const submitForm = () => {
  emit('submit', formData.value);
  resetForm();
};

const cancelForm = () => {
  emit('cancel');
  resetForm();
};

const resetForm = () => {
  formData.value = {
    title: '',
    details: '',
    creationDate: today,
    completionDate: '',
    status: 'normal',
    color: 'bg-blue-500',
  };
};
</script>
