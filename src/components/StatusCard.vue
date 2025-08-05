<template>
  <div :class="cardClasses" class="transition-transform transform hover:scale-105 cursor-pointer h-48 flex-shrink-0">
    <div class="flex flex-col items-center text-center p-4">
      <span class="text-4xl mb-3">{{ icon }}</span>
      <h3 class="text-lg font-semibold">{{ title }}</h3>
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
    default: '✅'
  }
});

const cardClasses = computed(() => {
  return [
    'rounded-xl shadow-lg text-white',
    {
      'bg-green-600 hover:bg-green-700': props.status === 'normal',
      'bg-yellow-600 hover:bg-yellow-700': props.status === 'medium',
      'bg-red-600 hover:bg-red-700': props.status === 'urgent',
    }
  ];
});
</script>
