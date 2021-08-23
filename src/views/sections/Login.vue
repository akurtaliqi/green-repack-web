<!--template>
  <base-section id="login">
    <v-tabs
      v-model="tab"
      centered
      class="mb-12"
    >
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        :href="`#${tab.toLowerCase()}`"
        class="text-capitalize"
      >
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-container>
      <v-fade-transition
        group
        hide-on-leave
        tag="div"
        class="row"
      >
        <v-col
          v-for="(project, i) in projects"
          :key="project.title"
          class="gallery-card"
          cols="12"
          sm="6"
          md="4"
        >
          <project-card
            v-bind="project"
            :src="require(`@/assets/project-${i + 1}.jpg`)"
            height="300"
            width="100%"
          />
        </v-col>
      </v-fade-transition>
    </v-container>
  </base-section>
</template-->
<template>
  <v-theme-provider dark>
    <base-section
      id="login"
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="5"
          >
            <base-login-buyer />
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
            <base-login-seller />
          </v-col>
        </v-row>
        <v-divider class="my-6" />
        <base-section-heading title="Vous n'avez pas de compte ?">
          Créez un compte en quelques instants
        </base-section-heading>
        <v-col align="center">
        <base-btn
          href="mailto:shop@vuetifyjs.com?subject=Zero%20Theme%20Question"
          outlined
          target="_blank"
        >
          Créer un compte
        </base-btn>
        </v-col>
      </v-container>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'Login',

    data: () => ({
      tab: 'All',
      tabs: [
        'Connection acheteur',
        'Connection marchand',
      ],
    }),
  }
</script>

<style lang="sass">
  .gallery-card
    transform-origin: center center 0
    transition: .3s cubic-bezier(.25,.8,.50,1)
</style>
