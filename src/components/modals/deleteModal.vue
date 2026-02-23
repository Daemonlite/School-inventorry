<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Delete Item'
  },
  itemName: {
    type: String,
    default: ''
  },
  itemCount: {
    type: Number,
    default: 0
  },
  countType: {
    type: String,
    default: 'products'
  },
  warning: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => emit('close')
const confirmDelete = () => emit('confirm')
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        @click="closeModal"
      ></div>

      <!-- Modal Panel -->
      <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        <!-- Body -->
        <div class="p-6">
          <div class="flex items-start gap-4">
            <!-- Warning Icon -->
            <div class="shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-red-100">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <h3 id="delete-modal-title" class="text-base font-semibold text-gray-900">
                {{ title }}
              </h3>
              <div class="mt-1.5 space-y-2">
                <!-- Item name message -->
                <p v-if="itemName && !warning" class="text-sm text-gray-500">
                  Are you sure you want to delete
                  "<span class="font-semibold text-gray-700">{{ itemName }}</span>"?
                </p>

                <!-- Custom warning -->
                <p v-if="warning" class="text-sm text-gray-500">{{ warning }}</p>

                <!-- Has linked items -->
                <div v-if="itemCount > 0" class="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <svg class="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p class="text-sm text-red-700">
                    This item contains <span class="font-semibold">{{ itemCount }} {{ countType }}</span>.
                    You need to reassign or delete these first.
                  </p>
                </div>

                <!-- No item name or warning fallback -->
                <p v-else-if="!itemName && !warning" class="text-sm text-gray-500">
                  This action cannot be undone.
                </p>

                <!-- Always show irreversibility note when deletable -->
                <p v-if="itemCount === 0" class="text-sm text-gray-400">
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            @click="closeModal"
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="itemCount > 0"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>