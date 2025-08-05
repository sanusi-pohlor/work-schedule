<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import StatusCard from './components/StatusCard.vue';
import AddCard from './components/AddCard.vue';
import AddedCard from './components/AddedCard.vue';
import CardForm from './components/CardForm.vue';
import ConfirmationDialog from './components/ConfirmationDialog.vue';
import CardDetailModal from './components/CardDetailModal.vue';
import Footer from './components/Footer.vue';
import draggable from 'vuedraggable';

const defaultCards = [
  { title: "ปกติ", status: "normal", icon: "✅" },
  { title: "ปานกลาง", status: "medium", icon: "⚠️" },
  { title: "ด่วน", status: "urgent", icon: "🔥" },
];

const initialAddedCards = ref([]); // This will hold cards in the horizontal section
const receivedCards = ref([]);
const inProgressCards = ref([]);
const completedCards = ref([]);

const showCardForm = ref(false);
const showConfirmDialog = ref(false);
const cardToDelete = ref(null);
const cardListToDeleteFrom = ref(null);

const showCardDetailModal = ref(false);
const selectedCardForDetails = ref(null);
const selectedCardList = ref(null);

const handleAddCardClick = () => {
  showCardForm.value = true;
};

const handleFormSubmit = (formData) => {
  initialAddedCards.value.push({
    title: formData.title,
    details: formData.details,
    creationDate: formData.creationDate,
    completionDate: formData.completionDate,
    status: formData.status,
    color: formData.color,
    icon: "📝" // Default icon for new cards
  });
  showCardForm.value = false;
};

const handleFormCancel = () => {
  showCardForm.value = false;
};

const handleDeleteCardClick = (cardTitle, list) => {
  const card = list.value.find(c => c.title === cardTitle);
  if (card) {
    cardToDelete.value = card;
    cardListToDeleteFrom.value = list;
    showConfirmDialog.value = true;
  }
};

const handleConfirmDelete = () => {
  if (cardToDelete.value && cardListToDeleteFrom.value) {
    const index = cardListToDeleteFrom.value.value.findIndex(card => card.title === cardToDelete.value.title);
    if (index !== -1) {
      cardListToDeleteFrom.value.value.splice(index, 1);
    }
  }
  showConfirmDialog.value = false;
  cardToDelete.value = null;
  cardListToDeleteFrom.value = null;
  showCardDetailModal.value = false; // Close modal after deletion
};

const handleCancelDelete = () => {
  showConfirmDialog.value = false;
  cardToDelete.value = null;
  cardListToDeleteFrom.value = null;
};

const handleShowCardDetails = (cardData, list) => {
  selectedCardForDetails.value = cardData;
  selectedCardList.value = list;
  showCardDetailModal.value = true;
};

const handleCloseCardDetails = () => {
  showCardDetailModal.value = false;
  selectedCardForDetails.value = null;
  selectedCardList.value = null;
};

const handleDeleteFromModal = (cardTitle) => {
  if (selectedCardList.value) {
    handleDeleteCardClick(cardTitle, selectedCardList.value);
  }
  showCardDetailModal.value = false; // Close modal after initiating delete
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-900 text-white">
    <Header />
    <main class="flex-grow container mx-auto p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatusCard
          v-for="(card, index) in defaultCards"
          :key="index"
          :title="card.title"
          :status="card.status"
          :icon="card.icon"
        />
      </div>

      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
            <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z M2 10h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Zm10 0h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z"/>
            </svg>
        </div>
      </div>

      <draggable
        class="flex overflow-x-auto py-4 space-x-4 min-h-[100px] p-2 rounded-md border-2 border-dashed border-gray-600"
        v-model="initialAddedCards"
        group="cards"
        item-key="title"
      >
        <template #header>
          <AddCard @show-form="handleAddCardClick" class="flex-shrink-0" />
        </template>
        <template #item="{ element }">
          <AddedCard
            :title="element.title"
            :details="element.details"
            :creationDate="element.creationDate"
            :completionDate="element.completionDate"
            :color="element.color"
            :icon="element.icon"
            class="flex-shrink-0"
            @show-details="(cardData) => handleShowCardDetails(cardData, initialAddedCards)"
          />
        </template>
      </draggable>

      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700">
        <div class="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
            <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z M2 10h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Zm10 0h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z"/>
            </svg>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div class="bg-gray-800 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">Received</h2>
          <draggable
            class="min-h-[100px] p-2 rounded-md border-2 border-dashed border-gray-600"
            v-model="receivedCards"
            group="cards"
            item-key="title"
          >
            <template #item="{ element }">
              <AddedCard
                :title="element.title"
                :details="element.details"
                :creationDate="element.creationDate"
                :completionDate="element.completionDate"
                :color="element.color"
                :icon="element.icon"
                class="mb-2"
                @show-details="(cardData) => handleShowCardDetails(cardData, receivedCards)"
              />
            </template>
          </draggable>
        </div>

        <div class="bg-gray-800 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">In Progress</h2>
          <draggable
            class="min-h-[100px] p-2 rounded-md border-2 border-dashed border-gray-600"
            v-model="inProgressCards"
            group="cards"
            item-key="title"
          >
            <template #item="{ element }">
              <AddedCard
                :title="element.title"
                :details="element.details"
                :creationDate="element.creationDate"
                :completionDate="element.completionDate"
                :color="element.color"
                :icon="element.icon"
                class="mb-2"
                @show-details="(cardData) => handleShowCardDetails(cardData, inProgressCards)"
              />
            </template>
          </draggable>
        </div>

        <div class="bg-gray-800 p-4 rounded-lg">
          <h2 class="text-xl font-semibold mb-4">Completed</h2>
          <draggable
            class="min-h-[100px] p-2 rounded-md border-2 border-dashed border-gray-600"
            v-model="completedCards"
            group="cards"
            item-key="title"
          >
            <template #item="{ element }">
              <AddedCard
                :title="element.title"
                :details="element.details"
                :creationDate="element.creationDate"
                :completionDate="element.completionDate"
                :color="element.color"
                :icon="element.icon"
                class="mb-2"
                @show-details="(cardData) => handleShowCardDetails(cardData, completedCards)"
              />
            </template>
          </draggable>
        </div>
      </div>
    </main>
    <Footer />

    <CardForm v-if="showCardForm" @submit="handleFormSubmit" @cancel="handleFormCancel" />
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
      @delete-card="handleDeleteFromModal"
    />
  </div>
</template>