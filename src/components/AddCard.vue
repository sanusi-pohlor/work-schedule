<template>
  <div 
    class="group rounded-3xl shadow-sm border border-dashed border-gray-300 hover:border-blue-400 bg-white hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-md cursor-pointer w-full h-40 flex-shrink-0 flex items-center justify-center" 
    @click="handleClick"
  >
    <div class="flex flex-col items-center text-center p-4 text-gray-400 group-hover:text-blue-500 transition-colors">
      <div class="bg-gray-50 group-hover:bg-blue-50 rounded-full p-3 mb-2 transition-colors border border-gray-100 group-hover:border-blue-100">
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
