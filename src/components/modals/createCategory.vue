<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  editingCategory: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const colorThemes = [
  { name: 'green', bg: 'bg-green-500' },
  { name: 'blue', bg: 'bg-blue-500' },
  { name: 'yellow', bg: 'bg-yellow-500' },
  { name: 'purple', bg: 'bg-purple-500' },
  { name: 'red', bg: 'bg-red-500' },
  { name: 'gray', bg: 'bg-gray-500' }
]

const defaultForm = () => ({
  name: '',
  description: '',
  colorTheme: 'green',
  status: 'Active'
})

const form = ref(defaultForm())

// Populate form when editing
watch(() => props.editingCategory, (category) => {
  if (category) {
    form.value = {
      name: category.name,
      description: category.description,
    }
  } else {
    form.value = defaultForm()
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const save = () => {
  emit('save', { ...form.value })
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeModal"></div>

      <!-- Modal Panel -->
      <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <form @submit.prevent="save">

          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 id="category-modal-title" class="text-lg font-semibold text-gray-800">
              {{ editingCategory ? 'Edit Category' : 'Create New Category' }}
            </h3>
            <button
              @click="closeModal"
              type="button"
              class="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-5 space-y-5">

            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Category Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="e.g., Electronics, Clothing, etc."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Describe what products belong in this category..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              ></textarea>
            </div>
        

            <!-- Preview -->
            <div v-if="form.name" class="p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Preview</p>
              <div class="flex items-center gap-3">
                <div :class="['w-10 h-10 rounded-lg shrink-0', `bg-${form.colorTheme}-100`]"></div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-800 truncate">{{ form.name }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ form.description || 'No description' }}</p>
                </div>
                <span :class="[
                  'shrink-0 px-2 py-1 text-xs font-medium rounded-full',
                  form.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                ]">
                  {{ form.status }}
                </span>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
            <button
              @click="closeModal"
              type="button"
              :disabled="isLoading"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <svg
                v-if="isLoading"
                class="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ isLoading ? (editingCategory ? 'Updating...' : 'Creating...') : (editingCategory ? 'Update Category' : 'Create Category') }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </Teleport>
</template>