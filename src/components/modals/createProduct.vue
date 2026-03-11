<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')
const headers = { Authorization: `Bearer ${token}` }

const categories = ref([])

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/categories`, { headers })
    categories.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  editingProduct: {
    type: Object,
    default: null
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const isSubmitting = ref(false)
const errorMessage = ref('')

const defaultForm = () => ({
  name: '',
  description: '',
  category: '',
  price: '',
  stock: ''
})

const productForm = ref(defaultForm())

watch(() => props.editingProduct, (product) => {
  if (product) {
    productForm.value = {
      name: product.name ?? '',
      description: product.description ?? '',
      category: product.category ?? '',
      price: product.price ?? '',
      stock: product.stock ?? ''
    }
  } else {
    productForm.value = defaultForm()
  }
}, { immediate: true })

const closeModal = () => {
  errorMessage.value = ''
  emit('close')
}

const saveProduct = async () => {
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const payload = {
      name: productForm.value.name,
      description: productForm.value.description,
      category: productForm.value.category,
      price: parseFloat(productForm.value.price),
      quantity: parseInt(productForm.value.stock)
    }

    let response

    if (props.editingProduct) {
      response = await axios.put(
        `${baseUrl}/products/${props.editingProduct._id}/`,
        payload,
        { headers }
      )
    } else {
      response = await axios.post(
        `${baseUrl}/products/`,
        payload,
        { headers }
      )
    }

    emit('save', response.data)
    productForm.value = defaultForm()
    closeModal()
  } catch (error) {
    console.error('Error saving product:', error)
    errorMessage.value =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
    fetchCategories()
})
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4" aria-labelledby="modal-title" role="dialog" aria-modal="true">

      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-950/70 backdrop-blur-md" @click="closeModal"></div>

      <!-- Modal Panel -->
      <div class="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <form @submit.prevent="saveProduct">

          <!-- Decorative Header Band -->
          <div class="relative bg-gradient-to-br from-emerald-500 to-teal-600 px-8 pt-8 pb-10">
            <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 32px 32px;"></div>
            <div class="relative flex items-start justify-between">
              <div>
                <p class="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-1">Inventory</p>
                <h3 class="text-2xl font-bold text-white" id="modal-title">
                  {{ editingProduct ? 'Edit Product' : 'New Product' }}
                </h3>
              </div>
              <button @click="closeModal" type="button" class="mt-1 p-2 text-emerald-200 hover:text-white hover:bg-white/20 rounded-xl transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Pulled-up Card Body -->
          <div class="-mt-4 mx-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-5 space-y-4">

            <!-- Error Message -->
            <div v-if="errorMessage" class="flex items-center gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
              <svg class="w-4 h-4 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-red-600">{{ errorMessage }}</p>
            </div>

            <!-- Product Name -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Product Name <span class="text-red-400">*</span>
              </label>
              <input
                v-model="productForm.name"
                type="text"
                required
                placeholder="e.g. Wireless Headphones Pro"
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Description</label>
              <textarea
                v-model="productForm.description"
                rows="2"
                placeholder="Brief product description..."
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all resize-none"
              ></textarea>
            </div>

            <!-- Category -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Category <span class="text-red-400">*</span>
              </label>
              <select
                v-model="productForm.category"
                required
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="">Select...</option>
                <option v-for="category in categories" :key="category._id" :value="category._id">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Price + Stock -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Price (USD) <span class="text-red-400">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                  <input
                    v-model="productForm.price"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="0.00"
                    class="w-full pl-7 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Stock Qty <span class="text-red-400">*</span>
                </label>
                <div class="relative">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                    </svg>
                  </span>
                  <input
                    v-model="productForm.stock"
                    type="number"
                    min="0"
                    required
                    placeholder="0"
                    class="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>

          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-end gap-3 px-6 py-4">
            <button
              @click="closeModal"
              type="button"
              :disabled="isSubmitting"
              class="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl shadow-md shadow-emerald-200 transition-all hover:shadow-lg hover:shadow-emerald-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ isSubmitting ? (editingProduct ? 'Updating...' : 'Creating...') : (editingProduct ? 'Update Product' : 'Create Product') }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </Teleport>
</template>