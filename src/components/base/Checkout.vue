<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <button @click="submit">Acheter</button>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import ProductServices from '../../services/ProductServices.js';
export default {
  components: {
    StripeCheckout,
  },
  data () {
    
    return {
      
      publishableKey :  process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY,
      loading: false,
      product: null,
      amount: null,
      images:[],
      lineItems: [
        {
          price: 'price_1JgaqyKqXtPaxbjm1G3A9SVI', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: "http://localhost:8081/checkoutsuccess",
      cancelURL: 'http://localhost:8081/products/'+this.$route.params.id,
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
    getProduct(id) {
      ProductServices.get(id)
        .then((response) => {
          this.product = response.data;
          this.images = response.data.images;
          this.amount = response.data.sellPrice;
          console.log(response.data.images)
          console.log(this.amount);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created(){
    this.publishableKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY
    console.log( process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
    this.getProduct(this.$route.params.id);
  },
  mount(){
    this.publishableKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY
    console.log( process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
    
    console.log(product)
  }

};
</script>