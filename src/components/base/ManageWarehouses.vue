<template>
  <div>
    <v-card class="mx-auto" tile>
        <v-card-title>Liste des états des entrepôts</v-card-title>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
         @click="add()"
        >Ajouter</v-btn>
      </v-card-actions>
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
            <v-icon class="icon" small @click="add()">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
  </div>
</template>

<script>
import WarehouseServices from '../../services/WarehouseServices.js';
export default {
  name: "ManageProductWarehouses",
  // Injected from the Vuetify Themeable mixin
  inject: ["theme"],
  data() {
    return {
      data: [],
      title: "",
      headers: [
        { text: "#", align: "start", sortable: false, value: "number" },
        { text: "N° rue", value: "addressNumber", sortable: false },
        { text: "Rue", value: "addressRoad", sortable: false },
        { text: "Code postal", value: "addressPostalCode", sortable: false },
        { text: "Ville", value: "addressCity", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveData() {
      WarehouseServices.getAll()
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
