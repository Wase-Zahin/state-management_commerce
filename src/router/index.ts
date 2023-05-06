import Cart from '@/components/Cart.vue';
import Search from '@/components/Search.vue';
import Shop from '@/components/Shop.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Home.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/product:id',
      name: 'product',
      component: ProductDetails,
    }
  ]
})

export default router
