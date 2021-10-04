<template>
  <base-section id="manage-lists">
    <v-row align="center" class="list mx-auto">
      <v-card class="mx-auto" tile>
          <div class="tabs" align="center">
            <base-btn v-for="tab in tabs" :key="tab.link" @click="selected = tab.link;">
              {{ tab.text }}
            </base-btn>
          </div> 
        <base :is="selected"/>
      </v-card>
    </v-row>
  </base-section>
</template>

<script>
import TutorialDataService from "../../services/SellOfferServices.js";
import { AUTHGETTER, LOGINUSERFROMLOCALSTORAGE, USERLOGGEDINGETTER, SELLERID, USERPROFILE } from "@/store/constants";
import ManageProductStates from "../../components/base/ManageProductStates.vue";
import ManageProductModels from "../../components/base/ManageProductModels.vue";
import ManageProductCategories from "../../components/base/ManageProductCategories.vue";
import ManageWarehouses from "../../components/base/ManageWarehouses.vue";
export default {
  name: 'SectionManageLists',
  data() {
    return {
      tabs: [
        { text: "États des produits", link: "manage-product-states" },
        { text: "Modèles des produits", link: "manage-product-models"},
        { text: "Catégories des produits", link: "manage-product-categories"},
        { text: "Entrepôts", link: "manage-warehouses"},
      ],
      selected: "manage-product-states",
    };
  },
  components: {
    ManageProductStates,
    ManageProductModels,
    ManageProductCategories,
    ManageWarehouses
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAllBySellerId("613f08b0f8252d2de46cbe28")
        .then((response) => {
          this.tutorials = response.data.map(this.getDisplayTutorial);
          console.log(response.data);
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
          this.tutorials = response.data.map(this.getDisplayTutorial);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editTutorial(id) {
      this.$router.push({ name: "tutorial-details", params: { id: id } });
    },

    deleteTutorial(id) {
      TutorialDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayTutorial(tutorial) {
      return {
        id: tutorial._id,
        title: tutorial.price,
        // title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
        // price: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
        // createDate: tutorial.published ? "Published" : "Pending",
      };
    },

    LoginFromCache() {
      this.$store.dispatch(
        `Auth/${LOGINUSERFROMLOCALSTORAGE}`,
        // JSON.parse(localStorage.getItem("sellerId")),
      );
    },
  },
  mounted() {
    this.retrieveTutorials();
    this.LoginFromCache();
  },
};
</script>

<style scroped>

</style>