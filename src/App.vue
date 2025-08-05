<script setup>
import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <div class="flex flex-1">
      <Sidebar />
      <main class="flex-1 p-4 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
</style>
