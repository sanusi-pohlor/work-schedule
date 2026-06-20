<template>
  <div 
    :class="cardClasses" 
    class="group relative transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing w-full h-40 flex flex-col justify-between overflow-hidden border border-white/10" 
    @click="handleClick"
  >
    <!-- Background overlay for glass effect -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
    
    <div class="relative z-10 p-4 h-full flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold text-white leading-tight line-clamp-1 drop-shadow-md flex items-center gap-2">
          <span>{{ statusIcon }}</span>
          {{ card.title }}
        </h3>
        
        <!-- Edit Button (Shows on Hover) -->
        <button 
          @click.stop="handleEdit" 
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 hover:bg-white/30 rounded-full p-1.5 backdrop-blur-sm"
          title="Edit Task"
        >
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
      
      <p class="text-sm text-gray-200 mb-auto line-clamp-2 font-medium">{{ card.details || 'No details provided.' }}</p>
      
      <div class="mt-3 flex justify-between items-end text-xs font-medium text-white/80 border-t border-white/20 pt-2">
        <div class="flex flex-col gap-0.5">
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {{ card.creationDate }}
          </span>
          <span v-if="card.completionDate" class="flex items-center gap-1 text-emerald-300">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            {{ card.completionDate }}
          </span>
        </div>
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

const emit = defineEmits(['show-details', 'edit']);

const statusIcon = computed(() => {
  switch(props.card.status) {
    case 'medium': return '⚠️';
    case 'urgent': return '🔥';
    default: return '✅';
  }
});

const cardClasses = computed(() => {
  return [
    'rounded-3xl shadow-lg text-white',
    props.card.color || 'bg-gray-800', // fallback if color is missing
    {
      'ring-2 ring-red-400': props.card.status === 'urgent',
    }
  ];
});

const handleClick = () => {
  emit('show-details', props.card);
};

const handleEdit = () => {
  emit('edit', props.card);
};
</script>
