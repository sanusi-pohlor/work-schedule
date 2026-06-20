<template>
  <div 
    :class="cardClasses" 
    class="relative group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(167,139,250,0.15)] cursor-pointer h-32 flex-shrink-0 overflow-hidden flex items-center border border-white/60 backdrop-blur-md"
  >
    <!-- Background overlay for glass effect -->
    <div class="absolute inset-0 bg-white/40 pointer-events-none"></div>
    
    <!-- Glow effect on hover -->
    <div class="absolute -inset-1 bg-white/60 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none z-0"></div>

    <div class="relative z-10 flex items-center justify-between w-full px-8">
      <div class="flex flex-col">
        <h3 class="text-xl font-bold tracking-wide drop-shadow-sm">{{ title }}</h3>
        <p class="text-xs uppercase tracking-widest mt-1 opacity-70 font-semibold">{{ status }} Priority</p>
      </div>
      <div class="text-5xl drop-shadow-sm group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6">{{ icon }}</div>
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
    default: '🌱'
  }
});

const cardClasses = computed(() => {
  return [
    'rounded-3xl shadow-md',
    {
      'bg-gradient-to-br from-emerald-100 to-teal-100 text-teal-800': props.status === 'normal',
      'bg-gradient-to-br from-orange-100 to-amber-100 text-orange-800': props.status === 'medium',
      'bg-gradient-to-br from-rose-100 to-pink-100 text-rose-800': props.status === 'urgent',
    }
  ];
});
</script>
