import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue'
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Dashboard from "../views/Dashboard.vue"; 
import Inventory from "../views/Inventory.vue";
import Sales from "../views/Sales.vue";
import Categories from "../views/Categories.vue";
import NotFound from "../views/NotFound.vue";

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
      const isAuthenticated = !!(localStorage.getItem('token'));
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
      },
      // {
      //   path: "/:catchAll(.*)",
      //   component: NotFound
      // }

    ]
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.name === 'login' && isAuthenticated) next({ name: 'dashboard' });
  else if (to.name === 'signup' && isAuthenticated) next({ name: 'dashboard' });
  else next();
});

export default router