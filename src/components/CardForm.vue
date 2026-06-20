<template>
  <div class="fixed inset-0 bg-purple-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
    <div class="bg-white/95 border border-purple-100 p-8 rounded-3xl shadow-2xl w-full max-w-lg text-gray-800 transform transition-all duration-300 scale-100">
      <h2 class="text-3xl font-bold mb-6 text-purple-700">
        {{ isEditing ? '✏️ แก้ไขงาน' : '✨ สร้างงานใหม่' }}
      </h2>
      <form @submit.prevent="submitForm" class="space-y-5">
        <div>
          <label for="title" class="block text-sm font-bold text-gray-700 mb-1">หัวข้องาน</label>
          <input
            type="text"
            id="title"
            v-model="formData.title"
            class="block w-full rounded-2xl bg-purple-50/50 border-purple-100 text-gray-800 shadow-sm focus:border-purple-400 focus:ring-purple-400 transition-colors p-3"
            placeholder="เช่น ทบทวนเอกสารโปรเจค..."
            required
          />
        </div>
        
        <div>
          <label for="details" class="block text-sm font-bold text-gray-700 mb-1">รายละเอียด</label>
          <textarea
            id="details"
            v-model="formData.details"
            rows="3"
            class="block w-full rounded-2xl bg-purple-50/50 border-purple-100 text-gray-800 shadow-sm focus:border-purple-400 focus:ring-purple-400 transition-colors p-3 custom-scrollbar"
            placeholder="เพิ่มข้อมูลเพิ่มเติม..."
          ></textarea>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="creationDate" class="block text-sm font-bold text-gray-700 mb-1">วันที่สร้าง</label>
            <input
              type="date"
              id="creationDate"
              v-model="formData.creationDate"
              class="block w-full rounded-2xl bg-purple-50/50 border-purple-100 text-gray-800 shadow-sm focus:border-purple-400 focus:ring-purple-400 p-2.5"
              required
            />
          </div>
          <div>
            <label for="completionDate" class="block text-sm font-bold text-gray-700 mb-1">กำหนดเสร็จ</label>
            <input
              type="date"
              id="completionDate"
              v-model="formData.completionDate"
              class="block w-full rounded-2xl bg-purple-50/50 border-purple-100 text-gray-800 shadow-sm focus:border-purple-400 focus:ring-purple-400 p-2.5"
            />
          </div>
        </div>
        
        <div>
          <label for="status" class="block text-sm font-bold text-gray-700 mb-1">ความสำคัญ (Priority)</label>
          <div class="relative">
            <select
              id="status"
              v-model="formData.status"
              class="block w-full rounded-2xl bg-purple-50/50 border-purple-100 text-gray-800 shadow-sm focus:border-purple-400 focus:ring-purple-400 p-3 appearance-none"
            >
              <option value="normal">🌱 ปกติ (Normal)</option>
              <option value="medium">⭐ ปานกลาง (Medium)</option>
              <option value="urgent">🎀 ด่วน (Urgent)</option>
            </select>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">สีการ์ดงาน (โทนพาสเทล)</label>
          <div class="flex flex-wrap gap-3">
            <div
              v-for="colorOption in colorOptions"
              :key="colorOption"
              :class="[colorOption, 'w-10 h-10 rounded-full cursor-pointer transition-transform hover:scale-110 shadow-sm border border-black/5', { 'ring-4 ring-purple-300 scale-110 shadow-md': formData.color === colorOption }]"
              @click="formData.color = colorOption"
              :title="colorOption.replace('bg-', '').replace('-100', '')"
            ></div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4 border-t border-purple-100 mt-6">
          <button
            type="button"
            @click="cancelForm"
            class="px-5 py-2.5 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 font-bold"
          >
            ยกเลิก
          </button>
          <button
            type="submit"
            class="px-5 py-2.5 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-200 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-purple-300 font-bold"
          >
            {{ isEditing ? 'บันทึก' : 'สร้างงาน' }}
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
  color: 'bg-blue-100',
});

const isEditing = ref(false);

const colorOptions = [
  'bg-slate-100', 'bg-blue-100', 'bg-emerald-100', 'bg-amber-100', 'bg-rose-100',
  'bg-purple-100', 'bg-pink-100', 'bg-indigo-100', 'bg-teal-100', 'bg-orange-100',
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
    color: 'bg-blue-100',
  };
  isEditing.value = false;
};
</script>
