import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

// Simple ID generator
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

export const useBoardStore = defineStore('board', {
  state: () => ({
    // Use useStorage from @vueuse/core for automatic localStorage sync
    initialAddedCards: useStorage('board-initial-cards', []),
    receivedCards: useStorage('board-received-cards', []),
    inProgressCards: useStorage('board-inprogress-cards', []),
    completedCards: useStorage('board-completed-cards', []),
    searchQuery: '',
    filterStatus: 'all', // 'all', 'normal', 'medium', 'urgent'
  }),
  
  getters: {
    filterCards: (state) => (cards) => {
      return cards.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                              card.details.toLowerCase().includes(state.searchQuery.toLowerCase());
        const matchesFilter = state.filterStatus === 'all' || card.status === state.filterStatus;
        return matchesSearch && matchesFilter;
      });
    },
    filteredInitialCards: (state) => state.filterCards(state.initialAddedCards),
    filteredReceivedCards: (state) => state.filterCards(state.receivedCards),
    filteredInProgressCards: (state) => state.filterCards(state.inProgressCards),
    filteredCompletedCards: (state) => state.filterCards(state.completedCards),
  },

  actions: {
    addCard(cardData) {
      this.initialAddedCards.push({
        id: generateId(),
        ...cardData,
        icon: "📝"
      });
    },
    
    updateCard(updatedCard) {
      // Find and update the card in whichever list it exists
      const lists = [
        this.initialAddedCards,
        this.receivedCards,
        this.inProgressCards,
        this.completedCards
      ];
      
      for (const list of lists) {
        const index = list.findIndex(c => c.id === updatedCard.id);
        if (index !== -1) {
          list[index] = { ...list[index], ...updatedCard };
          return;
        }
      }
    },
    
    deleteCard(cardId) {
      const lists = [
        this.initialAddedCards,
        this.receivedCards,
        this.inProgressCards,
        this.completedCards
      ];
      
      for (const list of lists) {
        const index = list.findIndex(c => c.id === cardId);
        if (index !== -1) {
          list.splice(index, 1);
          return;
        }
      }
    }
  }
});
