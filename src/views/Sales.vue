<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Sales Management</h1>
        <p class="text-gray-600 mt-1">Track and manage your sales transactions</p>
      </div>
      <button 
        @click="openCreateModal"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center shadow-sm"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Record New Sale
      </button>
    </div>

    <!-- Sales Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Today's Sales Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Today's Sales</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">$2,456</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +15% from yesterday
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Weekly Sales Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Weekly Sales</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">$18,234</p>
            <p class="text-xs text-blue-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +8.2% from last week
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Transactions Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Transactions</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">342</p>
            <p class="text-xs text-purple-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              23 today
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Average Order Value Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Avg. Order Value</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">$67.50</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +$5.20 vs last month
            </p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Sales Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Recent Sales</h3>
            <p class="text-sm text-gray-600 mt-1">Latest sales transactions</p>
          </div>
          <div class="flex items-center space-x-3">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search sales..." 
                v-model="searchQuery"
                class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
              />
              <svg class="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>All Payment Methods</option>
              <option>Cash</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Mobile Payment</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
              <th class="px-6 py-3">Sale ID</th>
              <th class="px-6 py-3">Product</th>
              <th class="px-6 py-3">Customer</th>
              <th class="px-6 py-3">Quantity</th>
              <th class="px-6 py-3">Unit Price</th>
              <th class="px-6 py-3">Total</th>
              <th class="px-6 py-3">Payment Method</th>
              <th class="px-6 py-3">Date</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="sale in filteredSales" :key="sale.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <span class="text-sm font-medium text-gray-800">#{{ sale.id }}</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-100 rounded-lg mr-3 flex items-center justify-center">
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getProductIcon(sale.product)" />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ sale.product }}</p>
                    <p class="text-xs text-gray-500">SKU: {{ sale.sku }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div>
                  <p class="text-sm text-gray-800">{{ sale.customer.name }}</p>
                  <p class="text-xs text-gray-500">{{ sale.customer.email }}</p>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ sale.quantity }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">${{ sale.unitPrice }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-800">${{ sale.total }}</td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                  {{ sale.paymentMethod }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ sale.date }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  sale.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                ]">
                  {{ sale.status }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <button 
                    @click="openEditModal(sale)"
                    class="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit sale"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    @click="openDeleteModal(sale)"
                    class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete sale"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <p class="text-sm text-gray-600">Showing 1 to 5 of 25 sales</p>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
          <button class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">1</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">2</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">3</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Sale Modal -->
    <div v-if="showSaleModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form @submit.prevent="saveSale">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800" id="modal-title">
                  {{ editingSale ? 'Edit Sale' : 'Record New Sale' }}
                </h3>
                <button @click="closeModal" type="button" class="text-gray-400 hover:text-gray-500">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div class="space-y-4">
                <!-- Product Selection Dropdown -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Select Product <span class="text-red-500">*</span></label>
                  <select 
                    v-model="saleForm.productId"
                    @change="updateProductDetails"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose a product</option>
                    <option v-for="product in availableProducts" :key="product.id" :value="product.id">
                      {{ product.name }} - ${{ product.price }} (Stock: {{ product.stock }})
                    </option>
                  </select>
                  <p v-if="selectedProduct && selectedProduct.stock < 10" class="mt-1 text-xs text-yellow-600">
                    ⚠️ Low stock alert: Only {{ selectedProduct.stock }} units available
                  </p>
                </div>

                <!-- Selected Product Details (Read-only) -->
                <div v-if="selectedProduct" class="bg-gray-50 p-3 rounded-lg">
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="text-gray-500">SKU:</span>
                      <span class="ml-2 font-medium">{{ selectedProduct.sku }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">Category:</span>
                      <span class="ml-2 font-medium">{{ selectedProduct.category }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">Available Stock:</span>
                      <span class="ml-2 font-medium" :class="{ 'text-red-600': selectedProduct.stock < 10 }">
                        {{ selectedProduct.stock }}
                      </span>
                    </div>
                    <div>
                      <span class="text-gray-500">Unit Price:</span>
                      <span class="ml-2 font-medium">${{ selectedProduct.price }}</span>
                    </div>
                  </div>
                </div>

                <!-- Customer Information -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <input 
                      v-model="saleForm.customerName"
                      type="text" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                    <input 
                      v-model="saleForm.customerEmail"
                      type="email" 
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <!-- Quantity and Payment -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input 
                      v-model="saleForm.quantity"
                      @input="calculateTotal"
                      type="number" 
                      required
                      min="1"
                      :max="selectedProduct?.stock || 1"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select 
                      v-model="saleForm.paymentMethod"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select method</option>
                      <option value="Cash">Cash</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Mobile Payment">Mobile Payment</option>
                    </select>
                  </div>
                </div>

                <!-- Price Summary -->
                <div class="bg-green-50 p-4 rounded-lg">
                  <div class="flex justify-between items-center text-sm">
                    <span class="text-gray-600">Unit Price:</span>
                    <span class="font-medium">${{ selectedProduct?.price || 0 }}</span>
                  </div>
                  <div class="flex justify-between items-center text-sm mt-2">
                    <span class="text-gray-600">Quantity:</span>
                    <span class="font-medium">{{ saleForm.quantity || 0 }}</span>
                  </div>
                  <div class="flex justify-between items-center text-lg font-bold mt-3 pt-3 border-t border-green-200">
                    <span class="text-gray-800">Total Amount:</span>
                    <span class="text-green-600">${{ totalAmount }}</span>
                  </div>
                </div>

                <!-- Sale Status -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Sale Status</label>
                  <select 
                    v-model="saleForm.status"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="submit"
                class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                :disabled="!isValidSale"
              >
                {{ editingSale ? 'Update Sale' : 'Record Sale' }}
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
                  Delete Sale Record
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Are you sure you want to delete sale #{{ saleToDelete?.id }} for {{ saleToDelete?.product }}? This action cannot be undone.
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

// Available products from inventory
const availableProducts = ref([
  { id: 1, name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: 79.99, stock: 45 },
  { id: 2, name: 'Cotton T-Shirt', sku: 'CT-023', category: 'Clothing', price: 12.99, stock: 8 },
  { id: 3, name: 'Coffee Beans', sku: 'CB-456', category: 'Food', price: 8.49, stock: 15 },
  { id: 4, name: 'Office Chair', sku: 'OC-089', category: 'Furniture', price: 199.99, stock: 12 },
  { id: 5, name: 'JavaScript Book', sku: 'BK-789', category: 'Books', price: 34.99, stock: 23 },
  { id: 6, name: 'Laptop Backpack', sku: 'BP-234', category: 'Accessories', price: 49.99, stock: 7 },
  { id: 7, name: 'Smart Watch', sku: 'SW-567', category: 'Electronics', price: 199.99, stock: 0 },
])

// Sales data
const sales = ref([
  {
    id: 'S001',
    product: 'Wireless Headphones',
    sku: 'WH-001',
    customer: { name: 'John Smith', email: 'john@example.com' },
    quantity: 2,
    unitPrice: 79.99,
    total: 159.98,
    paymentMethod: 'Credit Card',
    date: '2024-01-15 14:30',
    status: 'Completed'
  },
  {
    id: 'S002',
    product: 'Cotton T-Shirt',
    sku: 'CT-023',
    customer: { name: 'Emma Wilson', email: 'emma@example.com' },
    quantity: 3,
    unitPrice: 12.99,
    total: 38.97,
    paymentMethod: 'Cash',
    date: '2024-01-15 13:15',
    status: 'Completed'
  },
  {
    id: 'S003',
    product: 'Office Chair',
    sku: 'OC-089',
    customer: { name: 'Michael Brown', email: 'michael@example.com' },
    quantity: 1,
    unitPrice: 199.99,
    total: 199.99,
    paymentMethod: 'Debit Card',
    date: '2024-01-15 11:45',
    status: 'Pending'
  },
  {
    id: 'S004',
    product: 'Coffee Beans',
    sku: 'CB-456',
    customer: { name: 'Sarah Davis', email: 'sarah@example.com' },
    quantity: 5,
    unitPrice: 8.49,
    total: 42.45,
    paymentMethod: 'Mobile Payment',
    date: '2024-01-14 16:20',
    status: 'Completed'
  },
  {
    id: 'S005',
    product: 'JavaScript Book',
    sku: 'BK-789',
    customer: { name: 'David Lee', email: 'david@example.com' },
    quantity: 2,
    unitPrice: 34.99,
    total: 69.98,
    paymentMethod: 'Credit Card',
    date: '2024-01-14 10:05',
    status: 'Completed'
  }
])

// Search functionality
const searchQuery = ref('')

const filteredSales = computed(() => {
  if (!searchQuery.value) return sales.value
  return sales.value.filter(sale => 
    sale.product.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    sale.customer.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    sale.id.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Modal states
const showSaleModal = ref(false)
const showDeleteModal = ref(false)
const editingSale = ref(null)
const saleToDelete = ref(null)

// Form state
const saleForm = ref({
  productId: '',
  customerName: '',
  customerEmail: '',
  quantity: 1,
  paymentMethod: '',
  status: 'Completed'
})

// Selected product
const selectedProduct = computed(() => {
  return availableProducts.value.find(p => p.id === saleForm.value.productId)
})

// Calculate total amount
const totalAmount = computed(() => {
  if (selectedProduct.value && saleForm.value.quantity) {
    return (selectedProduct.value.price * saleForm.value.quantity).toFixed(2)
  }
  return '0.00'
})

// Form validation
const isValidSale = computed(() => {
  return saleForm.value.productId &&
         saleForm.value.customerName &&
         saleForm.value.customerEmail &&
         saleForm.value.quantity > 0 &&
         saleForm.value.paymentMethod &&
         selectedProduct.value &&
         saleForm.value.quantity <= selectedProduct.value.stock
})

// Update product details when selected
const updateProductDetails = () => {
  if (selectedProduct.value) {
    saleForm.value.quantity = 1
  }
}

// Calculate total on quantity change
const calculateTotal = () => {
  // Total is computed, so no need to do anything here
  // This method exists for future calculations if needed
}

// Modal functions
const openCreateModal = () => {
  editingSale.value = null
  saleForm.value = {
    productId: '',
    customerName: '',
    customerEmail: '',
    quantity: 1,
    paymentMethod: '',
    status: 'Completed'
  }
  showSaleModal.value = true
}

const openEditModal = (sale) => {
  editingSale.value = sale
  const product = availableProducts.value.find(p => p.name === sale.product)
  saleForm.value = {
    productId: product?.id || '',
    customerName: sale.customer.name,
    customerEmail: sale.customer.email,
    quantity: sale.quantity,
    paymentMethod: sale.paymentMethod,
    status: sale.status
  }
  showSaleModal.value = true
}

const closeModal = () => {
  showSaleModal.value = false
  editingSale.value = null
}

const saveSale = () => {
  if (!selectedProduct.value) return

  const saleData = {
    id: editingSale.value ? editingSale.value.id : `S${String(sales.value.length + 1).padStart(3, '0')}`,
    product: selectedProduct.value.name,
    sku: selectedProduct.value.sku,
    customer: {
      name: saleForm.value.customerName,
      email: saleForm.value.customerEmail
    },
    quantity: parseInt(saleForm.value.quantity),
    unitPrice: selectedProduct.value.price,
    total: parseFloat(totalAmount.value),
    paymentMethod: saleForm.value.paymentMethod,
    date: editingSale.value ? editingSale.value.date : new Date().toISOString().slice(0, 16).replace('T', ' '),
    status: saleForm.value.status
  }

  if (editingSale.value) {
    // Update existing sale
    const index = sales.value.findIndex(s => s.id === editingSale.value.id)
    sales.value[index] = saleData
  } else {
    // Create new sale and update product stock
    sales.value.unshift(saleData)
    
    // Update product stock
    const productIndex = availableProducts.value.findIndex(p => p.id === selectedProduct.value.id)
    if (productIndex !== -1) {
      availableProducts.value[productIndex].stock -= parseInt(saleForm.value.quantity)
    }
  }
  
  closeModal()
}

// Delete functions
const openDeleteModal = (sale) => {
  saleToDelete.value = sale
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  saleToDelete.value = null
}

const confirmDelete = () => {
  if (saleToDelete.value) {
    sales.value = sales.value.filter(s => s.id !== saleToDelete.value.id)
    closeDeleteModal()
  }
}

// Helper function for product icons
const getProductIcon = (product) => {
  const icons = {
    'Wireless Headphones': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    'Cotton T-Shirt': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    'Coffee Beans': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    'Office Chair': 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    'JavaScript Book': 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
  }
  return icons[product] || 'M4 7h16M4 12h16M4 17h16'
}
</script>