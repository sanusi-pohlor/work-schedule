<template>
  <div class="fixed inset-0 bg-purple-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300" @click.self="emit('close')">
    <div 
      :class="[card.color || 'bg-white', 'p-8 rounded-3xl shadow-2xl w-full max-w-lg text-gray-800 transform transition-all duration-300 scale-100 border border-white/60']"
    >
      <div class="flex justify-between items-start mb-6">
        <h2 class="text-3xl font-bold flex items-center gap-3 drop-shadow-sm text-gray-800">
          <span>{{ statusIcon }}</span>
          {{ card.title }}
        </h2>
        <button @click="emit('close')" class="text-gray-500 hover:text-gray-800 transition-colors bg-white/50 hover:bg-white/80 rounded-full p-2 shadow-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="bg-white/50 rounded-2xl p-5 mb-6 backdrop-blur-sm border border-white/50 shadow-inner">
        <p class="text-gray-700 text-base leading-relaxed whitespace-pre-wrap font-medium">{{ card.details || 'ไม่มีรายละเอียดเพิ่มเติม' }}</p>
      </div>
      
      <div class="grid grid-cols-2 gap-4 mb-8 text-sm bg-white/40 p-4 rounded-2xl border border-white/40">
        <div class="flex flex-col">
          <span class="text-gray-500 mb-1 font-bold">วันที่สร้าง</span>
          <span class="font-bold text-gray-800">{{ card.creationDate }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-gray-500 mb-1 font-bold">วันที่เสร็จสิ้น</span>
          <span class="font-bold text-emerald-600">{{ card.completionDate || 'รอดำเนินการ' }}</span>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3 pt-4 border-t border-white/50">
        <button
          type="button"
          @click="emit('delete-card', card)"
          class="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-rose-300 font-bold flex items-center gap-2 shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          ลบงาน
        </button>
        <button
          type="button"
          @click="emit('edit-card', card)"
          class="px-5 py-2.5 bg-white/60 hover:bg-white/80 text-purple-700 rounded-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 font-bold flex items-center gap-2 backdrop-blur-sm shadow-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          แก้ไขงาน
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
    case 'medium': return '⭐';
    case 'urgent': return '🎀';
    default: return '🌱';
  }
});
</script>
