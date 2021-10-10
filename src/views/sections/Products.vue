<template>
    <v-container>
      <div
      max-width="750"
        v-for="(field, index) in fields"
        :key="field.id">
        <!--div class="display-1">{{ field.title }}</div-->
        <v-data-iterator
          hide-default-footer
          :items="products"
          :items-per-page.sync="itemsPerPage"
          no-data-text="Aucun produit à afficher"
          :page.sync="paginations[index].page"
          @page-count="paginations[index].pageCount = $event">
          <template v-slot:default="{ items }">
            <!--div class="menu">
                <button v-for="(category, index) in categories" @click="filter(category)" :key="category.name" :class="{selected: selectedCat === category}">Category {{index + 1}}</button>
                <button @click="filter('all')" :class="{selected: selectedCat === 'all'}">All</button>
            </div>
            <div v-if="selectedCat === preview.cat || selectedCat === 'all'" v-bind:key="category.name"  v-for="preview in previews" :class="'preview ' + preview.cat">
            </div-->
            <v-row>
              <v-col
                sm="3"
                md="3"
                v-for="item in items"
                :key="item.name">
                <v-card
                max-width="370"
                >
                    <v-img>
                        <v-img :src="'https://test-green-repack-back.herokuapp.com/'+item.images[0]" height="300"/>
                    </v-img>

                  <v-card-title class="subheading font-weight-bold">
                    {{ item.title }}  
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>Marque:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.brand }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Description:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.description }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>Description:</v-list-item-content>
                      <v-list-item-content class="align-end">
                        {{ item.sellPrice }}
                      </v-list-item-content>
                    </v-list-item>
                   
                    <!--v-expansion-panels
                    flat
                    >
                        <v-expansion-panel>
                            <v-expansion-panel-header>Caractéristiques techniques</v-expansion-panel-header>
                            <v-expansion-panel-content>
                            {{ item.features }}
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels-->
                    <v-card-actions>
                    <v-btn 
                    text 
                    outlined
                    color="primary accent-2"
                    plain
                    elevation="2"
                    @click="showProduct(item._id)"
                    >
                      Détails
                    </v-btn>
                    <v-btn 
                    text 
                    outlined
                    color="primary accent-2"
                    plain
                    elevation="2"
                    v-if="userProfile === 'buyer'"
                    >
                        Acheter
                    </v-btn>
                    </v-card-actions>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="my-6" />
            <v-pagination
              v-model="paginations[index].page"
              :length="paginations[index].pageCount">
            </v-pagination>
          </template>
          <v-divider class="my-6" />
          <!--template v-slot:footer>
            <v-pagination
              v-model="paginations[index].page"
              :length="paginations[index].pageCount">
            </v-pagination>
          </template-->
        </v-data-iterator>
      </div>
    </v-container>
</template>

<script>
import ProductServices from '../../services/ProductServices.js';
import { AUTHGETTER, LOGINUSERFROMLOCALSTORAGE, USERLOGGEDINGETTER, SELLERID, USERPROFILE } from "@/store/constants";
import { mapGetters } from "vuex";

export default {
  name: "SectionProducts",
  data() {
    return {
    products: [],  
    currentProduct: null,
    currentIndex: -1,
    title: '',
    itemsPerPage: 20,
    paginations: [],
    fields: [],
    images: [],
    // buyerId: '612624ab68df834028b29d96',
    userLoggedIn:false,
    // currentUserId: null,
    userProfile:null,
    userType:null,
    };
  },
  methods: {
    retrieveProducts() {
      ProductServices.getAll()
        .then(response => {
          this.products = response.data;
          this.images = response.data.images;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveProducts();
      this.currentProduct = null;
      this.currentIndex = -1;
    },

    setActiveProduct(product, index) {
      this.currentProduct = product;
      this.currentIndex = index;
    },

    removeAllProducts() {
      ProductServices.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchProductByCategory() {
      ProductServices.findByProductCategory(this.categoryId)
        .then(response => {
          this.products = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    showProduct(id) {
      this.$router.push({ name: "product-details", params: { id: id } });
    },

    getUserProfile() {
      this.userProfile = localStorage.userType;
      console.log("console ici")
      console.log(localStorage.userType)
      console.log(localStorage.userLoggedIn)
    },


  },
  watch: {
    fields(fields) {
      this.paginations = fields.map(() => ({
        page: 1,
        pageCount: 0
      }))
    }
  },
  mounted() {
    this.retrieveProducts(),
    this.getUserProfile(),
    this.fields = [
    	{
        id: '1',
        title: 'Main'
      }
    ],
    console.log("hello")
  },
  computed: {
    ...mapGetters("Auth", [AUTHGETTER]),
  },
};
</script>

<style scoped>
.v-expansion-panel-header { padding: 16px !important; }

@media screen and (max-width: 959px) {
  .v-card {
    width:80%;
  }
}
</style>