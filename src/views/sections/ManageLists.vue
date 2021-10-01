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
import LoginBuyer from "../../components/base/LoginBuyer.vue";
import LoginSeller from "../../components/base/LoginSeller.vue";
import LoginAdmin from "../../components/base/LoginAdmin.vue";
export default {
  name: 'SectionManageLists',
  data() {
    return {
      tutorials: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Description", value: "description", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],

      tabs: [
        { text: "États des produits", link: "manage-product-states" },
        { text: "Modèles des produits", link: "login-admin"},
        { text: "Catégories des produits", link: "login-buyer"},
        { text: "Entrepôts", link: "login-seller"},
      ],
      selected: "manage-product-states",

      /*tabs: ["manage-product-states", "Contact"],
      selected: "manage-product-states"*/
    };
  },
  components: {
    ManageProductStates,
    LoginBuyer,
    LoginSeller,
    LoginAdmin
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
.list {
  max-width: auto;
}
.tabs {
  width:auto;
}
</style>