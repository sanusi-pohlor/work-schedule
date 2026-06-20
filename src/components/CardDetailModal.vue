<template>
  <div class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity duration-300" @click.self="emit('close')">
    <div 
      :class="[card.color || 'bg-gray-800', 'p-8 rounded-3xl shadow-2xl w-full max-w-lg text-white transform transition-all duration-300 scale-100 border border-white/20']"
    >
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-3xl font-bold flex items-center gap-3 drop-shadow-md">
          <span>{{ statusIcon }}</span>
          {{ card.title }}
        </h2>
        <button @click="emit('close')" class="text-white/70 hover:text-white transition-colors bg-black/20 hover:bg-black/40 rounded-full p-2 shadow-inner">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="bg-black/40 rounded-2xl p-5 mb-6 backdrop-blur-sm border border-white/10 shadow-inner">
        <p class="text-gray-200 text-base leading-relaxed whitespace-pre-wrap font-medium">{{ card.details || 'No additional details provided.' }}</p>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-8 text-sm bg-black/30 p-4 rounded-2xl border border-white/10">
        <div class="flex flex-col">
          <span class="text-gray-400 mb-1 font-bold">Created On</span>
          <span class="font-bold text-gray-100">{{ card.creationDate }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-400 mb-1 font-bold">Completed On</span>
          <span class="font-bold text-emerald-400">{{ card.completionDate || 'Pending' }}</span>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 pt-4 border-t border-white/20">
        <button
          type="button"
          @click="emit('delete-card', card)"
          class="px-5 py-2.5 bg-red-500/80 hover:bg-red-500 text-white rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 font-bold flex items-center gap-2 shadow-lg"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          Delete
        </button>
        <button
          type="button"
          @click="emit('edit-card', card)"
          class="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 font-bold flex items-center gap-2 backdrop-blur-sm shadow-lg border border-white/20"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'delete-card', 'edit-card']);

const statusIcon = computed(() => {
  switch(props.card.status) {
    case 'medium': return '⚠️';
    case 'urgent': return '🔥';
    default: return '✅';
  }
});
</script>
