<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Products Management</h1>
        <p class="text-gray-600 mt-1">Manage your inventory products efficiently</p>
      </div>
      <button 
        @click="openCreateModal"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center shadow-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Product
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Products Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Products</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">156</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12 new this month
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Categories Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Categories</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">12</p>
            <p class="text-xs text-blue-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
              6 active categories
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Low Stock Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">8</p>
            <p class="text-xs text-yellow-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Need reorder soon
            </p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Out of Stock Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Out of Stock</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">3</p>
            <p class="text-xs text-red-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Requires immediate action
            </p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Product List</h3>
            <p class="text-sm text-gray-600 mt-1">Manage and organize your products</p>
          </div>
          <div class="flex items-center space-x-3">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                v-model="searchQuery"
                class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
              />
              <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Food</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th class="px-6 py-3">Product</th>
              <th class="px-6 py-3">SKU</th>
              <th class="px-6 py-3">Category</th>
              <th class="px-6 py-3">Price</th>
              <th class="px-6 py-3">Stock</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getCategoryIcon(product.category)" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">{{ product.description }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ product.sku }}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {{ product.category }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-800">${{ product.price }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ product.stock }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  product.stock > 20 ? 'bg-green-100 text-green-700' :
                  product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                ]">
                  {{ product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button 
                    @click="openEditModal(product)"
                    class="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit product"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="openDeleteModal(product)"
                    class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete product"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p class="text-sm text-gray-600">Showing 1 to 5 of 25 products</p>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
          <button class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">1</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">2</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">3</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Product Modal -->
    <div v-if="showProductModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveProduct">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800" id="modal-title">
                  {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
                </h3>
                <button @click="closeModal" type="button" class="text-gray-400 hover:text-gray-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input 
                    v-model="productForm.name"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    v-model="productForm.description"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter product description"
                  ></textarea>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                    <input 
                      v-model="productForm.sku"
                      type="text" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="SKU-001"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      v-model="productForm.category"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Food">Food</option>
                      <option value="Books">Books</option>
                      <option value="Furniture">Furniture</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input 
                      v-model="productForm.price"
                      type="number" 
                      step="0.01"
                      required
                      min="0"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input 
                      v-model="productForm.stock"
                      type="number" 
                      required
                      min="0"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="submit"
                class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              >
                {{ editingProduct ? 'Update Product' : 'Create Product' }}
              </button>
              <button 
                @click="closeModal"
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeDeleteModal"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Delete Product
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete "{{ productToDelete?.name }}"? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button 
              @click="confirmDelete"
              type="button"
              class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button 
              @click="closeDeleteModal"
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample products data
const products = ref([
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Noise cancelling bluetooth headphones',
    sku: 'WH-001',
    category: 'Electronics',
    price: 79.99,
    stock: 45
  },
  {
    id: 2,
    name: 'Cotton T-Shirt',
    description: 'Premium quality cotton t-shirt',
    sku: 'CT-023',
    category: 'Clothing',
    price: 12.99,
    stock: 8
  },
  {
    id: 3,
    name: 'Coffee Beans',
    description: 'Organic arabica coffee beans',
    sku: 'CB-456',
    category: 'Food',
    price: 8.49,
    stock: 0
  },
  {
    id: 4,
    name: 'Office Chair',
    description: 'Ergonomic mesh office chair',
    sku: 'OC-089',
    category: 'Furniture',
    price: 199.99,
    stock: 15
  },
  {
    id: 5,
    name: 'JavaScript Book',
    description: 'Advanced JavaScript programming',
    sku: 'BK-789',
    category: 'Books',
    price: 34.99,
    stock: 23
  }
])

// Search functionality
const searchQuery = ref('')

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  return products.value.filter(product => 
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Modal states
const showProductModal = ref(false)
const showDeleteModal = ref(false)
const editingProduct = ref(null)
const productToDelete = ref(null)

// Form state
const productForm = ref({
  name: '',
  description: '',
  sku: '',
  category: '',
  price: '',
  stock: ''
})

// Modal functions
const openCreateModal = () => {
  editingProduct.value = null
  productForm.value = {
    name: '',
    description: '',
    sku: '',
    category: '',
    price: '',
    stock: ''
  }
  showProductModal.value = true
}

const openEditModal = (product) => {
  editingProduct.value = product
  productForm.value = { ...product }
  showProductModal.value = true
}

const closeModal = () => {
  showProductModal.value = false
  editingProduct.value = null
}

const saveProduct = () => {
  if (editingProduct.value) {
    // Update existing product
    const index = products.value.findIndex(p => p.id === editingProduct.value.id)
    products.value[index] = {
      ...editingProduct.value,
      ...productForm.value,
      price: parseFloat(productForm.value.price),
      stock: parseInt(productForm.value.stock)
    }
  } else {
    // Create new product
    const newProduct = {
      id: products.value.length + 1,
      ...productForm.value,
      price: parseFloat(productForm.value.price),
      stock: parseInt(productForm.value.stock)
    }
    products.value.push(newProduct)
  }
  closeModal()
}

// Delete functions
const openDeleteModal = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  productToDelete.value = null
}

const confirmDelete = () => {
  if (productToDelete.value) {
    products.value = products.value.filter(p => p.id !== productToDelete.value.id)
    closeDeleteModal()
  }
}

// Helper function for category icons
const getCategoryIcon = (category) => {
  const icons = {
    'Electronics': 'M9 3v2m6-2v2M9 3h6M9 3H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-4M9 7h6',
    'Clothing': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    'Food': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    'Furniture': 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    'Books': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  }
  return icons[category] || 'M4 7h16M4 12h16M4 17h16'
}
</script>