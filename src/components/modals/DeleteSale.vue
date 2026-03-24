<script setup>
import { Transition } from 'vue' 

const props = defineProps({
  show: Boolean,
  sale: Object,
  isDeleting: Boolean
})

const emit = defineEmits(['close', 'confirm'])

const closeModal = () => {
   emit('close')
}

const confirmDelete = () => {
  if (props.isDeleting || !props.sale?._id) return
  emit('confirm', props.sale)
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="show" 
        class="fixed inset-0 z-[100] overflow-y-auto bg-black/50 backdrop-blur-[2px]" 
        role="dialog"
        aria-modal="true"
        @click="closeModal" 
      >
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

          <div 
            class="relative inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            @click.stop
          >
            <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Delete Sale Record</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete sale 
                      <span class="font-bold">#{{ sale?._id?.slice(-6) || 'Unknown' }}</span>? 
                      This will permanently remove the record for {{ sale?.customer?.name || 'this customer' }}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="confirmDelete"
                type="button"
                :disabled="isDeleting"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
              >
                {{ isDeleting ? 'Deleting...' : 'Delete' }}
              </button>
              <button
                @click="closeModal"
                type="button"
                :disabled="isDeleting"
                class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>