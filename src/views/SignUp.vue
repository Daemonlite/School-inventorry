<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";


const baseUrl = import.meta.env.VITE_API_BASE_URL

const router = useRouter();

// Form state
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref("");
const confirmPassword = ref("");
const acceptTerms = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const errors = ref({});
const successMessage = ref("");

// Password strength checker
const passwordStrength = ref({
  score: 0,
  feedback: "",
  color: "bg-gray-200",
});

const checkPasswordStrength = (password) => {
  let score = 0;
  const feedback = [];

  if (password.length >= 8) score += 1;
  else feedback.push("At least 8 characters");

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("One uppercase letter");

  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("One lowercase letter");

  if (/\d/.test(password)) score += 1;
  else feedback.push("One number");

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push("One special character");

  let color = "bg-gray-200";
  if (score >= 4) color = "bg-emerald-500";
  else if (score >= 3) color = "bg-yellow-500";
  else if (score >= 1) color = "bg-red-500";

  return {
    score,
    feedback:
      feedback.length > 0
        ? `Add ${feedback.slice(0, 2).join(", ")}`
        : "Strong password",
    color,
  };
};

const roles = ref([
  { name: "Admin", value: "admin" },
  { name: "Sales Person", value: "sales-person" },
]);

const updatePasswordStrength = () => {
  if (password.value) {
    passwordStrength.value = checkPasswordStrength(password.value);
  } else {
    passwordStrength.value = { score: 0, feedback: "", color: "bg-gray-200" };
  }
};

const validateForm = () => {
  errors.value = {};
  if (!email.value) errors.value.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email.value))
    errors.value.email = "Please enter a valid email address";

  if (!password.value) errors.value.password = "Password is required";
  else if (password.value.length < 8)
    errors.value.password = "Password must be at least 8 characters";

  if (!confirmPassword.value)
    errors.value.confirmPassword = "Please confirm your password";
  else if (password.value !== confirmPassword.value)
    errors.value.confirmPassword = "Passwords do not match";


  return Object.keys(errors.value).length === 0;
};

const handleSignup = async () => {
  successMessage.value = "";
  if (!validateForm()) return;
  isLoading.value = true;

  try {
    const response = await axios.post(`${baseUrl}/users/register`, {
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value,
    });

    console.log(`Signup response: ${JSON.stringify(response.data)}`);

    if (response.data.success) {
      successMessage.value = response.data.message;
       router.push("/login");
    } else {
      errors.value.submit = response.data.message;
    }
  } catch (error) {
    errors.value.submit = error.response.data.message || "Signup failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<template>
  <div class="min-h-screen bg-white flex">
    <div class="hidden lg:block lg:w-1/2 relative">
      <img
        src="https://images.unsplash.com/photo-1648824572347-517357c9c44e?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Signup background"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div
        class="absolute inset-0 bg-emerald-900/60 flex items-center justify-center p-12"
      >
        <div class="text-white max-w-md">
          <h1 class="text-5xl font-bold mb-6">
            Start Trading with Confidence.
          </h1>
          <p class="text-xl text-emerald-50 leading-relaxed">
            Create an account today and experience the most secure way to handle
            online transactions. Our escrow service protects both buyers and
            sellers.
          </p>
          <div class="mt-12 space-y-4">
            <div class="flex items-center space-x-3">
              <div class="bg-emerald-500 p-1 rounded-full">
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  />
                </svg>
              </div>
              <span class="text-emerald-50"
                >Zero upfront fees for account creation</span
              >
            </div>
            <div class="flex items-center space-x-3">
              <div class="bg-emerald-500 p-1 rounded-full">
                <svg
                  class="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  />
                </svg>
              </div>
              <span class="text-emerald-50"
                >256-bit SSL encrypted security</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <main
      class="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-20 py-12 bg-white overflow-y-auto"
    >
      <div class="max-w-md w-full mx-auto">
        <div
          v-if="successMessage"
          class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center text-emerald-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ successMessage }}
        </div>

        <div
          v-if="errors.submit"
          class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ errors.submit }}
        </div>

        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
          <p class="text-gray-600 mt-2">
            Join Prescrow and start transacting safely.
          </p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Name</label
            >
            <input
              v-model="name"
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all',
                errors.name ? 'border-red-300' : 'border-gray-200',
              ]"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-600">
              {{ errors.name }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Email Address</label
            >
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all',
                errors.email ? 'border-red-300' : 'border-gray-200',
              ]"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>

            <select
              v-model="role"
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all',
                errors.role ? 'border-red-300' : 'border-gray-200',
              ]"
            >
              <option
                v-for="roleItem in roles"
                :key="roleItem.value"
                :value="roleItem.value"
              >
                {{ roleItem.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Password</label
            >
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                @input="updatePasswordStrength"
                placeholder="••••••••"
                :class="[
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all',
                  errors.password ? 'border-red-300' : 'border-gray-200',
                ]"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-3 text-gray-400"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="!showPassword"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    stroke-width="2"
                  />
                  <path
                    v-if="!showPassword"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    stroke-width="2"
                  />
                </svg>
              </button>
            </div>
            <div v-if="password" class="mt-3">
              <div
                class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden"
              >
                <div
                  :class="[
                    'h-full transition-all duration-500',
                    passwordStrength.color,
                  ]"
                  :style="{ width: `${(passwordStrength.score / 5) * 100}%` }"
                ></div>
              </div>
              <p
                class="text-[10px] mt-1 text-gray-500 uppercase font-bold tracking-wider"
              >
                {{ passwordStrength.feedback }}
              </p>
            </div>
            <p v-if="errors.password" class="mt-1 text-xs text-red-600">
              {{ errors.password }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Confirm Password</label
            >
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••"
              :class="[
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all',
                errors.confirmPassword ? 'border-red-300' : 'border-gray-200',
              ]"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-xs text-red-600">
              {{ errors.confirmPassword }}
            </p>
          </div>
          

          <button
            type="submit"
            :disabled="isLoading"
            :class="[
              'w-full py-3 rounded-lg font-bold text-white transition-all shadow-md cursor-pointer',
              isLoading
                ? 'bg-emerald-300 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg',
            ]"
          >
            {{ isLoading ? "Creating Account..." : "Create Free Account" }}
          </button>
        </form>

        <p class="mt-8 text-center text-gray-600">
          Already have an account?
          <button
            @click="goToLogin"
            class="text-emerald-600 font-bold hover:underline"
          >
            Sign in
          </button>
        </p>

      </div>
    </main>
  </div>
</template>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
