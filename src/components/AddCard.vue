<template>
  <div class="rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105 cursor-pointer w-48 h-48 flex-shrink-0" @click="handleClick">
    <div class="flex flex-col items-center text-center p-4">
      <span class="text-4xl mb-3">+</span>
      <h3 class="text-lg font-semibold">Add New</h3>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['show-form']);

const handleClick = () => {
  emit('show-form');
};
</script>
