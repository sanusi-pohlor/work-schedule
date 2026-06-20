<template>
  <div class="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
    <div class="bg-white border border-gray-100 p-8 rounded-3xl shadow-xl w-full max-w-lg text-slate-800 transform transition-all duration-300 scale-100">
      <h2 class="text-3xl font-bold mb-6 text-slate-800">
        {{ isEditing ? 'Edit Task' : 'Create New Task' }}
      </h2>
      <form @submit.prevent="submitForm" class="space-y-5">
        <div>
          <label for="title" class="block text-sm font-bold text-slate-600 mb-1">Title</label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            class="block w-full rounded-2xl bg-slate-50 border border-gray-200 text-slate-800 shadow-sm focus:border-blue-400 focus:ring-blue-400 transition-colors p-3"
            placeholder="E.g., Complete Project Presentation..."
            required
          />
        </div>
        
        <div>
          <label for="details" class="block text-sm font-bold text-slate-600 mb-1">Details</label>
          <textarea
            id="details"
            v-model="formData.details"
            rows="3"
            class="block w-full rounded-2xl bg-slate-50 border border-gray-200 text-slate-800 shadow-sm focus:border-blue-400 focus:ring-blue-400 transition-colors p-3 custom-scrollbar"
            placeholder="Add any extra information..."
          ></textarea>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="creationDate" class="block text-sm font-bold text-slate-600 mb-1">Creation Date</label>
            <input
              type="date"
              id="creationDate"
              v-model="formData.creationDate"
              class="block w-full rounded-2xl bg-slate-50 border border-gray-200 text-slate-800 shadow-sm focus:border-blue-400 focus:ring-blue-400 p-2.5"
              required
            />
          </div>
          <div>
            <label for="completionDate" class="block text-sm font-bold text-slate-600 mb-1">Completion Date</label>
            <input
              type="date"
              id="completionDate"
              v-model="formData.completionDate"
              class="block w-full rounded-2xl bg-slate-50 border border-gray-200 text-slate-800 shadow-sm focus:border-blue-400 focus:ring-blue-400 p-2.5"
            />
          </div>
        </div>
        
        <div>
          <label for="status" class="block text-sm font-bold text-slate-600 mb-1">Status Priority</label>
          <div class="relative">
            <select
              id="status"
              v-model="formData.status"
              class="block w-full rounded-2xl bg-slate-50 border border-gray-200 text-slate-800 shadow-sm focus:border-blue-400 focus:ring-blue-400 p-3 appearance-none"
            >
              <option value="normal">🟢 Normal</option>
              <option value="medium">🟡 Medium</option>
              <option value="urgent">🔴 Urgent</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-bold text-slate-600 mb-2">Card Color Theme</label>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="colorOption in colorOptions"
              :key="colorOption"
              :class="[colorOption, 'w-10 h-10 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-sm border border-gray-200', { 'ring-4 ring-blue-300 ring-offset-2 scale-110': formData.color === colorOption }]"
              @click="formData.color = colorOption"
              :title="colorOption.replace('bg-', '').replace('-50', '')"
            ></div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-100 mt-6">
          <button
            type="button"
            @click="cancelForm"
            class="px-5 py-2.5 bg-white text-slate-600 rounded-2xl hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 font-bold border border-gray-200 shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold"
          >
            {{ isEditing ? 'Save Changes' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['submit', 'cancel']);

const today = new Date().toISOString().split('T')[0];

const formData = ref({
  title: '',
  details: '',
  creationDate: today,
  completionDate: '',
  status: 'normal',
  color: 'bg-blue-50',
});

const isEditing = ref(false);

const colorOptions = [
  'bg-slate-50', 'bg-blue-50', 'bg-emerald-50', 'bg-amber-50', 'bg-rose-50',
  'bg-purple-50', 'bg-pink-50', 'bg-indigo-50', 'bg-teal-50', 'bg-orange-50',
];

onMounted(() => {
  if (props.initialData) {
    isEditing.value = true;
    formData.value = { ...props.initialData };
  }
});

const submitForm = () => {
  emit('submit', { ...formData.value });
  resetForm();
};

const cancelForm = () => {
  emit('cancel');
  resetForm();
};

const resetForm = () => {
  formData.value = {
    title: '',
    details: '',
    creationDate: today,
    completionDate: '',
    status: 'normal',
    color: 'bg-blue-50',
  };
  isEditing.value = false;
};
</script>
