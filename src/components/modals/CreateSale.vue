<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, required: true },
  editingSale: { type: Object, default: null },
  availableProducts: { type: Array, default: () => [] },
  products: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false },
})

const emit = defineEmits(['close', 'save'])

const defaultForm = () => ({
  product: '',
  customerName: '',
  customerEmail: '',
  quantity: 1,
  paymentMethod: '',
  status: 'Completed'
})

const saleForm = ref(defaultForm())
const selectedProduct = ref(null)

watch(() => props.editingSale, (sale) => {
  if (sale) {
    const productId = String(sale.product?._id || '')

    saleForm.value = {
      product: productId,
      customerName: sale.customerName ?? '',
      customerEmail: sale.customerEmail ?? '',
      quantity: sale.quantity ?? 1,
      paymentMethod: sale.paymentMethod ?? '',
      status: sale.status ?? 'Completed'
    }

    selectedProduct.value =
      props.availableProducts.find(p => String(p._id) === productId) || null

  } else {
    saleForm.value = defaultForm()

    selectedProduct.value =
      props.availableProducts.find(p => String(p._id) === String(saleForm.value.product)) || null
  }
}, { immediate: true })

const updateProductDetails = () => {
  selectedProduct.value =
    props.availableProducts.find(p => String(p._id) === String(saleForm.value.product)) || null

  saleForm.value.quantity = 1
}

const totalAmount = computed(() => {
  console.log(`selected product: ${JSON.stringify(selectedProduct.value)}`)
  if (!selectedProduct.value || !saleForm.value.quantity) return '0.00'
  return (selectedProduct.value.price * saleForm.value.quantity).toFixed(2)
})


const closeModal = () => {
  saleForm.value = defaultForm()
  selectedProduct.value = null
  emit('close')
}

const saveSale = () => {
  emit('save', {
    ...saleForm.value,
    totalAmount: parseFloat(totalAmount.value),
    quantity: parseInt(saleForm.value.quantity)
  })
}


</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby="sale-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-gray-950/70 backdrop-blur-md" @click="closeModal"></div>

      <!-- Modal Panel -->
      <div class="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <form @submit.prevent="saveSale">

          <!-- Header Band -->
          <div class="relative bg-gradient-to-br from-emerald-500 to-teal-600 px-8 pt-8 pb-10">
            <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 32px 32px;"></div>
            <div class="relative flex items-start justify-between">
              <div>
                <p class="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-1">Sales</p>
                <h3 class="text-2xl font-bold text-white" id="sale-modal-title">
                  {{ editingSale ? 'Edit Sale' : 'Record New Sale' }}
                </h3>
              </div>
              <button
                @click="closeModal"
                type="button"
                class="mt-1 p-2 text-emerald-200 hover:text-white hover:bg-white/20 rounded-xl transition-all"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Card Body -->
          <div class="-mt-4 mx-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-5 space-y-4 max-h-[65vh] overflow-y-auto">

            <!-- Product Selection -->
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Select Product <span class="text-red-400">*</span>
              </label>
              <select
                v-model="saleForm.product"
                @change="updateProductDetails"
                required
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="">Choose a product</option>
                <option v-for="product in availableProducts" :key="product._id" :value="product._id">
                  {{ product.name }} — ₵{{ product.price }} (Stock: {{ product.quantity }})
                </option>
              </select>
              <p v-if="selectedProduct && selectedProduct.stock < 10" class="mt-1.5 text-xs text-yellow-600 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Low stock: Only {{ selectedProduct.quantity }} units available
              </p>
            </div>


            

            <!-- Customer Info -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Customer Name <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="saleForm.customerName"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Customer Email 
                </label>
                <input
                  v-model="saleForm.customerEmail"
                  type="email"
                  required
                  placeholder="john@example.com"
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
                />
              </div>
            </div>

            <!-- Quantity + Payment Method -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Quantity <span class="text-red-400">*</span>
                </label>
                <input
                  v-model="saleForm.quantity"
                  type="number"
                  required
                  min="1"
                  :max="selectedProduct?.quantity || 1"
                  placeholder="1"
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Payment Method <span class="text-red-400">*</span>
                </label>
                <select
                  v-model="saleForm.paymentMethod"
                  required
                  class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select method</option>
                  <option value="Cash">Cash</option>
                  <option value="Mobile Payment">Mobile Money</option>
                </select>
              </div>
            </div>

            <!-- Price Summary -->
            <div class="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <div class="flex justify-between items-center text-sm text-gray-600">
                <span>Unit Price</span>
                <span class="font-medium text-gray-800">₵{{ selectedProduct?.price ?? '0.00' }}</span>
              </div>
              <div class="flex justify-between items-center text-sm text-gray-600 mt-2">
                <span>Quantity</span>
                <span class="font-medium text-gray-800">{{ saleForm.quantity || 0 }}</span>
              </div>
              <div class="flex justify-between items-center mt-3 pt-3 border-t border-emerald-200">
                <span class="text-sm font-semibold text-gray-700">Total Amount</span>
                <span class="text-lg font-bold text-emerald-600">₵{{ totalAmount }}</span>
              </div>
            </div>

            

          </div>

          <!-- Footer Actions -->
          <div class="flex items-center justify-end gap-3 px-6 py-4">
            <button
              @click="closeModal"
              type="button"
              :disabled="isLoading"
              class="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              
              class="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl shadow-md shadow-emerald-200 transition-all hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {{ isLoading ? (editingSale ? 'Updating...' : 'Recording...') : (editingSale ? 'Update Sale' : 'Record Sale') }}
            </button>
          </div>

        </form>
      </div>
    </div>
  </Teleport>
</template>