<template>
  <v-theme-provider dark>
    <base-section
      id="check-out-sucess"
    >
    it works
    </base-section>
  </v-theme-provider>
</template>

<script>
import ProductServices from '../../services/ProductServices.js';
import OrderServices from '../../services/OrderServices.js';
import GreenCoinServices from '../../services/GreenCoinServices.js';
import axios from 'axios';
  export default {
    name: 'Login',
    data() {
    return {
      product:null,
      images: [],
      id:this.$route.params.id,
      amount: 0,
    };
  },
  async mounted() {
    this.message = "";
    await this.getProduct(this.$route.params.id);
    this.updateProduct();
    this.createOrder();
    this.createGreenCoins();
  },
  methods : {
    // create order 
    // create green coin
    // set product sold true

    async getProduct(id) {
      console.log("ptn")
      this.product = (await axios.get(`https://test-green-repack-back.herokuapp.com/api/product/${id}`)).data;
      this.images = this.product.images;
      console.log(this.images)
    },
    updateProduct() {
      var data = {
        sold: true,
        images: this.images,
      };

      console.log("this.images")
      console.log(this.images)
      ProductServices.update(this.product._id, data)
        .then((response) => {
          //TO DO do something after update
        })
        .catch((e) => {
          console.log(e);
        });
    },
    
    createOrder() {
      var data = {
        buyerId: localStorage.buyerId,
        productId: this.product._id,
        price: this.product.sellPrice,
      };

      console.log("create order")
      console.log(data)
      OrderServices.create(data)
        .then((response) => {
          //TO DO do something after update
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /*createGreenCoins () {
      var data = {
        buyerId: localStorage.buyerId,
        amount: this.product.greencoinsvalue,
      };

      console.log("create green coins")
      console.log(data)
      GreenCoinServices.create(data)
        .then((response) => {
          //TO DO do something after update
        })
        .catch((e) => {
          console.log(e);
        });
    },*/
  },

  

};
</script>
<style scoped>
</style>
