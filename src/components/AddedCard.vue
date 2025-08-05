<template>
  <div :class="cardClasses" class="transition-transform transform hover:scale-105 cursor-pointer w-48 h-48 flex-shrink-0 p-4 flex flex-col justify-between relative" @click="handleClick">
    <div>
      <h3 class="text-lg font-semibold mb-1">{{ title }}</h3>
      <p class="text-sm text-gray-200 mb-2">{{ details }}</p>
    </div>
    <div class="text-xs text-gray-300 flex justify-between items-center">
      <div>
        <p>Created: {{ creationDate }}</p>
        <p v-if="completionDate">Completed: {{ completionDate }}</p>
      </div>
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
  details: {
    type: String,
    default: ''
  },
  creationDate: {
    type: String,
    required: true
  },
  completionDate: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'bg-blue-500'
  },
  icon: {
    type: String,
    default: '📝'
  },
  status: {
    type: String,
    default: 'normal' // 'normal', 'medium', 'urgent'
  }
});

const emit = defineEmits(['show-details']);

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

const handleClick = () => {
  emit('show-details', props);
};
</script>
