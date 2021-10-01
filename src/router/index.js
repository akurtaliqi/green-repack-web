// Imports
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash };
    if (savedPosition) return savedPosition;

    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/home/Index.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("@/views/home/Index.vue")
        },
        {
          path: "about",
          name: "About",
          component: () => import("@/views/about/Index.vue"),
          meta: { src: require("@/assets/about.jpg") }
        },
        {
          path: "login",
          name: "Login",
          component: () => import("@/views/login/Index.vue"),
          meta: { access: "restricted" }
        },
        {
          path: "products",
          name: "Products",
          component: () => import("@/views/products/Index.vue"),
        },
        {
          path: "/products/:id",
          name: "product-details",
          component: () => import("@/views/sections/Product.vue"),
        },
        {
          path: "/admin/products/:id",
          name: "admin-product-details",
          component: () => import("@/views/sections/ProductAdmin.vue"),
          meta: { requiresAuth: true, access: 'admin' }
        },
        {
          path: "selloffers",
          name: "Mes offres de ventes",
          component: () => import("@/views/selloffers/Index.vue"),
          meta: { src: require("@/assets/about.jpg") },
          meta: { requiresAuth: true, access: 'seller' }
        },
        {
          path: "managelists",
          name: "Gestion des listes",
          component: () => import("@/views/management/Index.vue"),
          meta: { src: require("@/assets/about.jpg") },
          meta: { requiresAuth: true, access: "admin" }
        },
        {
          path: "manageselloffers",
          name: "Gestion produits",
          component: () => import("@/views/management/ManageProducts.vue"),
          meta: { src: require("@/assets/about.jpg") },
          meta: { requiresAuth: true, access: "admin" }
        },
        {
          path: "addproduct",
          name: "Vendre un produit",
          component: () => import("@/views/addproduct/Index.vue"),
          meta: { src: require("@/assets/about.jpg") },
          meta: { requiresAuth: true, access: "seller" }
        },
        {
          path: "admin",
          name: "Admin",
          component: () => import("@/views/admin/Index.vue")
        },
        {
          path: "*",
          name: "FourOhFour",
          component: () => import("@/views/404/Index.vue")
        }
      ]
    }
  ]
});
router.beforeResolve((to, from, next) => {
  if (to.meta.access) {
    if (to.meta.access === router.app.$store.getters["Auth/USERLOGGEDINTYPE"]) {
      next();
    } else {
      if (
        to.meta.access === "restricted" &&
        !router.app.$store.getters["Auth/AUTHGETTER"]
      ) {
        next();
      } else if (
        !router.app.$store.getters["Auth/AUTHGETTER"] &&
        to.meta.access !== "restricted"
      ) {
        next("/Login");
      } else if (
        router.app.$store.getters["Auth/AUTHGETTER"] &&
        to.meta.access === "restricted"
      ) {
        next("/");
      }
      else if (
        router.app.$store.getters["Auth/AUTHGETTER"] &&
        to.meta.access !== "admin"
      ) {
        next("*");
      }
      else if (
        router.app.$store.getters["Auth/AUTHGETTER"] &&
        to.meta.access !== "seller"
      ) {
        next("*");
      }
    }
  }
  next();
});
export default router;
