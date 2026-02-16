<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'


// Current language
const currentLanguage = ref('en')
const transactionType = ref('Selling')
const headerBg = ref('bg-emerald-50')
const isLoading = ref(false)
const formErrors = ref({})
// Setup scroll event listeners
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// Computed properties
const transactionTitle = computed(() => {
  return `I'm ${transactionType.value}`
})

const transactionLabel = computed(() => {
  return `What are you ${transactionType.value.toLowerCase()}?`
})

// Mock data for metrics
const metrics = {
  totalProcessed: '$7,500,000,000+',
  totalCustomers: '3,000,000+',
  award: 'BBB Torch Awards Winner of 2017 Award for Ethics'
}

// Start transaction with loading state
const startTransaction = async () => {
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, you would make an API call here
    console.log('Transaction started:', {
      type: transactionType.value,
      amount: transactionAmount.value,
      currency: transactionCurrency.value,
      item: itemDescription.value
    })
    
    // Show success message (in real app, use a toast/notification)
    alert(`Transaction for $${transactionAmount.value} started successfully!`)
    
    // Reset form
    transactionAmount.value = 800
    itemDescription.value = ''
    formErrors.value = {}
    
  } catch (error) {
    console.error('Transaction error:', error)
    alert('Failed to start transaction. Please try again.')
  } finally {
    isLoading.value = false
  }
}

// Form validation
const validateForm = () => {
  const errors = {}
  
  if (!itemDescription.value.trim()) {
    errors.item = 'Please describe what you are buying/selling'
  }
  
  if (!transactionAmount.value || transactionAmount.value <= 0) {
    errors.amount = 'Please enter a valid amount greater than 0'
  }
  
  formErrors.value = errors
  return Object.keys(errors).length === 0
}





// Debounce utility for performance
const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Scroll handler with debouncing
const handleScroll = debounce(() => {
  if (window.scrollY > 50) {
    headerBg.value = 'bg-white shadow-md'
  } else {
    headerBg.value = 'bg-emerald-50'
  }
}, 10)

// Internationalization structure (ready for expansion)
const i18n = {
  en: {
    title: 'Never buy or sell online without using PRESCROW',
    subtitle: 'With PRESCROW you can buy and sell anything safely without the risk of chargebacks. Truly secure payments.',
    // Add more translations as needed
  }
}

// Features data
const features = [
  {
    title: 'Fees',
    subtitle: 'More transparent fees',
    icon: '💰',
    color: 'bg-emerald-50 border-emerald-100'
  },
  {
    title: 'Escrow Pay',
    subtitle: 'Simplest way to add secure payments',
    icon: '💳',
    color: 'bg-emerald-50 border-emerald-100'
  },
  {
    title: 'Escrow Offer',
    subtitle: 'Allow negotiation for your transactions',
    icon: '🤝',
    color: 'bg-emerald-50 border-emerald-100'
  },
  {
    title: 'Escrow Buttons',
    subtitle: 'Create a button for Escrow transaction',
    icon: '🔘',
    color: 'bg-emerald-50 border-emerald-100'
  },
  {
    title: 'Escrow API',
    subtitle: 'Get all benefits of Escrow via API',
    icon: '⚡',
    color: 'bg-emerald-50 border-emerald-100'
  }
]

// Process steps
const escrowProcessSteps = [
  { id: 1, title: 'Buyer and Seller agree to terms', completed: true, icon: '🤝' },
  { id: 2, title: 'Buyer submits payment to Escrow', completed: true, icon: '📱' },
  { id: 3, title: 'Seller delivers goods or service to buyer', completed: true, icon: '📦' },
  { id: 4, title: 'Buyer approves goods or services', completed: true, icon: '✅' },
  { id: 5, title: 'Escrow.com releases payment to seller', completed: false, icon: '💸' }
]

// Supported transaction types
const supportedTransactions = [
  {
    title: 'Domain Names',
    icon: '🌐',
    description: 'Escrow.com is the dominant payment method for the buying & selling of domain names. We secure transactions for major marketplaces like GoDaddy, Sedo, and Afternic.'
  },
  {
    title: 'Motor Vehicles',
    icon: '🚗',
    description: 'When buying classic cars, a used sailboat or even an aircraft, Escrow.com assures both the buyer and seller are protected every step of the way.'
  },
  {
    title: 'Electronics',
    icon: '💻',
    description: 'Escrow.com handles the buying and selling of large scale computer setups, professional music studios, and all varieties of electronics equipment, both big and small.'
  },
  {
    title: 'General Merchandise',
    icon: '🛒',
    description: 'From computer hardware to luxury goods, you can safely buy and sell general merchandise all over the world with the protection of Escrow.com.'
  },
  {
    title: 'Milestone Transactions',
    icon: '☑️',
    description: 'Paying for a good or service and want money released only at certain stages? Use Escrow to assure that money is released only when you\'re ready to take the next step.'
  },
  {
    title: 'Jewelry, Watches, and Fashion',
    icon: '⌚',
    description: 'Buying and selling expensive jewelry online can be difficult, as it is extremely difficult to spot a scam. Escrow.com makes it simple to ship, process payment, verify ownership and delivery safely with every sale.'
  },
]


</script>


<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <section class="mb-16">
        <div class="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Never buy or sell online without using <span class="text-emerald-600">PRESCROW</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8">
              With PRESCROW you can buy and sell anything safely without the risk of chargebacks. 
              Truly secure payments.
            </p>

            <!-- Transaction Calculator -->
            <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-emerald-100">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-semibold text-gray-900">{{ transactionTitle }}</h3>
                <div class="flex space-x-2">
                  <button 
                    @click="transactionType = 'Selling'"
                    class="px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    :class="transactionType === 'Selling' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
                    :aria-pressed="transactionType === 'Selling'"
                  >
                    Selling
                  </button>
                  <button 
                    @click="transactionType = 'Buying'"
                    class="px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    :class="transactionType === 'Buying' ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'"
                    :aria-pressed="transactionType === 'Buying'"
                  >
                    Buying
                  </button>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ transactionLabel }}
                  </label>
                  <input 
                    v-model="itemDescription"
                    type="text" 
                    placeholder="Domain names, vehicles, electronics..." 
                    class="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors"
                    :class="{ 'border-red-300': formErrors.item }"
                  />
                  <p v-if="formErrors.item" class="mt-1 text-sm text-red-600">{{ formErrors.item }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Amount
                  </label>
                  <div class="flex space-x-4">
                    <div class="flex-1">
                      <div class="relative">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500">$</span>
                        <input 
                          v-model.number="transactionAmount"
                          type="number" 
                          min="0"
                          step="0.01"
                          class="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors"
                          :class="{ 'border-red-300': formErrors.amount }"
                        />
                      </div>
                      <p v-if="formErrors.amount" class="mt-1 text-sm text-red-600">{{ formErrors.amount }}</p>
                    </div>
                    <select 
                      v-model="transactionCurrency"
                      class="px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors bg-white"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                <button 
                  @click="startTransaction"
                  :disabled="isLoading"
                  class="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isLoading">Get started now</span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                </button>
              </div>
            </div>

            <!-- Trust Metrics -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div class="bg-white p-4 rounded-lg border border-emerald-100">
                <div class="text-2xl font-bold text-emerald-600">{{ metrics.totalProcessed }}</div>
                <div class="text-sm text-gray-600 mt-1">Total Processed</div>
              </div>
              <div class="bg-white p-4 rounded-lg border border-emerald-100">
                <div class="text-2xl font-bold text-emerald-600">{{ metrics.totalCustomers }}</div>
                <div class="text-sm text-gray-600 mt-1">Total Customers</div>
              </div>
              <div class="bg-white p-4 rounded-lg border border-emerald-100 md:col-span-1 col-span-2">
                <div class="text-sm font-semibold text-emerald-600">{{ metrics.award }}</div>
              </div>
            </div>
          </div>

          <!-- Escrow Process Visualization -->
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-8">
              Complete protection for merchandise transactions
            </h2>
            
            <div class="space-y-6">
              <div 
                v-for="step in escrowProcessSteps" 
                :key="step.id"
                class="flex items-start"
              >
                <div class="flex-shrink-0 mr-4">
                  <div 
                    class="w-10 h-10 rounded-full flex items-center justify-center"
                    :class="step.completed ? 'bg-emerald-100 border-2 border-emerald-500' : 'bg-emerald-50 border-2 border-emerald-200'"
                  >
                    <span 
                      class="text-lg font-bold"
                      :class="step.completed ? 'text-emerald-600' : 'text-emerald-400'"
                    >
                      {{ step.id }}
                    </span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h3 class="font-medium text-gray-900">{{ step.title }}</h3>
                    <div 
                      v-if="step.completed"
                      class="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                      aria-label="Step completed"
                    >
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div class="mt-2 h-1 bg-emerald-100 rounded-full overflow-hidden">
                    <div 
                      class="h-full transition-all duration-500"
                      :class="step.completed ? 'w-full bg-emerald-500' : 'w-0'"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Statistics Section -->
      <section class="mb-16 py-12 text-center">
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Over $7.5 billion of transactions protected with Escrow.com
        </h2>
        <p class="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
          Escrow.com is the world's most secure payment method from a counterparty risk perspective - safeguarding 
          both buyer and seller; all funds transacted using escrow are kept in trust.
        </p>
        
        <div class="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="(step, index) in escrowProcessSteps" 
            :key="'escrow-' + index" 
            class="flex flex-col items-center p-4 hover-lift"
          >
            <div 
              class="w-20 h-20 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-300"
              :class="index < 4 ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 bg-white'"
            >
              <span class="text-3xl">{{ step.icon }}</span>
            </div>
            <p class="text-sm font-semibold text-gray-900 leading-snug">{{ step.id }}. {{ step.title }}</p>
          </div>
        </div>
        
        <div class="mt-12">
          <button class="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
            Get started now
          </button>
          <a href="#" class="block mt-4 text-emerald-600 hover:text-emerald-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-2">
            LEARN MORE ABOUT ESCROW
          </a>
        </div>
      </section>

      <!-- Features Section -->
      <section class="mb-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            How Escrow works for your business
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Grow your business and revenue with secure payment solutions
          </p>
        </div>

        <div class="grid md:grid-cols-5 gap-6">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="bg-white rounded-xl border border-emerald-100 p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-emerald-500 cursor-pointer"
            tabindex="0"
          >
            <div class="text-3xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm">{{ feature.subtitle }}</p>
          </div>
        </div>
      </section>

      <!-- Supported Transactions Section -->
      <section class="mb-16 py-12">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Safely buy and sell products and services <br class="hidden sm:inline"> from $100 to $100 million or more
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <div 
            v-for="(item, index) in supportedTransactions" 
            :key="'txn-' + index"
            class="flex items-start p-6 bg-white rounded-xl border border-emerald-100 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-emerald-500 cursor-pointer"
            tabindex="0"
          >
            <div class="text-3xl text-emerald-600 mr-4 mt-1">{{ item.icon }}</div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ item.title }}</h3>
              <p class="text-gray-600 mb-3">{{ item.description }}</p>
              <a href="#" class="text-sm font-medium text-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1">
                LEARN MORE &rarr;
              </a>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <p class="text-gray-700 mb-4">
            Contact our friendly support team to find out if your transaction can be covered.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Get started now
            </button>
            <button class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              FEE CALCULATOR
            </button>
          </div>
        </div>

      </section>

      <!-- CTA Section -->
      <section class="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
        <div class="max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">
            Sell, buy or broker anything from domain names to vehicles
          </h2>
          <p class="text-xl mb-8 opacity-90">
            Start your secure transaction today with PRESCROW
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              Start A Transaction
            </button>
            <button class="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              Become a Partner
            </button>
          </div>
        </div>
      </section>
    </main>
</template>