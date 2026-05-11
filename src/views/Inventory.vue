<script setup>
import { ref, computed, onMounted } from 'vue'
import createProduct from '../components/modals/createProduct.vue'
import axios from 'axios'
import DeleteModal from '../components/modals/deleteModal.vue'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const products = ref([])
const categories = ref([])

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`, { headers })
    products.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/categories`, { headers })
    categories.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// Computed stats
const totalProducts = computed(() => products.value.length)
const totalCategories = computed(() => new Set(products.value.map(p => p.category?.id)).size)
const lowStockItems = computed(() => products.value.filter(p => p.quantity > 0 && p.quantity <= 20).length)
const outOfStockItems = computed(() => products.value.filter(p => p.quantity === 0).length)

// Search functionality
const searchQuery = ref('')

const selectedCategory = ref("All Categories")

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch =
      !searchQuery.value ||
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.category?.name?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesCategory =
      selectedCategory.value === "All Categories" ||
      product.category?._id === selectedCategory.value

    return matchesSearch && matchesCategory
  })
})

// Modal states
const showProductModal = ref(false)
const showDeleteModal = ref(false)
const editingProduct = ref(null)
const productToDelete = ref(null)
const isDeleting = ref(false)

const openCreateModal = () => {
  editingProduct.value = null
  showProductModal.value = true
}

const openEditModal = (product) => {
  console.log(`Editing product: ${JSON.stringify(product)}`)
  editingProduct.value = {
    _id: product._id,
    name: product.name,
    description: product.description,
    category: product.category._id,
    price: product.price,
    stock: product.quantity,
    minQuantity: product.minQuantity,
    expirationDate: product.expirationDate
  }
  showProductModal.value = true
}

const closeModal = () => {
  showProductModal.value = false
  editingProduct.value = null
  fetchProducts()
}

const saveProduct = (savedProduct) => {
  const index = products.value.findIndex(p => p.id === savedProduct.id)
  if (index !== -1) {
    products.value[index] = savedProduct
  } else {
    products.value.unshift(savedProduct)
  }
  closeModal()
}

// Delete
const openDeleteModal = (product) => {
  productToDelete.value = product
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  productToDelete.value = null
  fetchProducts()
}

const confirmDelete = async () => {
  if (!productToDelete.value) return
  isDeleting.value = true
  try {
    await axios.delete(`${baseUrl}/products/${productToDelete.value._id}/`, { headers })
    products.value = products.value.filter(p => p.id !== productToDelete.value._id)
    closeDeleteModal()
  } catch (error) {
    console.error('Error deleting product:', error)
  } finally {
    isDeleting.value = false
  }
}

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

const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

onMounted(() => {
  fetchProducts(),
  fetchCategories()
})
</script>

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
      <!-- Total Products -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Products</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ totalProducts }}</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              across all categories
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Categories</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ totalCategories }}</p>
            <p class="text-xs text-blue-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" />
              </svg>
              unique categories
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Low Stock -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ lowStockItems }}</p>
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

      <!-- Out of Stock -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Out of Stock</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ outOfStockItems }}</p>
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
            <select v-model="selectedCategory" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>All Categories</option>
              <option v-for="category in categories" :key="category._id" :value="category._id">
                  {{ category.name }}
                </option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th class="px-6 py-3">Product</th>
              <th class="px-6 py-3">Category</th>
              <th class="px-6 py-3">Price</th>
              <th class="px-6 py-3">Stock</th>
               <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Min. Quantity</th>
              <th class="px-6 py-3">Expiry Date</th>
             
              <th class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="product in filteredProducts" :key="product._id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getCategoryIcon(product.category?.name)" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ product.name }}</p>
                    <p class="text-xs text-gray-500">{{ product.description }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {{ product.category?.name ?? '—' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-800">${{ product.price }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ product.quantity }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  product.quantity > 20 ? 'bg-green-100 text-green-700' :
                  product.quantity > 0 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                ]">
                  {{ product.quantity > 20 ? 'In Stock' : product.quantity > 0 ? 'Low Stock' : 'Out of Stock' }}
                </span>
              </td>
              

              <td class="px-6 py-4 text-sm text-gray-600">{{ product.minQuantity }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(product.expirationDate)}}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                  Active
                </span>
              </td>



              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button
                    @click="openEditModal(product)"
                    class="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
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
    </div>

    <!-- Create/Edit Product Modal -->
    <createProduct
      :show="showProductModal"
      :editingProduct="editingProduct"
      @close="closeModal"
      @save="saveProduct"
    />


    <DeleteModal
      :show="showDeleteModal"
      title="Delete Product"
      :item-name="productToDelete?.name"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />
    

  </div>
</template>