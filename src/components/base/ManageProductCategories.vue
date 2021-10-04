<template>
  <div>
    <v-card class="mx-auto" tile>
        <v-card-title>Liste des états des catégories de produits</v-card-title>
        <v-data-table
          :headers="headers"
          :items="data"
          disable-pagination
          :hide-default-footer="true"
        >
          <template slot="item.number" slot-scope="props">
            {{ props.index + 1 }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="icon" small @click="edit(item.id)">mdi-pencil</v-icon>
            <v-icon class="icon" small @click="add(item.id)">mdi-plus</v-icon>
          </template>
        </v-data-table>
      </v-card>
  </div>
</template>

<script>
import ProductCategoryServices from '../../services/ProductCategoryService.js';
export default {
  name: "ManageProductCategories",
  // Injected from the Vuetify Themeable mixin
  inject: ["theme"],
  data() {
    return {
      data: [],
      title: "",
      headers: [
        { text: "#", align: "start", sortable: false, value: "number" },
        { text: "Nom", align: "start", sortable: false, value: "name" },
        { text: "Description", value: "description", sortable: false },
        { text: "Réduction (%)", value: "decrease", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveData() {
      ProductCategoryServices.getAll()
        .then((response) => {
          this.data = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    edit() {
        console.log("edit")
    },
    add() {
        console.log("add")
    }
  },
  mounted() {
    this.retrieveData();
  },
 
};
</script>
<style scoped>
.tabs {
  width:auto;
}
</style>
