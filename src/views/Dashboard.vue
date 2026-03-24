<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { Bar, Pie } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, 
  CategoryScale, LinearScale, ArcElement 
} from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

// State
const dashboardData = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Methods
const fetchDashboardData = async () => {
  error.value = null
  isLoading.value = true
  
  try {
    const response = await axios.get(`${API_BASE_URL}/sales/dashboard`, {
      headers: getAuthHeaders()
    })
    dashboardData.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load dashboard data'
    console.error('Dashboard fetch error:', err)
  } finally {
    isLoading.value = false
  }
}

// Formatting utilities
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value || 0)
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Chart data
const barChartData = computed(() => {
  const categories = dashboardData.value?.chartsData?.inventoryByCategory || []
  return {
    labels: categories.map(item => item.category),
    datasets: [{
      label: 'Products',
      data: categories.map(item => item.totalProducts),
      backgroundColor: '#10b981',
      borderRadius: 6,
      barPercentage: 0.7
    }]
  }
})

const pieChartData = computed(() => {
  const stock = dashboardData.value?.chartsData?.stockStatus || {}
  return {
    labels: ['In Stock', 'Low Stock', 'Out of Stock'],
    datasets: [{
      data: [stock.inStock || 0, stock.lowStock || 0, stock.outOfStock || 0],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        font: { size: 12 }
      }
    },
    tooltip: {
      callbacks: {
        label: (context) => `${context.label}: ${context.raw.toLocaleString()}`
      }
    }
  }
}

// Lifecycle
onMounted(fetchDashboardData)
</script>

<template>
  <div class="dashboard-container">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p class="loading-text">Loading dashboard...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-icon">⚠️</div>
      <h3 class="error-title">Unable to Load Dashboard</h3>
      <p class="error-message">{{ error }}</p>
      <button @click="fetchDashboardData" class="retry-button">Try Again</button>
    </div>

    <!-- Dashboard Content -->
    <div v-else-if="dashboardData" class="dashboard-content">
      <!-- Header -->
      <div class="dashboard-header">
        <div>
          <h1 class="dashboard-title">Inventory Dashboard</h1>
          <p class="dashboard-subtitle">Real-time overview of your stock and sales performance</p>
        </div>
        <button @click="fetchDashboardData" class="refresh-button">
          <span class="refresh-icon">↻</span>
          Refresh
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-info">
            <p class="stat-label">Total Products</p>
            <p class="stat-value">{{ dashboardData.cardsData?.totalProducts?.toLocaleString() || 0 }}</p>
          </div>
          <div class="stat-icon stat-icon-green">📦</div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p class="stat-label">Low Stock Items</p>
            <p class="stat-value stat-value-warning">{{ dashboardData.cardsData?.lowStockProducts || 0 }}</p>
          </div>
          <div class="stat-icon stat-icon-orange">⚠️</div>
        </div>

        <div class="stat-card">
          <div class="stat-info">
            <p class="stat-label">Inventory Value</p>
            <p class="stat-value">{{ formatCurrency(dashboardData.cardsData?.inventoryValue) }}</p>
          </div>
          <div class="stat-icon stat-icon-blue">💰</div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="charts-grid">
        <div class="chart-card">
          <h3 class="chart-title">Products by Category</h3>
          <div class="chart-container">
            <Bar :data="barChartData" :options="chartOptions" />
          </div>
        </div>

        <div class="chart-card">
          <h3 class="chart-title">Stock Distribution</h3>
          <div class="chart-container">
            <Pie :data="pieChartData" :options="chartOptions" />
          </div>
        </div>
      </div>

      <!-- Recent Sales Table -->
      <div class="table-card">
        <div class="table-header">
          <h3 class="table-title">Recent Sales</h3>
          <span class="table-badge">{{ dashboardData.cardsData?.recentSales?.length || 0 }} transactions</span>
        </div>
        
        <div class="table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in dashboardData.cardsData?.recentSales" :key="sale._id">
                <td class="product-cell">{{ sale.product?.name || '—' }}</td>
                <td>{{ sale.customer?.split(' - ')[0] || '—' }}</td>
                <td class="amount-cell">{{ formatCurrency(sale.total) }}</td>
                <td class="date-cell">{{ formatDate(sale.saleDate) }}</td>
              </tr>
              <tr v-if="!dashboardData.cardsData?.recentSales?.length">
                <td colspan="4" class="empty-state-cell">No recent sales data available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container */
.dashboard-container {
  min-height: 100vh;
  background: #f9fafb;
  padding: 2rem;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #e5e7eb;
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Error State */
.error-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 1rem;
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.retry-button {
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.retry-button:hover {
  background: #059669;
}

/* Dashboard Content */
.dashboard-content {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.dashboard-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.dashboard-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
}

.refresh-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s;
}

.refresh-button:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.refresh-icon {
  font-size: 1rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  transition: box-shadow 0.2s;
}

.stat-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
}

.stat-value-warning {
  color: #f59e0b;
}

.stat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  font-size: 1.5rem;
}

.stat-icon-green {
  background: #ecfdf5;
}

.stat-icon-orange {
  background: #fffbeb;
}

.stat-icon-blue {
  background: #eff6ff;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.chart-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #f3f4f6;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1.25rem;
}

.chart-container {
  height: 280px;
  position: relative;
}

/* Table Card */
.table-card {
  background: white;
  border-radius: 1rem;
  border: 1px solid #f3f4f6;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.table-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.table-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
}

.table-badge {
  padding: 0.25rem 0.75rem;
  background: #f3f4f6;
  border-radius: 2rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.table-wrapper {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  border-bottom: 1px solid #f3f4f6;
}

.data-table td {
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #f9fafb;
}

.data-table tr:hover td {
  background: #fafafa;
}

.product-cell {
  font-weight: 500;
  color: #111827;
}

.amount-cell {
  font-weight: 600;
  color: #111827;
}

.date-cell {
  color: #6b7280;
}

.empty-state-cell {
  text-align: center;
  padding: 3rem !important;
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .dashboard-title {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    gap: 1rem;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .chart-container {
    height: 240px;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.75rem 1rem;
  }
}
</style>