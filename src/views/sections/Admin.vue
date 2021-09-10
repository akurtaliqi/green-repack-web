<template>
  <v-theme-provider dark>
    <base-section
      id="admin"
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
          >
            <base-login-admin />
          </v-col>

          
        </v-row>
        <v-divider class="my-6" />
      </v-container>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'SectionAdmin',
  }
</script>

<style lang="sass">
</style>
