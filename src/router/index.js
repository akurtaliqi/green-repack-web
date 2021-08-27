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
          meta: { src: require('@/assets/sink.jpg') },
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login/Index.vue'),
          meta: { src: require('@/assets/sink.jpg') },
        },
        {
          path: 'products',
          name: 'Products',
          component: () => import('@/views/products/Index.vue'),
          meta: { src: require('@/assets/gallery.jpg') },
        },
        {
          path: "/products/:id",
          name: "tutorial-details",
          component: () => import('@/views/sections/Product.vue'),
        },
        {
          path: "/sell-offers",
          name: "sell-offers",
          component: () => import('@/views/sell-offers/Index.vue'),
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
