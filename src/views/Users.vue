<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const baseUrl = import.meta.env.VITE_API_BASE_URL
const token = localStorage.getItem('token')
const headers = { Authorization: `Bearer ${token}` }

const users = ref([])
const isLoading = ref(false)

// Modal States
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

// Form States
const currentUser = ref({ name: '', email: '', role: 'sales-person', password: '' })
const selectedUserId = ref(null)

const fetchUsers = async () => {
    isLoading.value = true
    try {
        const response = await axios.get(`${baseUrl}/users`, { headers });
        users.value = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        isLoading.value = false
    }
};

const handleCreate = async () => {
    try {
        await axios.post(`${baseUrl}/users/register`, currentUser.value, { headers });
        fetchUsers();
        closeModals();
    } catch (error) {
        alert('Error creating user');
    }
}

const handleUpdate = async () => {
    try {
        await axios.put(`${baseUrl}/users/${selectedUserId.value}`, currentUser.value, { headers });
        fetchUsers();
        closeModals();
    } catch (error) {
        alert('Error updating user');
    }
}

const handleDelete = async () => {
    try {
        await axios.delete(`${baseUrl}/users/${selectedUserId.value}`, { headers });
        fetchUsers();
        closeModals();
    } catch (error) {
        alert('Error deleting user');
    }
}

// UI Helpers
const openEdit = (user) => {
    selectedUserId.value = user._id;
    currentUser.value = { name: user.name, email: user.email, role: user.role };
    showEditModal.value = true;
}

const openDelete = (id) => {
    selectedUserId.value = id;
    showDeleteModal.value = true;
}

const closeModals = () => {
    showCreateModal.value = false;
    showEditModal.value = false;
    showDeleteModal.value = false;
    currentUser.value = { name: '', email: '', role: 'sales-person', password: '' };
}

onMounted(fetchUsers)
</script>

<template>
    <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
                <p class="text-sm text-gray-500">Manage system administrators and sales personnel.</p>
            </div>
            <button @click="showCreateModal = true" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition">
                <span class="mr-2">+</span> Create User
            </button>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead class="bg-gray-50 text-gray-600 text-xs uppercase font-semibold">
                    <tr>
                        <th class="px-6 py-4">Name</th>
                        <th class="px-6 py-4">Email</th>
                        <th class="px-6 py-4">Role</th>
                        <th class="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50 transition">
                        <td class="px-6 py-4 font-medium text-gray-800">{{ user.name }}</td>
                        <td class="px-6 py-4 text-gray-600">{{ user.email }}</td>
                        <td class="px-6 py-4">
                            <span :class="user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'" 
                                  class="px-2 py-1 rounded text-xs font-bold uppercase">
                                {{ user.role }}
                            </span>
                        </td>
                        <td class="px-6 py-4 text-right space-x-2">
                            <button @click="openEdit(user)" class="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                            <button @click="openDelete(user._id)" class="text-red-600 hover:text-red-800 font-medium">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
                <h2 class="text-xl font-bold mb-4">{{ showCreateModal ? 'Create New User' : 'Edit User' }}</h2>
                <form @submit.prevent="showCreateModal ? handleCreate() : handleUpdate()" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Full Name</label>
                        <input v-model="currentUser.name" type="text" class="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Email Address</label>
                        <input v-model="currentUser.email" type="email" class="w-full border rounded-lg p-2 mt-1 outline-none" required />
                    </div>
                    <div v-if="showCreateModal">
                        <label class="block text-sm font-medium text-gray-700">Password</label>
                        <input v-model="currentUser.password" type="password" class="w-full border rounded-lg p-2 mt-1 outline-none" required />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Role</label>
                        <select v-model="currentUser.role" class="w-full border rounded-lg p-2 mt-1 outline-none">
                            <option value="sales-person">Sales Person</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" @click="closeModals" class="text-gray-500 px-4 py-2 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                            {{ showCreateModal ? 'Save User' : 'Update' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl p-8 w-full max-w-sm text-center shadow-2xl">
                <div class="text-red-500 text-4xl mb-4">⚠️</div>
                <h2 class="text-xl font-bold mb-2">Delete User?</h2>
                <p class="text-gray-500 mb-6">This action cannot be undone. Are you sure you want to proceed?</p>
                <div class="flex justify-center space-x-4">
                    <button @click="closeModals" class="bg-gray-100 px-4 py-2 rounded-lg">Cancel</button>
                    <button @click="handleDelete" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Confirm Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>