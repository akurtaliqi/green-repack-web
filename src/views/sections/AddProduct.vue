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

        <v-file-input v-model="images" multiple show-size label="Image(s)"></v-file-input>
        <v-divider class="my-6" />
        
        <!--p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p-->

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="addProduct()">
          Validate
        </v-btn>
        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </v-form>
       <v-dialog v-model="showModal" max-width="500px">
        <v-card>
          <v-card-title>Offre d'achat</v-card-title>
          <v-card-text>L'offre d'achat pour votre produit s'élève à</v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="showModal = false"> Close </v-btn>
            <v-btn color="primary" text @click="acceptSellOffer()"> Accept </v-btn>
             <v-btn color="primary" text @click="refuseSellOffer()"> Decline </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </base-section>
</template>

<script>
import ProductCategoryServices from "../../services/ProductCategoryService.js";
import ProductStateServices from "../../services/ProductStateServices.js";
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
       if (this.title && this.description && this.brand && this.features ) {
        console.log('plop')
      } else {
        console.log('ploup')
      }
      this.showModal = true;
      this.sellerId = JSON.parse(localStorage.getItem("sellerId"));
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
      this.images.map((file, index) => {
        fd.append('images${index}', file);
      });
      this.$store.dispatch(CREATE_PRODUCT_ACTION, fd).then((res) => {
        if (res) {
          // TODO change reset
          this.reset();
          console.log('hello there' + res)
        }
      });
    },
    acceptSellOffer() {
      
    },
    refuseSellOffer() {
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