<template>
<base-section id="sell-offers">
  <v-row align="center" class="list px-3 mx-auto">

    <!--v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
    </v-col-->

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Mes offres de ventes</v-card-title>

        <v-data-table
          :headers="headers"
          :items="arr3"
          disable-pagination
          :hide-default-footer="true"
          no-data-text="Aucune offre de vente en cours"
        >
          <template v-slot:[`item.bonlivraison`]>
            <v-icon small class="mr-2" @click.prevent="downloadCoupon()">mdi-upload</v-icon>
          </template>
          <template slot="item.number" slot-scope="props">
            {{ props.index + 1 }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-checkbox
             color="info"
             label="Envoyer produit"
             v-if="sent === false"
            @click="sendProduct(item.productId)"></v-checkbox>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="showModal" persistent max-width="500px">
        <v-card>
          <v-card-title>Envoyer produit</v-card-title>
          <v-card-text>Avez-vous envoyé votre produit avec le bon de commande ?</v-card-text>
          <v-card-actions>
            <v-btn color="warning" text @click="cancel()"> Annuler </v-btn>
            <!--v-btn color="error" text @click="cancel()"> Refuser </v-btn-->
            <v-btn color="success" class="mr-4" text @click="productSent()"> Oui </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </base-section>
</template>

<script>
import ProductServices from '../../services/ProductServices.js';
import SellOfferServices from '../../services/SellOfferServices.js';
import authHeader from './../../store/modules/auth-header.js';
import axios from 'axios';
export default {
  name: 'SectionSelloffers',
  data() {
    return {
      sellOffers: [],
      products: [],
      arr3: [],
      title: "",
      showModal:false,
      disabled:false,
      userId:null,
      couponDownloaded:false,
      product: null,
      productId: null,
      sent: false,
      images:null,
      index: null,
      indexes:null,
      headers: [
        { text: "#", align: "start", sortable: false, value: "number" },
        { text: "Price", align: "start", sortable: false, value: "price" },
        { text: "Description du produit", align: "start", sortable: false, value: "description" },
        { text: "Bon de livraison",align: "start", value: "bonlivraison", sortable: false },
        { text: "Actions",align: "start", value: "actions", sortable: false },
      ],
      props: ['postTitle'],
    };
  },
  async mounted() {
    await this.retrieveSellOffers();
    await this.getAllProducts();
    this.mergeSellOffersProducts();
  },
  computed: {
    itemsWithIndex () {
      return this.sellOffers.map(
        (items, index) => ({
          ...items,
          index: index + 1
        }))
    },
  },

  methods: {
    async retrieveSellOffers() {
      console.log("process.env.VUE_APP_JWT_SECRET_TOKEN")
      console.log(process.env.VUE_APP_JWT_SECRET_TOKEN)
      this.userId = localStorage.sellerId;
      console.log(this.userId)
      this.sellOffers = (await axios({ 
          method: 'get', 
          url: `https://test-green-repack-back.herokuapp.com/api/selloffer/seller/${ this.userId}`,
          headers: {Authorization: `Bearer ` + process.env.VUE_APP_JWT_SECRET_TOKEN},
          params: {
           id: this.userId,
          }
        },
      )).data;
      console.log("this.sellOffers")
      console.log(this.sellOffers)
    },
    async getAllProducts() {
      this.products = (await axios.get('https://test-green-repack-back.herokuapp.com/api/product')).data;
      console.log("this.products")
      console.log(this.products)
    },
    /*retrieveSellOffers() {
      this.sellerId = localStorage.sellerId;
      SellOfferServices.getAllBySellerId(this.sellerId)
        .then((response) => {
          this.sellOffers = response.data;
          console.log("this.sellOffers");
          console.log(this.sellOffers);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAllProducts() {
      ProductServices.getAll()
        .then((response) => {
          this.products = response.data;
          console.log("this.products");
          console.log(this.products);
        })
        .catch((e) => {
          console.log(e);
      });
    },*/
    mergeSellOffersProducts () {
      console.log("ici")
      console.log(this.products) // print empty array
      console.log(this.sellOffers) // print empty array
        for (var i = 0; i < this.sellOffers.length; i++) {
          if (this.sellOffers[i].productId === this.products[i]._id) {
            this.arr3.push({id: this.sellOffers[i]._id, price: this.sellOffers[i].price, description: this.products[i].description});
        }
      }
      
    },
    getProductBySellOffer(id) {
      ProductServices.get(id)
        .then((response) => {
          this.productId = response.data._id;
          this.product = response.data;
          this.images = response.data.images;
          // TO DO remove if this.product.sent === true
          
        })
        .catch((e) => {
          console.log(e);
      });
    },
    refreshList() {
      this.retrieveSellOffers();
    },

    downloadCoupon() {
      // this.$router.push({ name: "tutorial-details", params: { id: id } });
      //TODO fix couponDownloaded
      const url = 'http://localhost:3000/uploads/bon_livraison_0000_0000_0000_0000.pdf';
      window.location.href = url;
      this.couponDownloaded=true;
    },

    sendProduct(id) {
      this.showModal = true;
      console.log(id)
      //get one product with sellOfferId
      //set send true
      this.getProductBySellOffer(id);
    },

    productSent() {
      this.showModal = true;
      var data = {
        sent: true,
        images: this.images,
      };

      ProductServices.updateSent(this.productId, data)
        .then((response) => {
          console.log(response.data)
          this.refreshList();
          this.showModal = false;
          //TO DO do something after update
        })
        .catch((e) => {
          console.log(e);
        });
      
    },

    productSent() {
      this.showModal = true;
      var data = {
        sent: true,
        images: this.images,
      };
      ProductServices.updateSent(this.productId, data)
        .then((response) => {
          console.log(response.data)
          this.refreshList();
          this.showModal = false;
          //TO DO do something after update
        })
        .catch((e) => {
          console.log(e);
        });
      
    },

    refreshList() {
      this.retrieveSellOffers();
    },

    cancel() {
      this.showModal = false;
      //get one product with sellOfferId
      //set send true

    },

    checkboxUpdated(newValue){
      console.log(newValue)
    },

    isToDisable(newValue){
      //get one product with sellOfferId
      //get sent
      //update disabled
      console.log(newValue)
    },
  },
  
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>