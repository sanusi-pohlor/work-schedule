<script setup>
import { ref, computed } from 'vue';
import { useBoardStore } from './stores/useBoardStore';
import Header from './components/Header.vue';
import StatusCard from './components/StatusCard.vue';
import AddCard from './components/AddCard.vue';
import AddedCard from './components/AddedCard.vue';
import CardForm from './components/CardForm.vue';
import ConfirmationDialog from './components/ConfirmationDialog.vue';
import CardDetailModal from './components/CardDetailModal.vue';
import Footer from './components/Footer.vue';
import draggable from 'vuedraggable';

const store = useBoardStore();

const defaultCards = [
  { title: "ปกติ", status: "normal", icon: "🌱" },
  { title: "ปานกลาง", status: "medium", icon: "⭐" },
  { title: "ด่วน", status: "urgent", icon: "🎀" },
];

const showCardForm = ref(false);
const editingCardData = ref(null);

const showConfirmDialog = ref(false);
const cardToDelete = ref(null);

const showCardDetailModal = ref(false);
const selectedCardForDetails = ref(null);

// Form handlers
const handleAddCardClick = () => {
  editingCardData.value = null;
  showCardForm.value = true;
};

const handleEditCardClick = (card) => {
  editingCardData.value = card;
  showCardForm.value = true;
  showCardDetailModal.value = false;
};

const handleFormSubmit = (formData) => {
  if (editingCardData.value) {
    store.updateCard(formData);
  } else {
    store.addCard(formData);
  }
  showCardForm.value = false;
  editingCardData.value = null;
};

const handleFormCancel = () => {
  showCardForm.value = false;
  editingCardData.value = null;
};

// Delete handlers
const handleDeleteCardClick = (card) => {
  cardToDelete.value = card;
  showConfirmDialog.value = true;
};

const handleConfirmDelete = () => {
  if (cardToDelete.value) {
    store.deleteCard(cardToDelete.value.id);
  }
  showConfirmDialog.value = false;
  cardToDelete.value = null;
  showCardDetailModal.value = false;
};

const handleCancelDelete = () => {
  showConfirmDialog.value = false;
  cardToDelete.value = null;
};

// Detail modal handlers
const handleShowCardDetails = (cardData) => {
  selectedCardForDetails.value = cardData;
  showCardDetailModal.value = true;
};

const handleCloseCardDetails = () => {
  showCardDetailModal.value = false;
  selectedCardForDetails.value = null;
};

</script>

<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-fuchsia-50 to-purple-100 text-gray-800 font-sans">
    <Header />
    <main class="flex-grow container mx-auto p-4 max-w-7xl">
      <!-- Search & Filter Bar -->
      <div class="bg-white/60 backdrop-blur-md p-4 rounded-3xl mb-8 border border-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="relative w-full md:w-1/2">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg class="w-5 h-5 text-purple-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            v-model="store.searchQuery"
            type="text" 
            class="block w-full p-3 pl-11 text-sm text-gray-700 border-2 border-purple-100 rounded-2xl bg-white/80 focus:ring-purple-300 focus:border-purple-300 placeholder-purple-300 transition-all duration-300 shadow-inner" 
            placeholder="ค้นหางานของคุณ..." 
          />
        </div>
        <div class="flex items-center space-x-3 w-full md:w-auto">
          <label class="text-sm font-semibold text-purple-700 whitespace-nowrap">ตัวกรอง:</label>
          <select 
            v-model="store.filterStatus"
            class="bg-white/80 border-2 border-purple-100 text-purple-800 text-sm rounded-2xl focus:ring-purple-300 focus:border-purple-300 block w-full md:w-auto p-2.5 transition-all duration-300 shadow-sm font-medium"
          >
            <option value="all">ทั้งหมด</option>
            <option value="normal">ปกติ 🌱</option>
            <option value="medium">ปานกลาง ⭐</option>
            <option value="urgent">ด่วน 🎀</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <StatusCard
          v-for="(card, index) in defaultCards"
          :key="index"
          :title="card.title"
          :status="card.status"
          :icon="card.icon"
        />
      </div>

      <!-- Backlog Horizontal Board -->
      <div class="mb-10 relative">
        <h2 class="text-2xl font-bold mb-4 text-purple-800 drop-shadow-sm flex items-center gap-2">
          <span>📝</span> Backlog
        </h2>
        <draggable
          class="flex overflow-x-auto py-6 space-x-6 min-h-[160px] p-4 rounded-3xl bg-white/40 border border-white shadow-inner custom-scrollbar"
          v-model="store.initialAddedCards"
          group="cards"
          item-key="id"
          animation="200"
        >
          <template #header>
            <AddCard @show-form="handleAddCardClick" class="flex-shrink-0" />
          </template>
          <template #item="{ element }">
            <AddedCard
              :card="element"
              class="flex-shrink-0 w-64"
              @show-details="handleShowCardDetails"
              @edit="handleEditCardClick"
            />
          </template>
        </draggable>
      </div>

      <!-- Divider -->
      <div class="inline-flex items-center justify-center w-full mb-10">
        <hr class="w-full h-px my-8 bg-gradient-to-r from-transparent via-purple-300 to-transparent border-0">
        <div class="absolute px-4 -translate-x-1/2 left-1/2 bg-white rounded-full border-2 border-purple-100 shadow-sm text-purple-300">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z M2 10h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Zm10 0h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z"/>
            </svg>
        </div>
      </div>

      <!-- Main Kanban Columns -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Received Column -->
        <div class="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm flex flex-col">
          <div class="flex items-center justify-between mb-4 pb-3 border-b-2 border-indigo-100/50">
            <h2 class="text-xl font-bold flex items-center gap-2 text-indigo-700">
              <span class="w-3 h-3 rounded-full bg-indigo-300"></span>
              Received
            </h2>
            <span class="bg-indigo-100 text-xs px-3 py-1.5 rounded-full text-indigo-800 font-bold shadow-sm">{{ store.filteredReceivedCards.length }}</span>
          </div>
          <draggable
            class="flex-grow min-h-[200px] space-y-4 rounded-xl"
            v-model="store.receivedCards"
            group="cards"
            item-key="id"
            animation="200"
          >
            <template #item="{ element }">
              <AddedCard
                :card="element"
                @show-details="handleShowCardDetails"
                @edit="handleEditCardClick"
              />
            </template>
          </draggable>
        </div>

        <!-- In Progress Column -->
        <div class="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm flex flex-col">
          <div class="flex items-center justify-between mb-4 pb-3 border-b-2 border-orange-100/50">
            <h2 class="text-xl font-bold flex items-center gap-2 text-orange-600">
              <span class="w-3 h-3 rounded-full bg-orange-300"></span>
              In Progress
            </h2>
            <span class="bg-orange-100 text-xs px-3 py-1.5 rounded-full text-orange-800 font-bold shadow-sm">{{ store.filteredInProgressCards.length }}</span>
          </div>
          <draggable
            class="flex-grow min-h-[200px] space-y-4 rounded-xl"
            v-model="store.inProgressCards"
            group="cards"
            item-key="id"
            animation="200"
          >
            <template #item="{ element }">
              <AddedCard
                :card="element"
                @show-details="handleShowCardDetails"
                @edit="handleEditCardClick"
              />
            </template>
          </draggable>
        </div>

        <!-- Completed Column -->
        <div class="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-sm flex flex-col">
          <div class="flex items-center justify-between mb-4 pb-3 border-b-2 border-emerald-100/50">
            <h2 class="text-xl font-bold flex items-center gap-2 text-emerald-600">
              <span class="w-3 h-3 rounded-full bg-emerald-300"></span>
              Completed
            </h2>
            <span class="bg-emerald-100 text-xs px-3 py-1.5 rounded-full text-emerald-800 font-bold shadow-sm">{{ store.filteredCompletedCards.length }}</span>
          </div>
          <draggable
            class="flex-grow min-h-[200px] space-y-4 rounded-xl"
            v-model="store.completedCards"
            group="cards"
            item-key="id"
            animation="200"
          >
            <template #item="{ element }">
              <AddedCard
                :card="element"
                @show-details="handleShowCardDetails"
                @edit="handleEditCardClick"
              />
            </template>
          </draggable>
        </div>

      </div>
    </main>
    <Footer />

    <CardForm 
      v-if="showCardForm" 
      :initialData="editingCardData"
      @submit="handleFormSubmit" 
      @cancel="handleFormCancel" 
    />
    
    <ConfirmationDialog
      v-if="showConfirmDialog"
      :cardTitle="cardToDelete ? cardToDelete.title : ''"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
    
    <CardDetailModal
      v-if="showCardDetailModal"
      :card="selectedCardForDetails"
      @close="handleCloseCardDetails"
      @delete-card="handleDeleteCardClick"
      @edit-card="handleEditCardClick"
    />
  </div>
</template>

<style>
/* Custom scrollbar for horizontal board - Pastel */
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(243, 232, 255, 0.5); /* purple-100 */
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(216, 180, 254, 0.8); /* purple-300 */
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(192, 132, 252, 1); /* purple-400 */
}
</style>