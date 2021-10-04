<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="this.test"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <button @click="submit">Pay now!</button>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeCheckout,
  },
  data () {
    this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    return {
      test: 'pk_test_51JfOTNKqXtPaxbjm5VCMhW6jQ3CWic49obCswsSYWLT7sv9WzIZ0WhEnSEHvsTn8JLZwLnc3YdqgZsJCIn8TpRRs00JfFN4XaB',
      loading: false,
      lineItems: [
        {
          price: 'price_1JgaqyKqXtPaxbjm1G3A9SVI', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: "https://greenrepack-stripe.ultrahook.com",
      cancelURL: 'https://greenrepack-stripe.ultrahook.com',
    };
  },
  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
};
</script>