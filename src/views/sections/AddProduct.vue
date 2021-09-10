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
        v-model="select"
        :items="items"
        :rules="[v => !!v || 'Item is required']"
        label="Catégorie"
        required
        ></v-select>

        <v-file-input
        show-size
        label="Image"
        ></v-file-input>

        <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
        ></v-checkbox>

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

        <v-btn
        color="warning"
        @click="resetValidation"
        >
        Reset Validation
        </v-btn>
    </v-form>
        </v-container>
    </base-section>
</template>

<script>
  export default {
    name: 'SectionAddProduct',
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>

<style lang="sass">
</style>
