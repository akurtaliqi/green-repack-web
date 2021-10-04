<template>
<base-section id="manage-products">
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
        <v-card-title>Les produits à valider</v-card-title>

        <v-data-table
          :headers="headers"
          :items="tutorials"
          disable-pagination
          :hide-default-footer="true"
        >
          <template slot="item.number" slot-scope="props">
            {{ props.index + 1 }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="showProduct(item._id)">mdi-pencil</v-icon>
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
            <v-btn color="error" text @click="cancel()"> Refuser </v-btn>
            <v-btn color="success" class="mr-4" text @click="productVerfied()"> Accepter </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </base-section>
</template>

<script>
import { AUTHGETTER, LOGINUSERFROMLOCALSTORAGE, USERLOGGEDINGETTER, SELLERID, USERPROFILE } from "@/store/constants";
import ProductServices from '../../services/ProductServices.js';
import SellOfferServices from '../../services/SellOfferServices.js';
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
      product: null,
      productId: null,
      productSent: false,
      headers: [
        { text: "#", align: "start", sortable: false, value: "number" },
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Actions",align: "start", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveTutorials() {
      ProductServices.getAllProductsToValidate()
        .then((response) => {
          console.log("i am here")
          console.log(response.data)
          response.data;
          this.tutorials=response.data;
          
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

    verifyProduct(id) {
      this.showModal = true;

      console.log(id)
      //get one product with sellOfferId
      //set send true
      this.getProductBySellOffer(id);

    },

    productVerifed() {
      this.showModal = true;
      console.log("id in product sent")
       console.log(this.productId)


      //get one product with sellOfferId
      //set send true

      var data = {
        sent: true
      };

      ProductServices.update(this.productId, data)
        .then((response) => {
          console.log(response.data)
          response.data;
          this.product = response.data;
          
        })
        .catch((e) => {
          console.log(e);
        });
      
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

    showProduct(id) {
      this.$router.push({ name: "admin-product-details", params: { id: id } });
    }
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