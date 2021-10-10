<template>
<base-section id="buyer-profil">
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
      <v-card>
                <v-card-text>
                    <v-flex class="mb-4">
                        <v-avatar size="96" class="mr-4">
                            <!--img :src="'/avatars/avatar_' + (form.avatar.toLowerCase()) + '.png'" alt="Avatar"-->
                        </v-avatar>
                        <v-btn @click="openAvatarPicker">Change Avatar</v-btn>
                    </v-flex>
                    <v-text-field
                        v-model="email"
                        label="Email"></v-text-field>
                    <v-text-field
                        v-model="greencoinsamount"
                        label="Green coins amount"></v-text-field>
                </v-card-text>
                <!--v-card-actions>
                    <v-btn color="primary" :loading="loading" @click.native="update">
                        <v-icon left dark>check</v-icon>
                        Save Changes
                    </v-btn>
                </v-card-actions-->
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
      email: null,
      greencoinsamount:null,
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