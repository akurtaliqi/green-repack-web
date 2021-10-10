<template>
  <div>
    <v-card class="mx-auto" tile>
        <v-card-title>Liste des états des produits</v-card-title>
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
            <v-icon class="icon" small @click="edit(item._id)">mdi-pencil</v-icon>
            <v-icon class="icon" small @click="deleteProductState(item._id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>

      <v-dialog v-model="showModal" max-width="500px">
        <v-card>
        <v-card-title>
          <span class="text-h5">{{this.modalTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
               <v-text-field
                v-model="name"
                label="Nom état"
                required
              ></v-text-field>
              </v-col>
              <v-col cols="12">
               <!--v-text-field
                v-model="description"
                label="Nom du prduit"
                required
              ></v-text-field-->
              <v-textarea
                outlined
                name="input-7-4"
                label="Description état du produit"
                v-model="description"
              ></v-textarea>
              </v-col>
              <v-col cols="12">
               <v-text-field
                v-model="decrease"
                label="Réduction (%)"
                required
              ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <!--small>*indicates required field</small-->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="refreshList"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="save()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
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
      showModal: false,
      id:null,
      name:null,
      description:null,
      decrease:null,
      modalTitle:null,
      create:false,
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
      ProductStateServices.getAll()
        .then((response) => {
          this.data = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getProductById(id){
      console.log(id)
      ProductStateServices.get(id)
        .then((response) => {
          // this.data = response.data;
          this.id= response.data._id;
          this.name=response.data.name;
          this.description=response.data.description;
          this.decrease=response.data.decrease;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

    },
    edit(id) {
      this.showModal = true;
      console.log(id)
      this.modalTitle="Modifier un état de produit"
      this.getProductById(id);
    },
    add() {
      this.name=null,
      this.description=null,
      this.decrease=null,
      this.showModal=true;
      this.create=true;
      this.modalTitle="Ajouter un état de produit"
    },
    save(){
      if (this.name != null && this.description != null && this.decrease != null && this.create === false) {
        console.log(this.name)
          
          var data = {
            name: this.name,
            description: this.description,
            decrease: this.decrease,
          };
          ProductStateServices.update(this.id, data)
            .then((response) => {
              this.refreshList();
              this.showModal=false;
            })
            .catch((e) => {
              console.log(e);
            });

      } else if (this.create===true) {
        var data = {
          name: this.name,
          description:  this.description,
          decrease:  this.decrease,
        };
        ProductStateServices.createProductState(data)
        .then((response) => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
      }
      
    },
    deleteProductState(id){

    },
    refreshList() {
      this.showModal=false;
      this.retrieveData();
    },
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
