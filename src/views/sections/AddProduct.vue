<template>
  <base-section id="add-product">
    <base-section-heading icon="mdi-vuetify" title="Vendre un produit" />

    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation enctype="multipart/form-data">
        <v-text-field
          v-model="title"
          :rules="inputBasicRule"
          label="Titre"
          required
        ></v-text-field>

        <v-text-field
          v-model="description"
          label="Description"
          :rules="inputBasicRule"
          required
        ></v-text-field>

        <v-text-field
          v-model="brand"
          label="Marque"
          :rules="inputBasicRule"
          required
        ></v-text-field>

        <v-text-field
          v-model="features"
          label="Caractéristiques"
          :rules="inputBasicRule"
          required
        ></v-text-field>

        <v-select
          :items="productStates"
          label="État du produit"
          v-model="productStateId"
          :rules="inputBasicRule"
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
          label="Choisissez une catégorie"
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

        <v-file-input type="file" ref="files" v-model="images" multiple show-size label="Image(s)"></v-file-input>
        <v-divider class="my-6" />
        <v-alert
          dense
          outlined
          type="error"
          v-if="error"
        >
          Veuillez remplir tous les champs
        </v-alert>
        <v-alert
          dense
          outlined
          type="error"
          v-if="errorRequest"
        >
          Erreur de requête HTTP.
        </v-alert>
        <v-btn color="warning" class="mr-4" outlined @click="reset"> Reset </v-btn>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="getProductModelId()">
          Valider
        </v-btn>
      </v-form>
       <v-dialog v-model="showModal" max-width="500px">
        <v-card>
          <v-card-title>Offre d'achat</v-card-title>
          <v-card-text>L'offre d'achat pour votre produit s'élève à {{this.sellOfferPrice}} € </v-card-text>
          <v-card-actions>
            <v-btn color="warning" text @click="cancelCreation()"> Annuler </v-btn>
            <v-btn color="error" text @click="declineSellOffer()"> Refuser </v-btn>
            <v-btn color="success" class="mr-4" text @click="acceptSellOffer()"> Accepter </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </base-section>
</template>

<script>
import ProductCategoryServices from "../../services/ProductCategoryService.js";
import SellOfferServices from "../../services/SellOfferServices.js";
import ProductStateServices from "../../services/ProductStateServices.js";
import ProductModelServices from "../../services/ProductModelServices.js";
import ProductServices from "../../services/ProductServices.js";
import { CREATE_PRODUCT_ACTION } from "@/store/constants";
import { AUTHGETTER, LOGINUSERFROMLOCALSTORAGE, USERLOGGEDINGETTER, SELLERID, USERPROFILE } from "@/store/constants";
import { mapGetters } from "vuex";
import image from "@/assets/article-1.jpg";
export default {
  name: "SectionAddProduct",
  data() {
    return {
      inputBasicRule: [
        (v) => !!v || "Required",
        // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      valid: false,
      title: "",
      description: "",
      brand: "",
      features: "",
      state: "",
      sellerId: null,
      categoryId: null,
      productStateId: null,
      productStates: [],
      categories: [],
      images: null,
      showModal: false,
      newProductId: null,
      userProfile: null,
      error: false,
      errorRequest: false,
      productId: null,
      sellOfferPrice: null,
      productModelId: null,
      sellOfferId: null,
    };
  },
  methods: {
    retrieveProductCategories() {
      ProductCategoryServices.getAll()
        .then((response) => {
          this.categories = response.data;
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveProductStates() {
      ProductStateServices.getAll()
        .then((response) => {
          this.productStates = response.data;
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    LoginFromCache() {
      this.$store.dispatch(
        `Auth/${LOGINUSERFROMLOCALSTORAGE}`,
        // JSON.parse(localStorage.getItem("sellerId")),
        console.log('here'),
        console.log(JSON.parse(localStorage.getItem("sellerId"))),
        console.log(JSON.parse(localStorage.getItem("userProfile"))),
        this.sellerId = JSON.parse(localStorage.getItem("sellerId")),
      );
    },
    addProduct() {
        // this.getProductModelId("614490bc9544432934a815c8");
       if (this.title && this.description && this.brand && this.features && this.categoryId && this.productStateId) {
        this.error = false;
        this.categoryId = "614490bc9544432934a815c8";
        console.log("product model id" + this.productModelId);
        this.sellerId = JSON.parse(localStorage.getItem("sellerId"));
        var test = this.productModelId;
        var data = [
          "title",
          "description",
          "brand",
          "features",
          "productStateId",
          "sellerId",
          "categoryId",
          "images",
        ];
        let fd = new FormData();
        data.map((item) => {
          fd.append(item, this[item]);
        });
        fd.append("productModelId", this.productModelId)
        this.images.map((file, index) => {
          fd.append('images${index}', file);
        });
        this.$store.dispatch(CREATE_PRODUCT_ACTION, fd).then((res) => {
          if (res) {
            // TODO change reset
            // this.reset();
            this.showModal = true;
            this.productId = res;
            this.createSellOffer(this.productId, this.sellOfferPrice);
            console.log('id du produit créée : ' + res)
          } else {
            console.log('error request')
            this.errorRequest = true;
          }
        });
      } else {
        this.error = true;
      }
      
    },
    getProductModelId() {
      if (this.title && this.description && this.brand && this.features && this.categoryId && this.productStateId) {
        // const categoryId = "614490bc9544432934a815c8";
        ProductModelServices.getProductModelByCategory("614490bc9544432934a815c8")
          .then((response) => {
            console.log("je suis là ");
            console.log(response);
            this.productModelId = response.data._id;
            this.sellOfferPrice = response.data.price;
            this.calculateSellOfferPrice(this.productStateId, this.sellOfferPrice);
            console.log("offre d'achat après calcul")
            console.log(this.sellOfferPrice)
            console.log(this.productModelId);
            this.addProduct();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.error = true;
      }
    },
    calculateSellOfferPrice(productStateId, sellOfferPrice) {
      ProductStateServices.get(productStateId)
        .then((response) => {
          this.sellOfferPrice = this.sellOfferPrice - (this.sellOfferPrice*response.data.decrease)
        })
        .catch((e) => {
          console.log(e);
        });

    },
    createSellOffer(productId, sellOfferPrice) {
      console.log("seller id dans create sell offfer")
      console.log(this.sellerId)
      var data = {
        productId: productId,
        sellOfferPrice: sellOfferPrice,
        sellerId: JSON.parse(localStorage.getItem("sellerId")),
      };
      console.log(data)
      console.log('in create sell offer')
      SellOfferServices.createSellOffer(data)
        .then((response) => {
          // this.sellOfferId = response.data;
          // get one sell offer id with response.data
          // set sell offer accept true or false with user choice
          console.log(response.data);
          console.log("HEEEEEEEEHOOOOOOOOOOOOOOOOOOOOOOOO");
          console.log(response.data._id);
          this.sellOfferId = response.data._id;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    cancelCreation() {
      console.log(this.productId)
      console.log(this.sellOfferId)
      // get product with id and delete
      // get sell offer with id and delete 
    },
    acceptSellOffer(sellOfferId) {
      // get sell offer with id 
      // this.sellOfferAccept = true
    },
    declineSellOffer() {
      this.$router.push("/selloffers");
    },
  },
  
  mounted() {
    this.retrieveProductCategories();
    this.retrieveProductStates();
    this.LoginFromCache();
    console.log(this.sellerId);
    console.log(this.userProfile);
  },
  computed: {
    ...mapGetters("Auth", [AUTHGETTER, SELLERID, USERPROFILE]),
  },
};
</script>

<style lang="sass"></style>