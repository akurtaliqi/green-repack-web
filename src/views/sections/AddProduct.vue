<template>
    <base-section id="add-product">
        <base-section-heading
        icon="mdi-vuetify"
        title="Vendre un produit"
        />

        <v-container>
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
                <v-text-field
                v-model="title"
                :counter="10"
                :rules="nameRules"
                label="Titre"
                required
                ></v-text-field>

                <v-text-field
                v-model="description"
                :counter="10"
                label="Description"
                required
                ></v-text-field>
                
                <v-text-field
                v-model="brand"
                :counter="20"
                label="Marque"
                required
                ></v-text-field>

                <v-text-field
                v-model="features"
                :counter="10"
                label="Caractéristiques"
                required
                ></v-text-field>

                <v-text-field
                v-model="state"
                :counter="10"
                label="État"
                required
                ></v-text-field>

                <v-select
                :items="categories"
                name="category"
                label="Select a category"
                v-model="category"
                required
                item-value="_id" 
                item-text="name"
                >

                <template v-slot:item="{item}">
                    {{item.name}}
                </template>    
                <template v-slot:selection="{item}">
                    {{item.name}}
                </template>
                </v-select>
                

                <v-file-input
                show-size
                label="Image"
                ></v-file-input>

                <!--v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="Do you agree?"
                required
                ></v-checkbox-->
                <v-divider class="my-6" />
                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
                >
                Validate
                </v-btn>
    
                <v-btn
                color="error"
                class="mr-4"
                @click="reset"
                >
                Reset Form
                </v-btn>
            </v-form>
        </v-container>
    </base-section>
</template>

<script>
  import ProductCategoryServices from '../../services/ProductCategoryService.js';
  import ProductServices from '../../services/ProductServices.js';
  export default {
    name: 'SectionAddProduct',
    data() {
        return {
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
          valid: true,
          title: '',
          description: '',
          brand: '',
          features: '',
          state: '',
          name: '',
          category: '',
          categoryId: '',
          selectedId: '',
          categories: [],
        }
    },
    /*data: () => ({
      valid: true,
      title: '',
      description: '',
      brand: '',
      features: '',
      state: '',
      categoryId: '',   
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      /*email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      categories: [],
      checkbox: false,
    }),*/

    methods: {
      retrieveProductCategories() {
      ProductCategoryServices.getAll()
        .then(response => {
          this.categories = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },

        selectId(e) {
        this.selectedId = e.id
        console.log(this.selectedId)
        }


      

      /*addProduct() {
      ProductServices.createProduct()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
      },*/
    },
    mounted() {
        this.retrieveProductCategories();
    },
  }
</script>

<style lang="sass">
</style>
