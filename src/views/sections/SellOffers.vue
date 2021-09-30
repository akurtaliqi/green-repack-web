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
          :items="tutorials"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="downloadCoupon(item.id)">mdi-upload</v-icon>
            <!--v-checkbox
             @change="checkboxUpdated"
             color="info"
             label="Envoyer produit"
             v-bind:disabled="isToDisable(item.id)"
            @click="sendProduct(item.id)"></v-checkbox-->
            <v-icon small v-if="item.couponDownloaded==true" @click="sendProduct(item.id)">mdi-send</v-icon>
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
            <v-btn color="error" text @click="cancel()"> Refuser </v-btn>
            <v-btn color="success" class="mr-4" text @click="cancel()"> Accepter </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </base-section>
</template>

<script>
import TutorialDataService from "../../services/SellOfferServices.js";
import { AUTHGETTER, LOGINUSERFROMLOCALSTORAGE, USERLOGGEDINGETTER, SELLERID, USERPROFILE } from "@/store/constants";
import ProductServices from '../../services/ProductServices.js';
export default {
  name: 'SectionSelloffers',
  data() {
    return {
      tutorials: [],
      title: "",
      showModal:false,
      disabled:false,
      sellerId:null,
      couponDownloaded:false,
      product: [],
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Price", align: "start", sortable: false, value: "price" },
        { text: "Actions",align: "start", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    getProductBySellOffer(id) {
      ProductServices.get(id)
        .then((response) => {
          response.data.description;
          console.log(response.name)
          console.log(response.data.description)
          this.product.push(response.data.description)
          console.log(this.product)
        })
        .catch((e) => {
          console.log(e);
        });
    },
    retrieveTutorials() {
      this.sellerId = localStorage.sellerId;
      TutorialDataService.getAllBySellerId(this.sellerId)
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


          this.tutorials = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then((response) => {
          // this.tutorials = response.data.map(this.getDisplayTutorial);
          console.log("fuck you");
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    

    downloadCoupon() {
      // this.$router.push({ name: "tutorial-details", params: { id: id } });
      //TODO fix couponDownloaded
      this.couponDownloaded=true;
    },

    sendProduct(id) {
      this.showModal = true;
      //get one product with sellOfferId
      //set send true

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

    getDisplayTutorial(tutorial) {
      return {
        id: tutorial._id,
        price: tutorial.brand,
        // title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
        // price: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
        // createDate: tutorial.published ? "Published" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>