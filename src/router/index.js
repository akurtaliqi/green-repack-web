// Imports
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/home/Index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/Index.vue'),
        },
        {
          path: 'about',
          name: 'About',
          component: () => import('@/views/about/Index.vue'),
          meta: { src: require('@/assets/about.jpg') },
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login/Index.vue'),
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login/Index.vue'),
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/products/Index.vue'),
        },
        {
          path: "/products/:id",
          name: "product-details",
          component: () => import('@/views/sections/Product.vue'),
        },
        {
          path: "selloffers",
          name: "Mes offres de ventes",
          component: () => import('@/views/selloffers/Index.vue'),
          meta: { src: require('@/assets/about.jpg') },
        },
        {
          path: '*',
          name: 'FourOhFour',
          component: () => import('@/views/404/Index.vue'),
        }
      ],
    },

  ],
})

export default router
