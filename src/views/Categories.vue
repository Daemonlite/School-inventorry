<script setup>
import { ref, computed, onMounted } from 'vue'
import deleteModal from '../components/modals/deleteModal.vue'
import createCategory from '../components/modals/createCategory.vue'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const categories = ref([])
const token = localStorage.getItem('token')
const headers = { Authorization: `Bearer ${token}` }

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseUrl}/categories`, { headers })
    categories.value = response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const newThisMonth = computed(() => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  return categories.value.filter(cat => {
    const createdAt = new Date(cat.createdAt)
    return createdAt.getMonth() === currentMonth && createdAt.getFullYear() === currentYear
  }).length
})

const activeCategories = computed(() => categories.value.filter(cat => cat.status === 'Active').length)
const totalProductsInCategories = computed(() => categories.value.reduce((sum, cat) => sum + cat.productCount, 0))
const emptyCategories = computed(() => categories.value.filter(cat => cat.productCount === 0).length)

const searchQuery = ref('')
const statusFilter = ref('all')
const isLoading = ref(false)

const filteredCategories = computed(() => {
  let filtered = categories.value
  if (searchQuery.value) {
    filtered = filtered.filter(cat =>
      cat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cat._id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(cat => cat.status === statusFilter.value)
  }
  return filtered
})

const showCategoryModal = ref(false)
const showDeleteModal = ref(false)
const editingCategory = ref(null)
const categoryToDelete = ref(null)

const categoryForm = ref({
  name: '',
  description: '',
  colorTheme: 'green',
  status: 'Active'
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const getRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.ceil(Math.abs(now - date) / (1000 * 60 * 60 * 24))
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

const openCreateModal = () => {
  editingCategory.value = null
  categoryForm.value = { name: '', description: '', colorTheme: 'green', status: 'Active' }
  showCategoryModal.value = true
}

const openEditModal = (category) => {
  editingCategory.value = category
  categoryForm.value = { ...category }
  showCategoryModal.value = true
}

const closeModal = () => {
  showCategoryModal.value = false
  editingCategory.value = null
}


const saveCategory = async (formData) => {
  const payload = {
    name: formData.name,
    description: formData.description,
    status: formData.status,
  }

  isLoading.value = true
  try {
    if (editingCategory.value) {
      await axios.put(
        `${baseUrl}/categories/${editingCategory.value._id}`,
        payload,
        { headers }
      )
    } else {
      await axios.post(
        `${baseUrl}/categories`,
        payload,
        { headers }
      )
    }
    await fetchCategories()
  } catch (error) {
    console.error('Error saving category:', error)
  } finally {
    isLoading.value = false
    editingCategory.value = null
    closeModal()
  }
}

const openDeleteModal = (category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  categoryToDelete.value = null
}

const confirmDelete = async () => {
  if (!categoryToDelete.value || categoryToDelete.value.productCount > 0) return

  try {
    await axios.delete(
      `${baseUrl}/categories/${categoryToDelete.value._id}`,
      { headers }
    )
    await fetchCategories()
  } catch (error) {
    console.error('Error deleting category:', error)
  }

  closeDeleteModal()
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Product Categories</h1>
        <p class="text-gray-600 mt-1">Organize and manage your product categories</p>
      </div>
      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center shadow-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add New Category
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Categories</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ categories.length }}</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +{{ newThisMonth }} this month
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>



      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Products in Categories</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ totalProductsInCategories }}</p>
            <p class="text-xs text-purple-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Avg {{ categories.length ? (totalProductsInCategories / categories.length).toFixed(0) : 0 }} per category
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Empty Categories</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ emptyCategories }}</p>
            <p class="text-xs text-yellow-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Needs attention
            </p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">All Categories</h3>
            <p class="text-sm text-gray-600 mt-1">Manage and organize your product categories</p>
          </div>
          <div class="flex items-center space-x-3">
            <div class="relative">
              <input
                type="text"
                placeholder="Search categories..."
                v-model="searchQuery"
                class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
              />
              <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select v-model="statusFilter" class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th class="px-6 py-3">Category</th>
              <th class="px-6 py-3">Description</th>
              <th class="px-6 py-3 text-right">Products</th>
              <th class="px-6 py-3 text-right">Total Value</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Created</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="category in filteredCategories" :key="category._id" class="hover:bg-gray-50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div :class="['w-10 h-10 rounded-lg flex items-center justify-center mr-3', category.bgColor]">
                    <svg class="w-5 h-5" :class="[category.iconColor]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ category.name }}</p>
                    <p class="text-xs text-gray-500">ID: {{ category._id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-600 max-w-xs truncate">{{ category.description }}</p>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <span class="text-sm font-medium text-gray-800">{{ category.productCount }}</span>
                  <div v-if="category.productCount > 0" class="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full"
                      :class="[category.productCount > 50 ? 'bg-green-500' : category.productCount > 20 ? 'bg-yellow-500' : 'bg-red-500']"
                      :style="{ width: Math.min((category.productCount / 100) * 100, 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <span class="text-sm font-medium text-gray-800">${{ category.totalValue }}</span>
              </td>
              <td class="px-6 py-4">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  category.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                ]">
                  {{ category.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-600">{{ formatDate(category.createdAt) }}</div>
                <div class="text-xs text-gray-400">{{ getRelativeTime(category.createdAt) }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center space-x-2 ">
                  <button
                    @click="openEditModal(category)"
                    class="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit category"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="openDeleteModal(category)"
                    class="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete category"
                    :disabled="category.productCount > 0"
                    :class="{ 'opacity-50 cursor-not-allowed': category.productCount > 0 }"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="filteredCategories.length === 0">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center justify-center">
                  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <h3 class="text-lg font-medium text-gray-800 mb-2">No categories found</h3>
                  <p class="text-sm text-gray-600 mb-4">Get started by creating your first category</p>
                  <button
                    @click="openCreateModal"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Category
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Showing <span class="font-medium">{{ filteredCategories.length }}</span> of
          <span class="font-medium">{{ categories.length }}</span> categories
        </p>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
          <button class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">1</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">2</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">3</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>

    <!-- Category Modal -->
    <createCategory
      :show="showCategoryModal"
      :editing-category="editingCategory"
      @close="closeModal"
      @save="saveCategory"
      :isLoading="isLoading"
    />

    <!-- Delete Modal -->
    <deleteModal
      :show="showDeleteModal"
      title="Delete Category"
      :item-name="categoryToDelete?.name"
      :item-count="categoryToDelete?.productCount || 0"
      count-type="products"
      @close="closeDeleteModal"
      @confirm="confirmDelete"
    />

  </div>
</template>