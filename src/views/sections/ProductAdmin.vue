<template>
  <div v-if="currentProduct" class="edit-form py-3">
    <v-carousel>
    <v-carousel-item
      v-for="(item,i) in colors"
      :key="i"
      :src="'https://test-green-repack-back.herokuapp.com/'+colors[i]"
      reverse-transition="fade-transition"
      transition="fade-transition"
      height="400"
      width="400"
    ></v-carousel-item>
  </v-carousel>
  <br/>
  <p class="headline">Détails du produit</p>
  <v-divider class="my-5"></v-divider>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentProduct.title"
        label="Title"
        requireds
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.brand"
        label="Marque"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.description"
        label="Description"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.features"
        label="Caracteristiques"
        required
      ></v-text-field>

      <v-select
          :items="productStates"
          label="État du produit"
          v-model="productStateId"
          required
          item-value="_id"
          item-text="name"
        >
          <template v-slot:item="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.name }}
          </template>
        </v-select>

        <v-select
          :items="categories"
          label="Catégorie du produit"
          v-model="categoryId"
          required
          item-value="_id"
          item-text="name"
        >
          <template v-slot:item="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.name }}
          </template>
        </v-select>

        <v-select
          :items="productModels"
          label="Modèle du produit"
          v-model="productModelId"
          required
          item-value="_id"
          item-text="name"
        >
          <template v-slot:item="{ item }">
            {{ item.name }}
          </template>
          <template v-slot:selection="{ item }">
            {{ item.name }}
          </template>
        </v-select>

        <v-select
          :items="warehouses"
          label="Sélectionnez l'entrepôt de stockage"
          v-model="warehouseId"
          required
          item-value="_id"
          item-text="name"
        >
          <template v-slot:item="{ item }">
            {{ item.addressNumber }} {{ item.addressRoad }} - {{ item.addressPostalCode }} {{ item.addressCity }}
          </template>
          <template v-slot:selection="{ item }">
             {{ item.addressNumber }} {{ item.addressRoad }} - {{ item.addressPostalCode }} {{ item.addressCity }}
          </template>
        </v-select>

      <!--label for="john">Produit reçu</label>
      <input type="checkbox" id="mike" value="Mike" >
      <br/>
      <label for="john">Produit verifié</label>
      <input type="checkbox" id="mike" value="Mike"-->

      <v-divider class="my-5"></v-divider>

        <v-col
            cols="12"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="received"
              label="Produit  reçu"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="verified"
              label="Produit verifié"
              hide-details
            ></v-checkbox>
          </v-col>

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" outlined small class="mr-2" @click="deleteProduct">
        Supprimer
      </v-btn>

      <v-btn color="warning" outlined small class="mr-2" @click="goBackToProducts">
        Annuler
      </v-btn>

       <v-btn color="success" v-if="received == true && verified == true" small class="mr-2" @click="setSellPrice(currentProduct._id)">
        Mettre en vente
      </v-btn>
    </v-form>
    <v-dialog v-model="showModal" persistent max-width="550px">
      
        <v-card>
          <v-row>
          <v-col cols="10">
              <v-card-title>Mise en vente du produit</v-card-title>
          </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-card-text>Prix du produit (sans marge) :</v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text>{{this.price}} €</v-card-text>
            </v-col>
          </v-row>
          

          <v-row>
            <v-col cols="8">
              <v-card-text>Indiquez la marge à appliquer :</v-card-text>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="Marge"
                value="30"
                suffix="%"
                type="number"
                v-model="marginProduct"
                @change="test()"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-card-text>Prix du produit (avec marge) :</v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text>{{this.priceWithMargin}} €</v-card-text>
            </v-col>
          </v-row>
          <!--v-card-text>Prix du produit (offre de vente) : {{this.marginProduct}} € </v-card-text>
          <v-card-text>Prix du produit avec marge (30% par défaut) : {{this.marginProduct}} € </v-card-text>
          <v-card-text>Indiquez la marge souhaitée : {{this.marginProduct}} % </v-card-text>
          <v-text-field
              v-model="marginProduct"
              hide-details
              single-line
              type="number"
            /-->
          <v-card-actions>
            <v-btn color="warning" text @click="cancel()"> Annuler </v-btn>
            <!--v-btn color="error" text @click="cancel()"> Refuser </v-btn-->
            <v-btn color="success" class="mr-4" text @click="updateProduct()"> Valider </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import ProductServices from '../../services/ProductServices.js';
import { AUTHGETTER, LOGINUSERFROMLOCALSTORAGE, USERLOGGEDINGETTER, SELLERID, USERPROFILE } from "@/store/constants";
import ProductModelServices from '../../services/ProductModelServices.js';
import ProductStateServices from '../../services/ProductStateServices.js';
import ProductCategoryService from '../../services/ProductCategoryService.js';
import WarehouseServices from '../../services/WarehouseServices.js';
import SellOfferServices from '../../services/SellOfferServices.js';

export default {
  name: "product",
  data() {
    return {
      currentProduct: null,
      message: "",
      colors: [],
      userType : null,
      category:null,

      categories: [],
      productStates: [],
      warehouses: [],
      productModels: [],

      warehouseId:null,
      categoryId:null,
      productStateId:null,
      productModelId:null,

      received:false,
      verified:null,
      productId: this.$route.params.id,

      images: null,


      showModal: false,
      marginProduct: 30,
      price: 0,
      priceWithMargin: 0,
    };
  },
  methods: {
    getProduct(id) {
      ProductServices.get(id)
        .then((response) => {
          this.currentProduct = response.data;
          this.colors = response.data.images;

          this.categoryId = response.data.categoryId;
          this.productStateId = response.data.productStateId;
          console.log("response.data.productStateId")
          console.log(response.data.productStateId)
          this.productModelId = response.data.productModelId;
          this.images = response.data.images;

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
      if (this.verified === "true" || this.received === "true") {
        this.verified = true;
        this.received = true;
      }
      var data = {
        images: this.images,
        description: this.currentProduct.description,
        brand: this.currentProduct.brand,
        features: this.currentProduct.features,
        sent: this.currentProduct.sent,
        received: this.received,
        verified: this.verified,
        sellPrice: this.priceWithMargin,
        productStateId: this.currentProduct.productStateId,
        sellerId: this.currentProduct.sellerId,
        categoryId: this.currentProduct.categoryId,
        productModelId: this.currentProduct.productModelId,
      };

      console.log(data)
      ProductServices.update(this.currentProduct._id, data)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/Products");
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

    getProductCategories() {
      ProductCategoryService.getAll()
        .then((response) => {
          this.categories = response.data;
          console.log(response)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getProductStates() {
      ProductStateServices.getAll()
        .then((response) => {
          this.productStates = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getWarehouses() {
      WarehouseServices.getAll()
        .then((response) => {
          this.warehouses = response.data;
           console.log("warehouses")
          console.log(response)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getProductModels() {
      ProductModelServices.getAll()
        .then((response) => {
          this.productModels = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    setSellPrice(productId) {
      console.log("productId")
      console.log(productId)
      this.showModal = true;
      // this.getSellOfferByProductId(productId);
      this.calculatePrice();
     
    },

    calculatePrice () {
      this.priceWithMargin = this.price + (this.price * this.marginProduct/100);
    },

    cancel() {
      this.showModal = false;
      //get one product with sellOfferId
      //set send true

    },

    getSellOfferByProductId(productId) {
      SellOfferServices.getSellOfferByProductId(productId)
        .then((response) => {
          console.log("sellOfferByPid")
          console.log(response.data.price)
          this.price = response.data.price;
          // this.productId = response.data._id;
          // TO DO remove if this.product.sent === true
        })
        .catch((e) => {
          console.log(e);
      });
    },
    test() {
      // this.marginProduct = newMargin;
      this.calculatePrice();
    }
  },
  mounted() {
    this.message = "";
    this.getProduct(this.$route.params.id);
    this.getProductCategories();
    this.productId = this.$route.params.id;
    this.getProductStates();
    this.getProductModels();
    this.getWarehouses();
    this.getSellOfferByProductId(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 500px;
  margin: auto;
}

div.row {
  margin:0px !important;
}
</style>