<template>
  <div 
    :class="cardClasses" 
    class="relative group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg cursor-pointer h-32 flex-shrink-0 overflow-hidden flex items-center border border-gray-100 bg-white"
  >
    <!-- Background overlay for hover effect -->
    <div class="absolute inset-0 bg-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

    <div class="relative z-10 flex items-center justify-between w-full px-8">
      <div class="flex flex-col">
        <h3 class="text-xl font-bold tracking-wide text-slate-800">{{ title }}</h3>
        <p :class="textStatusClass" class="text-xs uppercase tracking-widest mt-1 font-semibold">{{ status }} Priority</p>
      </div>
      <div class="text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{{ icon }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'normal' // 'normal', 'medium', 'urgent'
  },
  icon: {
    type: String,
    default: '🟢'
  }
});

const cardClasses = computed(() => {
  return [
    'rounded-3xl shadow-sm text-slate-800',
    {
      'border-l-4 border-l-emerald-400': props.status === 'normal',
      'border-l-4 border-l-amber-400': props.status === 'medium',
      'border-l-4 border-l-rose-400': props.status === 'urgent',
    }
  ];
});

const textStatusClass = computed(() => {
  switch (props.status) {
    case 'normal': return 'text-emerald-600';
    case 'medium': return 'text-amber-600';
    case 'urgent': return 'text-rose-600';
    default: return 'text-slate-500';
  }
});
</script>
