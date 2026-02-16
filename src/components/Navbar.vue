<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isMobileMenuOpen = ref(false)
const headerBg = ref('bg-emerald-50')
const isLoading = ref(false)
const formErrors = ref({})

// Form validation state
const itemDescription = ref('')

const i18n = {
  en: {
    title: 'Never buy or sell online without using PRESCROW',
    subtitle: 'With PRESCROW you can buy and sell anything safely without the risk of chargebacks. Truly secure payments.',
    // Add more translations as needed
  }
}

// Dropdown content
const dropdownContent = {
  consumers: {
    title: 'For Consumers',
    description: 'Secure online transactions for personal purchases',
    items: [
      { title: 'Buy Safely', icon: '🛒', description: 'Purchase with confidence' },
      { title: 'Sell Securely', icon: '💰', description: 'Get paid without risk' },
      { title: 'How It Works', icon: '🔍', description: 'Learn the process' },
      { title: 'Pricing', icon: '📊', description: 'See our fees' }
    ]
  },
  broker: {
    title: 'For Brokers',
    description: 'Tools for professional brokers and intermediaries',
    items: [
      { title: 'Broker Platform', icon: '🏢', description: 'Manage multiple transactions' },
      { title: 'Commission Tools', icon: '📈', description: 'Track your earnings' },
      { title: 'Client Management', icon: '👥', description: 'Manage your clients' },
      { title: 'API Access', icon: '⚡', description: 'Integrate with your systems' }
    ]
  },
  developer: {
    title: 'For Developers',
    description: 'APIs and developer tools',
    items: [
      { title: 'API Documentation', icon: '📚', description: 'Complete API reference' },
      { title: 'SDKs', icon: '🛠️', description: 'Client libraries' },
      { title: 'Sandbox', icon: '🧪', description: 'Test environment' },
      { title: 'Support', icon: '💬', description: 'Developer support' }
    ]
  },
  help: {
    title: 'Help',
    description: 'Get help with your transactions',
    items: [
      { title: 'Help Center', icon: '❓', description: 'Find answers' },
      { title: 'Contact Support', icon: '📞', description: 'Get in touch' },
      { title: 'FAQ', icon: '📋', description: 'Common questions' },
      { title: 'Community', icon: '👥', description: 'Join discussions' }
    ]
  }
}

// Dropdown states
const activeDropdown = ref(null)
const openDropdowns = ref({
  consumers: false,
  broker: false,
  business: false,
  developer: false,
  help: false
})

// Toggle dropdown with accessibility
const toggleDropdown = (dropdown) => {
  Object.keys(openDropdowns.value).forEach(key => {
    if (key !== dropdown) {
      openDropdowns.value[key] = false
    }
  })
  openDropdowns.value[dropdown] = !openDropdowns.value[dropdown]
  activeDropdown.value = openDropdowns.value[dropdown] ? dropdown : null
}


// Close all dropdowns
const closeAllDropdowns = () => {
  Object.keys(openDropdowns.value).forEach(key => {
    openDropdowns.value[key] = false
  })
  activeDropdown.value = null
}

// Keyboard navigation support
const handleKeydown = (event, dropdown) => {
  if (event.key === 'Escape') {
    closeAllDropdowns()
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggleDropdown(dropdown)
  }
}
</script>


<template>
    <!-- SEO Meta Tags (would be in parent component or index.html) -->
    <!-- 
      <title>PRESCROW - Secure Online Transactions & Escrow Services</title>
      <meta name="description" content="Secure online transactions with PRESCROW. Buy and sell safely without risk of chargebacks. Over $7.5 billion protected.">
      <meta name="keywords" content="escrow, secure payments, online transactions, safe buying, safe selling">
    -->

       <nav 
      class="sticky top-0 transition-all duration-300 relative z-50"
      :class="headerBg"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <div class="text-2xl font-bold text-emerald-600">PRESCROW</div>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <div 
              v-for="(content, key) in dropdownContent" 
              :key="key"
              class="relative"
            >
              <button
                @click.stop="toggleDropdown(key)"
                @keydown="(e) => handleKeydown(e, key)"
                :aria-expanded="openDropdowns[key]"
                :aria-controls="`dropdown-${key}`"
                class="px-4 py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors rounded-lg hover:bg-emerald-50 flex items-center space-x-1"
                :class="{ 'text-emerald-600 bg-emerald-50': openDropdowns[key] }"
              >
                <span>{{ content.title.split(' ')[1] || content.title }}</span>
                <svg 
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openDropdowns[key] }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                v-if="openDropdowns[key]"
                :id="`dropdown-${key}`"
                role="menu"
                class="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-emerald-100 overflow-hidden"
                @click.stop
              >
                <div class="p-4 bg-emerald-50 border-b border-emerald-100">
                  <h3 class="font-semibold text-emerald-800">{{ content.title }}</h3>
                  <p class="text-sm text-emerald-600 mt-1">{{ content.description }}</p>
                </div>
                <div class="p-4">
                  <div 
                    v-for="(item, index) in content.items" 
                    :key="index"
                    role="menuitem"
                    tabindex="0"
                    @click="closeAllDropdowns"
                    @keydown.enter="closeAllDropdowns"
                    class="flex items-start p-3 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 group"
                  >
                    <span class="text-xl mr-3 mt-1 group-hover:scale-110 transition-transform">{{ item.icon }}</span>
                    <div>
                      <div class="font-medium text-gray-900 group-hover:text-emerald-700">{{ item.title }}</div>
                      <div class="text-sm text-gray-600 mt-1">{{ item.description }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Auth Buttons -->
          <div class="hidden md:flex items-center space-x-4">
            <button 
              @click="$router.push('/login')"
              class="text-emerald-600 hover:text-emerald-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-2 py-1 cursor-pointer"
            >
              Login
            </button>
            <button 
              @click="$router.push('/signup')"
              class="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 cursor-pointer"
            >
              Sign up
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click.stop="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden text-gray-700 hover:text-emerald-600 p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
            :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMobileMenuOpen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                v-if="!isMobileMenuOpen" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path 
                v-else 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-emerald-100 shadow-lg mobile-menu-enter-active mobile-menu-leave-active"
          @click.stop
        >
          <div class="px-4 py-3 space-y-2">
            <!-- Mobile Dropdowns -->
            <div 
              v-for="(content, key) in dropdownContent" 
              :key="key"
              class="border-b border-emerald-50 last:border-0"
            >
              <button
                @click="toggleDropdown(key)"
                @keydown="(e) => handleKeydown(e, key)"
                :aria-expanded="openDropdowns[key]"
                class="w-full flex items-center justify-between py-3 text-gray-700 hover:text-emerald-600 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg px-2"
              >
                <span>{{ content.title.split(' ')[1] || content.title }}</span>
                <svg 
                  class="w-4 h-4 transition-transform duration-200"
                  :class="{ 'rotate-180': openDropdowns[key] }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                v-if="openDropdowns[key]"
                class="pl-4 pb-3 space-y-2"
              >
                <div 
                  v-for="(item, index) in content.items" 
                  :key="index"
                  role="menuitem"
                  tabindex="0"
                  @click="closeMobileMenu"
                  @keydown.enter="closeMobileMenu"
                  class="flex items-center p-2 rounded-lg hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <span class="text-lg mr-2">{{ item.icon }}</span>
                  <div>
                    <div class="font-medium text-gray-900">{{ item.title }}</div>
                    <div class="text-sm text-gray-600">{{ item.description }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Auth Buttons -->
            <div class="pt-4 border-t border-emerald-100">
              <div class="flex flex-col space-y-3">
                <button 
                  @click="closeMobileMenu"
                  class="w-full text-emerald-600 hover:text-emerald-700 font-medium py-3 text-center rounded-lg hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  Login
                </button>
                <button 
                  @click="closeMobileMenu"
                  class="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>