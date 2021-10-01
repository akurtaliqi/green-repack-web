<template>
  <div>
    <v-card class="mx-auto" tile>
        <v-card-title>Liste des états des produits</v-card-title>
        <v-data-table
          :headers="headers"
          :items="data"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon class="icon" small @click="edit(item.id)">mdi-pencil</v-icon>
            <v-icon class="icon" small @click="add(item.id)">mdi-plus</v-icon>
          </template>
        </v-data-table>
      </v-card>
  </div>
</template>

<script>
import ProductStateServices from "../../services/ProductStateServices.js";
export default {
  name: "ManageProductStates",
  // Injected from the Vuetify Themeable mixin
  inject: ["theme"],
  data() {
    return {
      data: [],
      title: "",
      headers: [
        { text: "Nom", align: "start", sortable: false, value: "name" },
        { text: "Description", value: "description", sortable: false },
        { text: "Réduction (%)", value: "decrease", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveData() {
      ProductStateServices.getAll()
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
.v-icon {
    background-color:transparent;
    padding:5px;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 3px;
  background-color: white;
}
</style>
