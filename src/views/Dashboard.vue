<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Inventory Dashboard</h1>
        <p class="text-gray-600 mt-1">Welcome back! Here's what's happening with your inventory today.</p>
      </div>
      <div class="flex space-x-3">
        <button class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
        <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Product
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Products Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Products</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">2,345</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +12% from last month
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Low Stock Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">23</p>
            <p class="text-xs text-red-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +5 from yesterday
            </p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Value Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Inventory Value</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">$124,567</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +8.2% increase
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Monthly Sales Card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Monthly Sales</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">1,432</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              +23.5% this week
            </p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Bar Chart - Category Distribution -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Inventory by Category</h3>
            <p class="text-sm text-gray-600 mt-1">Product distribution across categories</p>
          </div>
          <select class="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
          </select>
        </div>
        
        <div class="h-64 flex items-end justify-between space-x-4">
          <div class="flex-1 flex flex-col items-center">
            <div class="w-full bg-green-100 rounded-t-lg relative group" style="height: 140px;">
              <div class="absolute inset-0 bg-green-500 rounded-t-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
            <span class="text-xs text-gray-600 mt-2">Electronics</span>
            <span class="text-sm font-semibold text-gray-800">856</span>
          </div>
          <div class="flex-1 flex flex-col items-center">
            <div class="w-full bg-green-100 rounded-t-lg relative group" style="height: 180px;">
              <div class="absolute inset-0 bg-green-500 rounded-t-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
            <span class="text-xs text-gray-600 mt-2">Clothing</span>
            <span class="text-sm font-semibold text-gray-800">1,234</span>
          </div>
          <div class="flex-1 flex flex-col items-center">
            <div class="w-full bg-green-100 rounded-t-lg relative group" style="height: 100px;">
              <div class="absolute inset-0 bg-green-500 rounded-t-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
            <span class="text-xs text-gray-600 mt-2">Food</span>
            <span class="text-sm font-semibold text-gray-800">567</span>
          </div>
          <div class="flex-1 flex flex-col items-center">
            <div class="w-full bg-green-100 rounded-t-lg relative group" style="height: 160px;">
              <div class="absolute inset-0 bg-green-500 rounded-t-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
            <span class="text-xs text-gray-600 mt-2">Furniture</span>
            <span class="text-sm font-semibold text-gray-800">892</span>
          </div>
          <div class="flex-1 flex flex-col items-center">
            <div class="w-full bg-green-100 rounded-t-lg relative group" style="height: 120px;">
              <div class="absolute inset-0 bg-green-500 rounded-t-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </div>
            <span class="text-xs text-gray-600 mt-2">Books</span>
            <span class="text-sm font-semibold text-gray-800">678</span>
          </div>
        </div>

        <!-- Bar Chart Legend -->
        <div class="flex items-center justify-center mt-6 space-x-4">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-500 rounded-sm mr-2"></div>
            <span class="text-xs text-gray-600">Current Stock</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-gray-300 rounded-sm mr-2"></div>
            <span class="text-xs text-gray-600">Minimum Required</span>
          </div>
        </div>
      </div>

      <!-- Pie Chart - Stock Status -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-6">Stock Status</h3>
        
        <div class="relative h-48 w-48 mx-auto">
          <!-- Simple Pie Chart Representation -->
          <svg viewBox="0 0 100 100" class="transform -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" stroke-width="20"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" stroke-width="20" stroke-dasharray="251.2" stroke-dashoffset="62.8" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#eab308" stroke-width="20" stroke-dasharray="251.2" stroke-dashoffset="125.6" stroke-linecap="round"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" stroke-width="20" stroke-dasharray="251.2" stroke-dashoffset="188.4" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- Pie Chart Legend -->
        <div class="mt-6 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-600">In Stock</span>
            </div>
            <span class="text-sm font-semibold text-gray-800">65%</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-600">Low Stock</span>
            </div>
            <span class="text-sm font-semibold text-gray-800">20%</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-600">Out of Stock</span>
            </div>
            <span class="text-sm font-semibold text-gray-800">15%</span>
          </div>
        </div>

        <!-- Stock Summary -->
        <div class="mt-6 pt-6 border-t border-gray-100">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Items:</span>
            <span class="font-semibold text-gray-800">4,227</span>
          </div>
          <div class="flex justify-between text-sm mt-2">
            <span class="text-gray-600">Categories:</span>
            <span class="font-semibold text-gray-800">12</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Purchases Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">Recent Purchases</h3>
          <p class="text-sm text-gray-600 mt-1">Latest 5 transactions in your inventory</p>
        </div>
        <button class="text-sm text-green-600 hover:text-green-700 font-medium flex items-center">
          View All
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th class="px-6 py-3 bg-gray-50 rounded-l-lg">Product</th>
              <th class="px-6 py-3 bg-gray-50">Category</th>
              <th class="px-6 py-3 bg-gray-50">Quantity</th>
              <th class="px-6 py-3 bg-gray-50">Unit Price</th>
              <th class="px-6 py-3 bg-gray-50">Total</th>
              <th class="px-6 py-3 bg-gray-50">Date</th>
              <th class="px-6 py-3 bg-gray-50 rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(purchase, index) in recentPurchases" :key="index" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 bg-gray-100 rounded-lg mr-3"></div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ purchase.product }}</p>
                    <p class="text-xs text-gray-500">SKU: {{ purchase.sku }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ purchase.category }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ purchase.quantity }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">${{ purchase.unitPrice }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-800">${{ purchase.total }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ purchase.date }}</td>
              <td class="px-6 py-4">
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  purchase.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  purchase.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                ]">
                  {{ purchase.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer -->
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <p class="text-sm text-gray-600">Showing 5 of 24 purchases</p>
        <div class="flex space-x-2">
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
          <button class="px-3 py-1 border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recentPurchases = [
  {
    product: 'Wireless Headphones',
    sku: 'WH-001',
    category: 'Electronics',
    quantity: 50,
    unitPrice: '79.99',
    total: '3,999.50',
    date: '2024-01-15',
    status: 'Delivered'
  },
  {
    product: 'Cotton T-Shirt',
    sku: 'CT-023',
    category: 'Clothing',
    quantity: 200,
    unitPrice: '12.99',
    total: '2,598.00',
    date: '2024-01-14',
    status: 'Delivered'
  },
  {
    product: 'Office Chair',
    sku: 'OC-089',
    category: 'Furniture',
    quantity: 15,
    unitPrice: '199.99',
    total: '2,999.85',
    date: '2024-01-14',
    status: 'Pending'
  },
  {
    product: 'Coffee Beans',
    sku: 'CB-456',
    category: 'Food',
    quantity: 100,
    unitPrice: '8.49',
    total: '849.00',
    date: '2024-01-13',
    status: 'Processing'
  },
  {
    product: 'JavaScript Book',
    sku: 'BK-789',
    category: 'Books',
    quantity: 75,
    unitPrice: '34.99',
    total: '2,624.25',
    date: '2024-01-13',
    status: 'Delivered'
  }
]
</script>