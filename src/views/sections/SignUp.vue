<template>
  <v-theme-provider dark>
    <base-section
      id="sign-up"
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
          >
            <base-signup-buyer />
          </v-col>

          <v-col
            class="text-center hidden-sm-and-down"
            cols="2"
          >
            <v-divider vertical />
          </v-col>

          <v-col
            cols="12"
            md="5"
          >
            <base-signup-seller />
          </v-col>
        </v-row>
      </v-container>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'SectionSignUp',
    // retrieve products from db where idUser == user connected and product attrib sellOfferAccept == false
  }
</script>