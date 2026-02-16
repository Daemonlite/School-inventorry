import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue'
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue"; 
import Inventory from "../views/Inventory.vue";
import Sales from "../views/Sales.vue";
import Categories from "../views/Categories.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },

  {
    path: "/",
    component: DefaultLayout,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
      if (!isAuthenticated) next('/login');
      else next();
    },
    children: [
      {
        path: "", 
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "/categories",
        name: "categories",
        component: Categories
      },
      {
        path: "/inventory",
        name: "inventory",
        component: Inventory
      },
      {
        path: "/sales",
        name: "sales",
        component: Sales
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router