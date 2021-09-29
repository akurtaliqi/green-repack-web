<template>
<base-section id="manage-product-models">
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Tutorials</v-card-title>

        <v-data-table
          :headers="headers"
          :items="tutorials"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  </base-section>
</template>

<script>
import TutorialDataService from "../../services/SellOfferServices.js";
import { AUTHGETTER, LOGINUSERFROMLOCALSTORAGE, USERLOGGEDINGETTER, SELLERID, USERPROFILE } from "@/store/constants";
export default {
  name: 'SectionSelloffers',
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
    };
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

<style>
.list {
  max-width: 750px;
}
</style>