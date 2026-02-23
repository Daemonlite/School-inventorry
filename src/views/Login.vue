<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL


const router = useRouter()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const errors = ref({})

// Validation
const validateForm = () => {
  errors.value = {}
  
  if (!email.value) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!password.value) {
    errors.value.password = 'Password is required'
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }
  
  return Object.keys(errors.value).length === 0
}

// Handle login
const handleLogin = async (e) => {
  e.preventDefault()
  
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    const response = await axios.post(`${baseUrl}/users/login`, {
      email: email.value,
      password: password.value
    })
    
    console.log(`Login response: ${JSON.stringify(response.data)}`)

    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      router.push("/")
      console.log("Login successful")
    }else {
      errors.value.submit = response.data.message
    }
    
  } catch (error) {
    errors.value.submit = error.response.data.message|| 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex">
    <div class="hidden lg:block lg:w-1/2 relative">
      <img 
        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80" 
        alt="Login background" 
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-emerald-900/40 flex items-center justify-center p-12">
        <div class="text-white">
          <h1 class="text-5xl font-bold mb-4">Track Your Stock Portfolio with StockFlow</h1>
          <p class="text-xl text-emerald-50">The best way to keep track of your stock portfolio.</p>
        </div>
      </div>
    </div>

    <main class="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 bg-gradient-to-b from-emerald-50 to-white lg:from-white lg:to-white">
      <div class="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p class="text-gray-600">
            Sign in to your StockFlow account
          </p>
        </div>

        <div class="space-y-6">
          <div 
            v-if="errors.submit" 
            class="p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-red-700">{{ errors.submit }}</span>
            </div>
          </div>

          <form @submit="handleLogin" class="space-y-5">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  :class="[
                    'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors',
                    errors.email ? 'border-red-300' : 'border-emerald-200'
                  ]"
                  placeholder="you@example.com"
                />
              </div>
              <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <div>
              
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :class="[
                    'w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-colors',
                    errors.password ? 'border-red-300' : 'border-emerald-200'
                  ]"
                  placeholder="Enter your password"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-emerald-600">
                  <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
              </div>
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
            </div>

            <div class="flex items-center">
              <input id="remember-me" v-model="rememberMe" type="checkbox" class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded" />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              :class="[
                'w-full flex justify-center py-3 px-4 border border-transparent rounded-lg font-medium text-white transition-all',
                isLoading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 shadow-sm'
              ]"
            >
              <span v-if="!isLoading">Sign In</span>
              <svg v-else class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </form>

          <div class="mt-8 pt-6 border-t border-gray-100 text-center">
            <p class="text-gray-600">
              Don't have an account?
              <router-link to="/signup" class="font-medium text-emerald-600 hover:text-emerald-700 ml-1">
                Sign up now
              </router-link>
            </p>
          </div>
        </div>

        <footer class="mt-auto pt-8 text-center text-gray-500 text-xs">
          <p>By signing in, you agree to our 
            <a href="#" class="text-emerald-600">Terms</a> and <a href="#" class="text-emerald-600">Privacy</a>
          </p>
          <p class="mt-2">© 2026 Prescrow.com</p>
        </footer>
      </div>
    </main>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(3600deg); }
}
</style>