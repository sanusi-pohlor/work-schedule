<template>
  <div 
    class="group rounded-3xl shadow-lg border border-dashed border-gray-600 hover:border-blue-500 bg-gray-800/30 hover:bg-gray-800/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(59,130,246,0.2)] cursor-pointer w-full h-40 flex-shrink-0 flex items-center justify-center backdrop-blur-sm" 
    @click="handleClick"
  >
    <div class="flex flex-col items-center text-center p-4 text-gray-500 group-hover:text-blue-400 transition-colors">
      <div class="bg-gray-700/50 group-hover:bg-blue-500/20 rounded-full p-3 mb-2 transition-colors shadow-inner">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <h3 class="text-sm font-bold tracking-wide uppercase">Add New Task</h3>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['show-form']);

const handleClick = () => {
  emit('show-form');
};
</script>
