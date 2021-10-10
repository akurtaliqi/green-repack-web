<template>
<base-section id="orders">
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
        <v-card-title>Mes commandes</v-card-title>

        <v-data-table
          :headers="headers"
          :items="data"
          disable-pagination
          :hide-default-footer="true"
          no-data-text="Aucune commande"
        >
          <!--template v-slot:[`item.bonlivraison`]>
            <v-icon small class="mr-2" @click.prevent="downloadCoupon()">mdi-upload</v-icon>
          </template>
          <template slot="item.number" slot-scope="props">
            {{ props.index + 1 }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-checkbox
             color="info"
             label="Envoyer produit"></v-checkbox-->
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  </base-section>
  
</template>

<script>
import OrderServices from '../../services/OrderServices';
import axios from 'axios';
export default {
  name: 'SectionOrders',
  data() {
    return {
      data: [],
      title: "",
      headers: [
        { text: "#", align: "start", sortable: false, value: "number" },
        { text: "Date", align: "start", sortable: false, value: "price" },
        { text: "Montant", align: "start", sortable: false, value: "description" },
        { text: "Actions",align: "start", value: "actions", sortable: false },
      ],
      props: ['postTitle'],
    };
  },
  async mounted() {
    // this.retrieveOrdersByBuyerId();
  },

  methods: {
    /*async retrieveOrdersByBuyerId() {
      this.userId = localStorage.sellerId;
      this.orders = (await axios({ 
          method: 'get', 
          url: `https://test-green-repack-back.herokuapp.com/api/selloffer/seller/${this.userId}`,
          params: {
           id: this.userId,
          }
        },
      )).data;
    },*/
    async retrieveOrdersByBuyerId() {
      this.data = (await axios.get('https://test-green-repack-back.herokuapp.com/api/order')).data;
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
  },
  
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>