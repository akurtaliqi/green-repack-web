<template>
  <div v-if="currentProduct" class="edit-form py-3">
    <p class="headline">Détails du produit</p>

    <v-carousel>
    <v-carousel-item
      v-for="(item,i) in colors"
      :key="i"
      :src="'http://localhost:3000/'+colors[i]"
      reverse-transition="fade-transition"
      transition="fade-transition"
      height="400"
      width="400"
    ></v-carousel-item>
  </v-carousel>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentProduct.name"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.brand"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteProduct">
        Supprimer
      </v-btn>

      <v-btn color="success" small class="mr-2" @click="updateProduct">
        Modifier
      </v-btn>

      <v-btn color="warning" small class="mr-2" @click="goBackToProducts">
        Annuler
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import ProductServices from '../../services/ProductServices.js';
import { AUTHGETTER, LOGINUSERFROMLOCALSTORAGE, USERLOGGEDINGETTER, SELLERID, USERPROFILE } from "@/store/constants";

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      message: "",
      colors: [],
      userType : null,
    };
  },
  methods: {
    getProduct(id) {
      ProductServices.get(id)
        .then((response) => {
          this.currentProduct = response.data;
          this.colors = response.data.images;
          console.log(response.data.images)
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
  },
};
</script>

<style>
.edit-form {
  max-width: 500px;
  margin: auto;
}
</style>