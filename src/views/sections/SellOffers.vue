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
          :items="sellOffers"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.bonlivraison`]>
            <v-icon small class="mr-2" @click.prevent="downloadCoupon()">mdi-upload</v-icon>
            <!--v-icon small v-if="item.couponDownloaded==true" @click="sendProduct(item.id)">mdi-send</v-icon-->
            <!--v-icon small @click="sendProduct(item.productId)">mdi-send</v-icon-->
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
            <!--v-icon small v-if="item.couponDownloaded==true" @click="sendProduct(item.id)">mdi-send</v-icon-->
            <!--v-icon small @click="sendProduct(item.productId)">mdi-send</v-icon-->
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="showModal" persistent max-width="500px">
        <v-card>
          <v-card-title>Envoyer produit</v-card-title>
          <v-card-text>Avez-vous envoyé votre produit ?</v-card-text>
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
export default {
  name: 'SectionSelloffers',
  data() {
    return {
      sellOffers: [],
      title: "",
      showModal:false,
      disabled:false,
      sellerId:null,
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
        { text: "Bon de livraison",align: "start", value: "bonlivraison", sortable: false },
        { text: "Actions",align: "start", value: "actions", sortable: false },
      ],
    };
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
    getProductBySellOffer(id) {
      ProductServices.get(id)
        .then((response) => {
          response.data;
          this.productId = response.data._id;
          this.product = response.data;
          this.images = response.data.images;

          // TO DO remove if this.product.sent === true
          // this.sellOffers.pop produc
          
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveSellOffers() {
      this.sellerId = localStorage.sellerId;
      SellOfferServices.getAllBySellerId(this.sellerId)
        .then((response) => {
          let sellOffer = [];
          let test2 = null;
          let subTab = [];
          // let product = [];
          /*for (let i = 0; i < response.data.length; i++) {
            sellOffer.push(response.data[i])
            //console.log(response.data.productId)
            // test.push(([response.data[i].price, this.product]).join());
            this.getProductBySellOffer(response.data[i].productId)
            
          }*/

          /*for (let j = 0; j < sellOffer.length; j++) {
            console.log("sellOffer[j]")
            console.log(sellOffer[j])
            for (let k = 0; k < this.product.length; k++) {
            console.log("this.product[k]")
            console.log(this.product[k])
            }
            
          }*/


          this.sellOffers = response.data;
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
  mounted() {
    this.retrieveSellOffers();
    console.log(this.index)
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>