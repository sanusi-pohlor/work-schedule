<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
    <div :class="[card.color, 'p-6 rounded-lg shadow-xl w-full max-w-md text-white']">
      <h2 class="text-2xl font-bold mb-4">{{ card.title }}</h2>
      <p class="mb-2"><strong>Details:</strong> {{ card.details || 'N/A' }}</p>
      <p class="mb-2"><strong>Created:</strong> {{ card.creationDate }}</p>
      <p class="mb-4"><strong>Completed:</strong> {{ card.completionDate || 'N/A' }}</p>
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="emit('delete-card', card.title)"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete
        </button>
        <button
          type="button"
          @click="emit('close')"
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'delete-card']);
</script>
