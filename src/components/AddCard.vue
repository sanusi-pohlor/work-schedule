<template>
  <div 
    class="group rounded-3xl shadow-sm border-2 border-dashed border-purple-200 hover:border-purple-400 bg-white/40 hover:bg-white/70 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(167,139,250,0.15)] cursor-pointer w-full h-40 flex-shrink-0 flex items-center justify-center backdrop-blur-sm" 
    @click="handleClick"
  >
    <div class="flex flex-col items-center text-center p-4 text-purple-400 group-hover:text-purple-600 transition-colors">
      <div class="bg-purple-50 group-hover:bg-purple-100 rounded-full p-3 mb-2 transition-colors">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <h3 class="text-sm font-bold tracking-wide uppercase">เพิ่มงานใหม่</h3>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['show-form']);

const handleClick = () => {
  emit('show-form');
};
</script>
