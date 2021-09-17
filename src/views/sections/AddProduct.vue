<template>
  <base-section id="add-product">
    <base-section-heading icon="mdi-vuetify" title="Vendre un produit" />

    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation enctype="multipart/form-data">
        <v-text-field
          v-model="title"
          label="Titre"
          required
        ></v-text-field>

        <v-text-field
          v-model="description"
          label="Description"
          required
        ></v-text-field>

        <v-text-field
          v-model="brand"
          label="Marque"
          required
        ></v-text-field>

        <v-text-field
          v-model="features"
          label="Caractéristiques"
          required
        ></v-text-field>

        <v-text-field v-model="state" label="État" required></v-text-field>

        <v-select
          :items="categories"
          label="Select a category"
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

        <v-file-input v-model="images" multiple show-size label="Image"></v-file-input>
        <v-divider class="my-6" />
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="addProduct()">
          Validate
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </v-form>
      <modal v-if="showModal" @close="showModal = false">
        <!--
      you can use custom content here to overwrite
      default content
    -->
        <h3 slot="header">custom header</h3>
      </modal>
    </v-container>
  </base-section>
</template>

<script>
import ProductCategoryServices from "../../services/ProductCategoryService.js";
import ProductServices from "../../services/ProductServices.js";
import { CREATE_PRODUCT_ACTION } from "@/store/constants";
import image from "@/assets/article-1.jpg";
export default {
  name: "SectionAddProduct",
  data() {
    return {
      /*nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],*/
      valid: true,
      title: "",
      description: "",
      brand: "",
      features: "",
      state: "",
      sellerId: "6128c9a35ca54e2140988b46",
      categoryId: null,
      categories: [],
      images: null,
      showModal: false,
    };
  },
  methods: {
    retrieveProductCategories() {
      ProductCategoryServices.getAll()
        .then((response) => {
          this.categories = response.data;
          console.log(response.data);
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

    addProduct() {
      var data = [
        "title",
        "description",
        "brand",
        "features",
        "state",
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
        console.log(res);
        if (res) {
          console.log(res);
          this.show = true
          
        }
      });
    },
  },
  mounted() {
    this.retrieveProductCategories();
  },
};
</script>

<style lang="sass"></style>
