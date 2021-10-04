<template>
  <div v-if="currentProduct" class="edit-form py-3">
    <!--div class="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
        />
        <div class="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form action="http://localhost:3000/create-checkout-session" method="test">
        <button type="submit" id="checkout-button">Checkout</button>
      </form-->

      <base-checkout/>



    <p class="headline">Détails du produit</p>

    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in images"
        :key="i"
        :src="'http://localhost:3000/'+images[i]"
        reverse-transition="fade-transition"
        transition="fade-transition"
        height="400"
        max-width="500"
      ></v-carousel-item>
    </v-carousel>
    <v-card
      class="mx-auto"
      max-width="500"
      tile
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Marque</v-list-item-title>
          <v-list-item-subtitle>{{currentProduct.brand}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Caractéristiques</v-list-item-title>
          <v-list-item-subtitle>{{currentProduct.features}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title>Caractéristiques</v-list-item-title>
          <v-list-item-subtitle>{{this.sellOffer}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


      <v-divider class="my-6" />

      <v-card-actions
      class="text-center"
      >
        <v-btn 
          text 
          outlined
          color="primary accent-2"
          plain
          elevation="2"
          @click="goBackToProducts"
          v-if="userProfile === 'buyer'"
        >
          Retour
        </v-btn>
      </v-card-actions>
    </v-card>
    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import ProductServices from '../../services/ProductServices.js';
import SellOfferServices from '../../services/SellOfferServices.js';
import StripeCheckout from "../../components/base/Checkout.vue";
export default {
  components: {
    StripeCheckout,
  },
  name: "product",
  data() {
    return {
      currentProduct: null,
      sellOffer:null,
      message: "",
      images: [],
      userProfile: null,
    };
  },
  methods: {
    getProduct(id) {
      ProductServices.get(id)
        .then((response) => {
          this.currentProduct = response.data;
          this.images = response.data.images;
          console.log(response.data.images)
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getSellOffer(id) {
      SellOfferServices.get(id)
        .then((response) => {
          this.sellOffer = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentProduct.id,
        name: this.currentProduct.name,
        description: this.currentProduct.description,
        published: status,
      };

      ProductServices.update(this.currentProduct.id, data)
        .then((response) => {
          this.currentProduct.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateProduct() {
      ProductServices.update(this.currentProduct.id, this.currentProduct)
        .then((response) => {
          console.log(response.data);
          this.message = "The product was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteProduct() {
      ProductServices.delete(this.currentProduct.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "products" });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    goBackToProducts() {
      this.$router.push("/Products");
    },
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
    
    // this.getSellOffer(this.$route.params.id);
    this.userProfile = localStorage.userType;
    console.log(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 500px;
  margin: auto;
}
</style>