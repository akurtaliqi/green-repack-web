<template>
  <div>
    it works
    
  </div>
</template>

<script>
import { LOGINBUYERACTION } from "@/store/constants";
import ProductServices from '../../services/ProductServices.js';
export default {
  name: "CheckOutSuccess",
  // Injected from the Vuetify Themeable mixin
  inject: ["theme"],

  data() {
    return {
      product:null,
      images: [],
      id:this.$route.params.id,
    };
  },
  async mounted() {
    this.message = "";
    await this.getProduct(this.$route.params.id);
    this.updateProduct();
  },
  methods : {
    // create order 
    // create green coin
    // set product sold true

    async getProduct(id) {
      console.log("ptn")
      this.product = (await axios.get(`https://test-green-repack-back.herokuapp.com/api/product/${id}`)).data;
    },

    /*getProduct(id) {
      this.showModal = true;
      console.log(id)

      ProductServices.get(id)
        .then((response) => {
          //TO DO do something after update¨
          this.product = response.data;
          this.images = response.data.images;
          console.log(response.data)        
        })
        .catch((e) => {
          console.log(e);
        });

    },*/

    updateProduct() {
      var data = {
        sold: true,
        images: this.images,
      };

      console.log("lààààààààààààààààààààà")
      console.log(this.product._id)


      ProductServices.update(this.product._id, data)
        .then((response) => {
          //TO DO do something after update
        })
        .catch((e) => {
          console.log(e);
        });

    },
    
  },

  

};
</script>
<style scoped>
</style>
