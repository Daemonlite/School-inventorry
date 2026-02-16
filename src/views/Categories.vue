<template>
  <div class="space-y-6">
    <!-- Header Section -->
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

    <!-- Categories Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Categories Card -->
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

      <!-- Active Categories Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Categories</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ activeCategories }}</p>
            <p class="text-xs text-blue-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ ((activeCategories / categories.length) * 100).toFixed(0) }}% of total
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Products Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Products in Categories</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ totalProductsInCategories }}</p>
            <p class="text-xs text-purple-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Avg {{ (totalProductsInCategories / categories.length).toFixed(0) }} per category
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Empty Categories Card -->
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
      <!-- Table Header with Filters -->
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
            <button class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th class="px-6 py-3">
                <div class="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                  <span>Category</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </th>
              <th class="px-6 py-3">Description</th>
              <th class="px-6 py-3 text-right">Products</th>
              <th class="px-6 py-3 text-right">Total Value</th>
              <th class="px-6 py-3 text-center">Status</th>
              <th class="px-6 py-3">Created</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="category in filteredCategories" :key="category.id" class="hover:bg-gray-50 transition-colors group">
              <!-- Category with Icon and Color -->
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div :class="['w-10 h-10 rounded-lg flex items-center justify-center mr-3', category.bgColor]">
                    <svg class="w-5 h-5" :class="[category.iconColor]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="category.icon" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ category.name }}</p>
                    <p class="text-xs text-gray-500">ID: {{ category.id }}</p>
                  </div>
                </div>
              </td>
              
              <!-- Description -->
              <td class="px-6 py-4">
                <p class="text-sm text-gray-600 max-w-xs truncate">{{ category.description }}</p>
              </td>
              
              <!-- Product Count -->
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <span class="text-sm font-medium text-gray-800">{{ category.productCount }}</span>
                  <div v-if="category.productCount > 0" class="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full rounded-full" 
                      :class="[
                        category.productCount > 50 ? 'bg-green-500' : 
                        category.productCount > 20 ? 'bg-yellow-500' : 'bg-red-500'
                      ]"
                      :style="{ width: Math.min((category.productCount / 100) * 100, 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </td>
              
              <!-- Total Value -->
              <td class="px-6 py-4 text-right">
                <span class="text-sm font-medium text-gray-800">${{ category.totalValue }}</span>
              </td>
              
              <!-- Status Badge -->
              <td class="px-6 py-4 text-center">
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full inline-flex items-center',
                  category.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                ]">
                  <span :class="[
                    'w-1.5 h-1.5 rounded-full mr-1.5',
                    category.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
                  ]"></span>
                  {{ category.status }}
                </span>
              </td>
              
              <!-- Created Date -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-600">{{ formatDate(category.createdDate) }}</div>
                <div class="text-xs text-gray-400">{{ getRelativeTime(category.createdDate) }}</div>
              </td>
              
              <!-- Actions -->
              <td class="px-6 py-4">
                <div class="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
            
            <!-- Empty State -->
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

      <!-- Table Footer with Pagination -->
      <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Showing <span class="font-medium">{{ filteredCategories.length }}</span> of 
          <span class="font-medium">{{ categories.length }}</span> categories
        </p>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">1</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">2</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">3</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Category Modal -->
    <div v-if="showCategoryModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveCategory">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800" id="modal-title">
                  {{ editingCategory ? 'Edit Category' : 'Create New Category' }}
                </h3>
                <button @click="closeModal" type="button" class="text-gray-400 hover:text-gray-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="space-y-4">
                <!-- Category Name -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Category Name <span class="text-red-500">*</span></label>
                  <input 
                    v-model="categoryForm.name"
                    type="text" 
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Electronics, Clothing, etc."
                  />
                </div>

                <!-- Description -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    v-model="categoryForm.description"
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Describe the category..."
                  ></textarea>
                </div>

                <!-- Color and Icon Selection -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                    <div class="grid grid-cols-5 gap-2">
                      <button 
                        v-for="color in colorThemes" 
                        :key="color.name"
                        type="button"
                        @click="categoryForm.colorTheme = color.name"
                        :class="[
                          'w-full h-8 rounded-lg transition-all',
                          color.bg,
                          categoryForm.colorTheme === color.name ? 'ring-2 ring-offset-2 ring-green-500' : ''
                        ]"
                        :title="color.name"
                      ></button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category Icon</label>
                    <select 
                      v-model="categoryForm.icon"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option v-for="icon in icons" :key="icon.name" :value="icon.name">
                        {{ icon.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Status -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div class="flex items-center space-x-4">
                    <label class="flex items-center">
                      <input type="radio" v-model="categoryForm.status" value="Active" class="mr-2">
                      <span class="text-sm text-gray-700">Active</span>
                    </label>
                    <label class="flex items-center">
                      <input type="radio" v-model="categoryForm.status" value="Inactive" class="mr-2">
                      <span class="text-sm text-gray-700">Inactive</span>
                    </label>
                  </div>
                </div>

                <!-- Preview -->
                <div v-if="categoryForm.name" class="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p class="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div class="flex items-center">
                    <div :class="['w-10 h-10 rounded-lg flex items-center justify-center mr-3', `bg-${categoryForm.colorTheme}-100`]">
                      <svg class="w-5 h-5" :class="[`text-${categoryForm.colorTheme}-600`]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(categoryForm.icon)" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-800">{{ categoryForm.name }}</p>
                      <p class="text-xs text-gray-500">{{ categoryForm.description || 'No description' }}</p>
                    </div>
                    <span :class="[
                      'ml-auto px-2 py-1 text-xs font-medium rounded-full',
                      categoryForm.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    ]">
                      {{ categoryForm.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="submit"
                class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
              >
                {{ editingCategory ? 'Update Category' : 'Create Category' }}
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
                  Delete Category
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete "<span class="font-semibold">{{ categoryToDelete?.name }}</span>"?
                  </p>
                  <p v-if="categoryToDelete?.productCount > 0" class="text-sm text-red-600 mt-2">
                    ⚠️ This category contains {{ categoryToDelete?.productCount }} products. 
                    You need to reassign or delete these products first.
                  </p>
                  <p v-else class="text-sm text-gray-500 mt-2">
                    This action cannot be undone.
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
              :disabled="categoryToDelete?.productCount > 0"
              :class="{ 'opacity-50 cursor-not-allowed': categoryToDelete?.productCount > 0 }"
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

// Categories data
const categories = ref([
  {
    id: 'CAT-001',
    name: 'Electronics',
    description: 'Electronic devices, gadgets, and accessories',
    productCount: 45,
    totalValue: '12,450.00',
    status: 'Active',
    createdDate: '2024-01-15',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    icon: 'M9 3v2m6-2v2M9 3h6M9 3H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-4M9 7h6'
  },
  {
    id: 'CAT-002',
    name: 'Clothing',
    description: 'Apparel, fashion wear, and accessories',
    productCount: 78,
    totalValue: '8,750.50',
    status: 'Active',
    createdDate: '2024-01-14',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    id: 'CAT-003',
    name: 'Food & Beverages',
    description: 'Groceries, drinks, and food items',
    productCount: 92,
    totalValue: '5,230.75',
    status: 'Active',
    createdDate: '2024-01-12',
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    id: 'CAT-004',
    name: 'Furniture',
    description: 'Home and office furniture',
    productCount: 34,
    totalValue: '15,890.00',
    status: 'Active',
    createdDate: '2024-01-10',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
  },
  {
    id: 'CAT-005',
    name: 'Books',
    description: 'Books, magazines, and publications',
    productCount: 56,
    totalValue: '3,450.25',
    status: 'Active',
    createdDate: '2024-01-08',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  },
  {
    id: 'CAT-006',
    name: 'Sports',
    description: 'Sports equipment and accessories',
    productCount: 0,
    totalValue: '0.00',
    status: 'Inactive',
    createdDate: '2024-01-05',
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-600',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  }
])

// Stats calculations
const newThisMonth = computed(() => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  return categories.value.filter(cat => {
    const createdDate = new Date(cat.createdDate)
    return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear
  }).length
})

const activeCategories = computed(() => {
  return categories.value.filter(cat => cat.status === 'Active').length
})

const totalProductsInCategories = computed(() => {
  return categories.value.reduce((sum, cat) => sum + cat.productCount, 0)
})

const emptyCategories = computed(() => {
  return categories.value.filter(cat => cat.productCount === 0).length
})

// Filtering
const searchQuery = ref('')
const statusFilter = ref('all')

const filteredCategories = computed(() => {
  let filtered = categories.value
  
  if (searchQuery.value) {
    filtered = filtered.filter(cat => 
      cat.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cat.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(cat => cat.status === statusFilter.value)
  }
  
  return filtered
})

// Modal states
const showCategoryModal = ref(false)
const showDeleteModal = ref(false)
const editingCategory = ref(null)
const categoryToDelete = ref(null)

// Form state
const categoryForm = ref({
  name: '',
  description: '',
  colorTheme: 'green',
  icon: 'electronics',
  status: 'Active'
})

// Color themes
const colorThemes = [
  { name: 'green', bg: 'bg-green-500' },
  { name: 'blue', bg: 'bg-blue-500' },
  { name: 'yellow', bg: 'bg-yellow-500' },
  { name: 'purple', bg: 'bg-purple-500' },
  { name: 'red', bg: 'bg-red-500' },
  { name: 'gray', bg: 'bg-gray-500' }
]

// Icons with labels
const icons = [
  { name: 'electronics', label: 'Electronics', path: 'M9 3v2m6-2v2M9 3h6M9 3H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2h-4M9 7h6' },
  { name: 'clothing', label: 'Clothing', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { name: 'food', label: 'Food', path: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { name: 'furniture', label: 'Furniture', path: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { name: 'books', label: 'Books', path: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { name: 'sports', label: 'Sports', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { name: 'beauty', label: 'Beauty', path: 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z' },
  { name: 'toys', label: 'Toys', path: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  { name: 'automotive', label: 'Automotive', path: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' }
]

// Helper functions
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const getRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

const getIconPath = (iconName) => {
  const icon = icons.find(i => i.name === iconName)
  return icon ? icon.path : icons[0].path
}

// Modal functions
const openCreateModal = () => {
  editingCategory.value = null
  categoryForm.value = {
    name: '',
    description: '',
    colorTheme: 'green',
    icon: 'electronics',
    status: 'Active'
  }
  showCategoryModal.value = true
}

const openEditModal = (category) => {
  editingCategory.value = category
  // Find icon name from path
  const icon = icons.find(i => i.path === category.icon)
  
  categoryForm.value = {
    name: category.name,
    description: category.description,
    colorTheme: category.bgColor.replace('bg-', '').replace('-100', ''),
    icon: icon ? icon.name : 'electronics',
    status: category.status
  }
  showCategoryModal.value = true
}

const closeModal = () => {
  showCategoryModal.value = false
  editingCategory.value = null
}

const saveCategory = () => {
  const selectedIcon = icons.find(i => i.name === categoryForm.value.icon)
  
  const categoryData = {
    id: editingCategory.value ? editingCategory.value.id : `CAT-${String(categories.value.length + 1).padStart(3, '0')}`,
    name: categoryForm.value.name,
    description: categoryForm.value.description,
    productCount: editingCategory.value ? editingCategory.value.productCount : 0,
    totalValue: editingCategory.value ? editingCategory.value.totalValue : '0.00',
    status: categoryForm.value.status,
    createdDate: editingCategory.value ? editingCategory.value.createdDate : new Date().toISOString().slice(0, 10),
    bgColor: `bg-${categoryForm.value.colorTheme}-100`,
    iconColor: `text-${categoryForm.value.colorTheme}-600`,
    icon: selectedIcon ? selectedIcon.path : icons[0].path
  }

  if (editingCategory.value) {
    const index = categories.value.findIndex(c => c.id === editingCategory.value.id)
    categories.value[index] = categoryData
  } else {
    categories.value.push(categoryData)
  }
  
  closeModal()
}

// Delete functions
const openDeleteModal = (category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  categoryToDelete.value = null
}

const confirmDelete = () => {
  if (categoryToDelete.value && categoryToDelete.value.productCount === 0) {
    categories.value = categories.value.filter(c => c.id !== categoryToDelete.value.id)
    closeDeleteModal()
  }
}
</script>