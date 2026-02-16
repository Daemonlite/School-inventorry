<script setup>

import { ref } from 'vue'



// Email subscription
const email = ref('')
const isSubmitting = ref(false)
const subscriptionSuccess = ref(false)

const subscribeToReport = async (e) => {
  e.preventDefault()
  
  if (!email.value || !email.value.includes('@')) {
    alert('Please enter a valid email address')
    return
  }
  
  isSubmitting.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    subscriptionSuccess.value = true
    email.value = ''
    
    setTimeout(() => {
      subscriptionSuccess.value = false
    }, 3000)
    
  } catch (error) {
    console.error('Subscription error:', error)
    alert('Failed to subscribe. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}

</script>


<template>
  <!-- Newsletter Subscription -->
  <div class="mt-16 pt-8 border-t border-emerald-100 text-center mb-10">
    <p class="text-lg font-medium text-gray-800 mb-4">
      Get a free copy of our latest domain market report
    </p>

    <div
      v-if="subscriptionSuccess"
      class="mb-4 p-4 bg-emerald-100 text-emerald-700 rounded-lg"
    >
      Thank you for subscribing! Check your email for the report.
    </div>

    <form
      @submit="subscribeToReport"
      class="flex flex-col sm:flex-row justify-center gap-3 max-w-lg mx-auto"
    >
      <input
        v-model="email"
        type="email"
        placeholder="EMAIL ADDRESS"
        required
        class="flex-grow px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors"
        :disabled="isSubmitting"
      />
      <button
        type="submit"
        :disabled="isSubmitting"
        class="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <span v-if="!isSubmitting">Get Report</span>
        <span v-else>Sending...</span>
      </button>
    </form>
  </div>
  <!-- Footer -->
  <footer class="bg-emerald-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <div class="text-2xl font-bold mb-4">PRESCROW</div>
          <p class="text-emerald-300">
            Secure online payments and transactions for businesses and
            consumers.
          </p>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">Products</h4>
          <ul class="space-y-2 text-emerald-300">
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Escrow Pay</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Escrow Offer</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Escrow Buttons</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Escrow API</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">Resources</h4>
          <ul class="space-y-2 text-emerald-300">
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Learn More</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Help Center</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Documentation</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">Company</h4>
          <ul class="space-y-2 text-emerald-300">
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Careers</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Press</a
              >
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-1"
                >Blog</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div
        class="border-t border-emerald-800 mt-8 pt-8 text-center text-emerald-400 text-sm"
      >
        © 2024 PRESCROW. All rights reserved.
      </div>
    </div>
  </footer>
</template>
