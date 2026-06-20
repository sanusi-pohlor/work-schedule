<template>
  <div 
    :class="cardClasses" 
    class="group relative transition-all duration-300 transform hover:-translate-y-2 hover:shadow-md cursor-grab active:cursor-grabbing w-full h-40 flex flex-col justify-between overflow-hidden border border-gray-100 bg-white" 
    @click="handleClick"
  >
    <div class="relative z-10 p-4 h-full flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-bold text-slate-800 leading-tight line-clamp-1 flex items-center gap-2">
          <span>{{ statusIcon }}</span>
          {{ card.title }}
        </h3>
        
        <!-- Edit Button (Shows on Hover) -->
        <button 
          @click.stop="handleEdit" 
          class="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 text-slate-500 hover:text-slate-700"
          title="Edit Task"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
      
      <p class="text-sm text-slate-500 mb-auto line-clamp-2 font-medium">{{ card.details || 'No details provided.' }}</p>
      
      <div class="mt-3 flex justify-between items-end text-xs font-semibold text-slate-400 border-t border-gray-100 pt-2">
        <div class="flex flex-col gap-0.5">
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {{ card.creationDate }}
          </span>
          <span v-if="card.completionDate" class="flex items-center gap-1 text-emerald-500">
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
    case 'medium': return '🟡';
    case 'urgent': return '🔴';
    default: return '🟢';
  }
});

const cardClasses = computed(() => {
  // Define border-left color based on color theme instead of full background
  const colorMap = {
    'bg-slate-50': 'border-l-4 border-l-slate-400',
    'bg-blue-50': 'border-l-4 border-l-blue-400',
    'bg-emerald-50': 'border-l-4 border-l-emerald-400',
    'bg-amber-50': 'border-l-4 border-l-amber-400',
    'bg-rose-50': 'border-l-4 border-l-rose-400',
    'bg-purple-50': 'border-l-4 border-l-purple-400',
    'bg-pink-50': 'border-l-4 border-l-pink-400',
    'bg-indigo-50': 'border-l-4 border-l-indigo-400',
    'bg-teal-50': 'border-l-4 border-l-teal-400',
    'bg-orange-50': 'border-l-4 border-l-orange-400',
  };
  
  const defaultBorder = 'border-l-4 border-l-blue-400';
  
  return [
    'rounded-3xl shadow-sm text-slate-800',
    colorMap[props.card.color] || defaultBorder,
    {
      'ring-1 ring-rose-200': props.card.status === 'urgent',
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
