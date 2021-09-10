<template>
  <div v-if="currentProduct" class="edit-form py-3">
    <p class="headline">Modifier votre produit</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentProduct.name"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.brand"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentProduct.description"
        :rules="[(v) => !!v || 'Description is required']"
        label="Description"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteTutorial">
        Supprimer
      </v-btn>

      <v-btn color="success" small @click="updateTutorial">
        Modifier
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<!--template>
  <base-section
    id="project"
    class="mx-auto"
  >
    <v-container style="max-width: 1024px;">
      <base-subheading
        title="`currentTutorial.name`"
        tag="h1"
        space="12"
      />

      <base-img
        :height="$vuetify.breakpoint.mdAndUp ? 500 : 250"
        :src="require(`@/assets/products-1.png`)"
        class="mb-6 mb-md-12"
      />

      <v-row>
        <v-col
          cols="12"
          md="9"
        >
          <base-title title="CASE STUDY" />

          <base-body space="12">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut totam ipsam cum facere quam alias earum labore explicabo, corrupti molestias neque eaque assumenda adipisci nulla, nemo libero eligendi voluptatibus impedit, corrupti molestias neque eaque assumenda adipisci nulla, nemo libero eligendi voluptatibus impedit, corrupti molestias neque eaque assumenda adipisci nulla, nemo libero eligendi voluptatibus impedit!!
          </base-body>

          <v-row class="text-center">
            <v-col
              v-for="[value, name] of currentTutorial"
              :key="name"
              cols="6"
              md="3"
            >
              <base-circular-progress v-bind="{ title, value }" />
            </v-col>
          </v-row>
        </v-col>

        <v-col
          cols="12"
          md="3"
        >
          <div class="mb-12">
            <base-title
              align="center"
              title="SHARE"
            />

            <div class="mx-n2 text-center">
              <v-icon
                v-for="icon in icons"
                :key="icon"
                class="px-2"
                @click="() => {}"
                v-text="icon"
              />
            </div>
          </div>

          <div class="caption">
            <base-title
              title="GENERAL INFO"
              space="2"
            />

            <v-divider />

            <div class="grey--text text--darken-1">
              <template v-for="([name, sub], i) of info">
                <v-row
                  :key="name"
                  class="mx-0 my-3"
                  justify="space-between"
                >
                  <span v-text="title" />

                  <strong v-text="sub" />
                </v-row>

                <v-divider :key="`divider-${i}`" />
              </template>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template-->


<script>
import ProductServices from '../../services/ProductServices.js';

export default {
  name: "tutorial",
  data() {
    return {
      currentProduct: null,
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      ProductServices.get(id)
        .then((response) => {
          this.currentProduct = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentProduct.id,
        name: this.currentProduct.name,
        description: this.currentProduct.description,
        published: status,
      };

      ProductServices.update(this.currentProduct.id, data)
        .then((response) => {
          this.currentProduct.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      ProductServices.update(this.currentProduct.id, this.currentProduct)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      ProductServices.delete(this.currentProduct.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 500px;
  margin: auto;
}
</style>