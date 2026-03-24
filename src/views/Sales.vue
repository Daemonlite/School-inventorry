<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import CreateSale from "../components/modals/CreateSale.vue";
import DeleteSale from "../components/modals/DeleteSale.vue";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token");
const userData = JSON.parse(localStorage.getItem("user"));
const headers = { Authorization: `Bearer ${token}` };
// Available products from inventory
const availableProducts = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`, { headers });
    availableProducts.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Sales data
const sales = ref([]);

const fetchSales = async () => {
  try {
    // const response = await axios.get(`${baseUrl}/sales`, { headers });

    if (userData.role === "admin") {
      const response = await axios.get(`${baseUrl}/sales`, { headers });
      sales.value = response.data;
    } else {
      const response = await axios.get(`${baseUrl}/sales/user/${userData.userId}`, { headers });
      sales.value = response.data;
    }
    
  } catch (error) {
    console.error("Error fetching sales:", error);
  }
};

// Search functionality
const searchQuery = ref("");

const filteredSales = computed(() => {
  if (!searchQuery.value) return sales.value

  return sales.value.filter((sale) => {
    const query = searchQuery.value.toLowerCase()

    return (
      sale.product?.name?.toLowerCase().includes(query) ||
      sale.customer?.toLowerCase().includes(query) ||
      sale._id?.toLowerCase().includes(query)
    )
  })
})

// Modal states
const showSaleModal = ref(false);
const showDeleteModal = ref(false);
const editingSale = ref(null);
const saleToDelete = ref(null);

// Form state
const saleForm = ref({
  productId: "",
  customerName: "",
  customerEmail: "",
  quantity: 1,
  paymentMethod: "",
  status: "Completed",
});

// Selected product
const selectedProduct = computed(() => {
  return availableProducts.value.find((p) => p.id === saleForm.value.productId);
});

// Calculate total amount
const totalAmount = computed(() => {
  if (selectedProduct.value && saleForm.value.quantity) {
    return (selectedProduct.value.price * saleForm.value.quantity).toFixed(2);
  }
  return "0.00";
});

// Modal functions
const openCreateModal = () => {
  editingSale.value = null;
  saleForm.value = {
    productId: "",
    customerName: "",
    customerEmail: "",
    quantity: 1,
    paymentMethod: "",
    status: "Completed",
  };
  showSaleModal.value = true;
};

const openEditModal = (sale) => {
  editingSale.value = sale;
  const product = availableProducts.value.find((p) => p.name === sale.product);
  saleForm.value = {
    productId: product?.id || "",
    customerName: sale.customer.name,
    customerEmail: sale.customer.email,
    quantity: sale.quantity,
    paymentMethod: sale.paymentMethod,
    status: sale.status,
  };
  showSaleModal.value = true;
};

const closeModal = () => {
  showSaleModal.value = false;
  editingSale.value = null;
};

const saveSale = async (payload) => {
  const selectedProduct = availableProducts.value.find(
    p => String(p._id) === String(payload.product)
  )

  if (!selectedProduct) return

  const saleData = {
    product: selectedProduct._id,
    customer: {
      name: payload.customerName,
      email: payload.customerEmail,
    },
    quantity: payload.quantity,
    unitPrice: selectedProduct.price,
    paymentMethod: payload.paymentMethod,
    status: payload.status,
  }

  try {
    if (editingSale.value) {
      const response = await axios.put(
        `${baseUrl}/sales/${editingSale.value._id}`,
        saleData,
        { headers }
      )

      fetchSales()

    } else {
      const response = await axios.post(`${baseUrl}/sales`, saleData, { headers })
      sales.value.push(response.data)
    }

    closeModal()
  } catch (error) {
    console.error(error)
  }
}

// Delete functions
const openDeleteModal = (sale) => {
  saleToDelete.value = sale;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  saleToDelete.value = null;
};

const confirmDelete = () => {
  if (saleToDelete.value) {
    axios
      .delete(`${baseUrl}/sales/${saleToDelete.value._id}`, { headers })
      .then(() => {
        fetchSales();
      })
      .catch((error) => {
        console.error("Error deleting sale:", error);
      })
    closeDeleteModal();
  }
};

// Helper function for product icons
const getProductIcon = (product) => {
  const icons = {
    "Wireless Headphones":
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    "Cotton T-Shirt":
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    "Coffee Beans":
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    "Office Chair":
      "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    "JavaScript Book":
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  };
  return icons[product] || "M4 7h16M4 12h16M4 17h16";
};


const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(date);
  if (isNaN(parsed)) return "";

  return parsed.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};



// cards data
const today = new Date()

const isSameDay = (d1, d2) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  )
}

const isSameWeek = (date) => {
  const d = new Date(date)
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0,0,0,0)

  return d >= startOfWeek && d <= today
}


const getSaleTotal = (sale) => {
  if (sale.total && sale.total > 0) return sale.total
  return (sale.product?.price || 0) * (sale.quantity || 0)
}

// Today's sales
const todaysSalesTotal = computed(() => {
  return sales.value
    .filter(s => isSameDay(new Date(s.saleDate), today))
    .reduce((sum, s) => sum + getSaleTotal(s), 0)
})

// Weekly sales
const weeklySalesTotal = computed(() => {
  return sales.value
    .filter(s => isSameWeek(s.saleDate))
    .reduce((sum, s) => sum + getSaleTotal(s), 0)
})

// Transactions
const totalTransactions = computed(() => sales.value.length)

// Average
const averageOrderValue = computed(() => {
  if (!sales.value.length) return 0

  const total = sales.value.reduce(
    (sum, s) => sum + getSaleTotal(s),
    0
  )

  return parseFloat((total / sales.value.length).toFixed(2))
})

onMounted(() => {
  fetchProducts();
  fetchSales();
});
</script>
<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Sales Management</h1>
        <p class="text-gray-600 mt-1">
          Track and manage your sales transactions
        </p>
      </div>
      <button
        @click="openCreateModal"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center shadow-sm"
      >
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Record New Sale
      </button>
    </div>

    <!-- Sales Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Today's Sales Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Today's Sales</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">${{ todaysSalesTotal }}</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg
                class="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              +15% from yesterday
            </p>
          </div>
          <div
            class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Weekly Sales Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Weekly Sales</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">${{ weeklySalesTotal }}</p>
            <p class="text-xs text-blue-600 mt-2 flex items-center">
              <svg
                class="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              +8.2% from last week
            </p>
          </div>
          <div
            class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Total Transactions Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Transactions</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">{{ totalTransactions }}</p>
            <p class="text-xs text-purple-600 mt-2 flex items-center">
              <svg
                class="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              23 today
            </p>
          </div>
          <div
            class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Average Order Value Card -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Avg. Order Value</p>
            <p class="text-2xl font-bold text-gray-800 mt-2">${{ averageOrderValue }}</p>
            <p class="text-xs text-green-600 mt-2 flex items-center">
              <svg
                class="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              +$5.20 vs last month
            </p>
          </div>
          <div
            class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Sales Table -->
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div class="p-6 border-b border-gray-100">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
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
              <svg
                class="w-4 h-4 text-gray-400 absolute left-3 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
           
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr
              class="text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
            >
              <th class="px-6 py-3">Sale ID</th>
              <th class="px-6 py-3">Product</th>
              <th class="px-6 py-3">Customer</th>
              <th class="px-6 py-3">Sales Person</th>
              <th class="px-6 py-3">Quantity</th>
              <th class="px-6 py-3">Unit Price</th>
              <th class="px-6 py-3">Total</th>
              <th class="px-6 py-3">Payment Method</th>
              <th class="px-6 py-3">Date</th>
              <!-- <th class="px-6 py-3">Status</th> -->
              <th class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="sale in filteredSales"
              :key="sale._id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4">
                <span class="text-sm font-medium text-gray-800"
                  >#{{ sale._id }}</span
                >
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-8 h-8 bg-gray-100 rounded-lg mr-3 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        :d="getProductIcon(sale.product)"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-800">
                      {{ sale.product.name }}
                    </p>
                
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div>
                  <p class="text-sm text-gray-800">{{ sale.customer }}</p>
                </div>
              </td>

              <td class="px-6 py-4">
                <div>
                  <p class="text-sm text-gray-800">{{ sale.salesPerson?.name }}</p>
                </div>
              </td>

              <td class="px-6 py-4 text-sm text-gray-600">
                {{ sale.quantity }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                ${{ sale.product.price }}
              </td>
              <td class="px-6 py-4 text-sm font-medium text-gray-800">
                ${{ sale.total }}
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  {{ sale.paymentMethod }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(sale.saleDate

              ) }}</td>
              <!-- <td class="px-6 py-4">
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    sale.status === 'Completed'
                      ? 'bg-green-100 text-green-700'
                      : sale.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700',
                  ]"
                >
                  {{ sale.status }}
                </span>
              </td> -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <!-- <button
                    @click="openEditModal(sale)"
                    class="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Edit sale"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button> -->
                  <button
                    @click="openDeleteModal(sale)"
                    class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete sale"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Sale Modal -->
    <CreateSale
      :show="showSaleModal"
      @close="closeModal"
      @save="saveSale"
      :availableProducts="availableProducts"
    />

    <!-- Delete Confirmation Modal -->
    <DeleteSale
    :show="showDeleteModal"
    :sale="saleToDelete"
    @close="closeDeleteModal"
    @confirm="confirmDelete"
  />  
  </div>
</template>
