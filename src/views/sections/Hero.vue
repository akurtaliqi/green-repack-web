<template>
  <section id="hero">
    <v-img
      max-height="500"
      :src="require('@/assets/green-background2.jpg')"
      class="white--text"
      gradient="to bottom, rgba(11, 28, 61, .9), rgba(0,0,0,.4)"
    >
      <v-container class="fill-height px-4 py-12">
        <v-responsive
          class="d-flex align-center mx-auto"
          height="100%"
          max-width="1000"
          width="100%"
        >
          <base-subheading
            weight="regular"
            title="LE SITE NUMÉRO UN D'ACHAT DE PRODUITS RECONDITIONNÉS"
          />

          <base-heading
            size="text-h2"
            title="BIENVENUE SUR GREEN REPACK"
            weight="medium"
          />

          <base-body>
            Green Repack est une jeune société française de vente de produits électroniques reconditionnés. Notre mission est de proposer des produits fiables, à des prix imbattables. Tous nos produits sont vérifiés par des experts.
          </base-body>

          <div
            v-if="USERLOGGEDINTYPE === ''"
            :class="$vuetify.breakpoint.smAndDown ? 'flex-column align-start' : 'align-center'"
            class="d-flex flex-wrap"
          >
            <base-btn
            router-link to="/Login"
            >
              Connectez-vous
            </base-btn>
            <span class="font-weight-bold ml-6 mr-4 my-4">ou</span>
            <base-btn
              :ripple="false"
              class="pa-1"
              height="auto"
              text
              color="white"
              router-link to="/Signup"
            >
              Créez un compte
            </base-btn>
          </div>
        </v-responsive>
      </v-container>
    </v-img>
  </section>
</template>

<script>
import { AUTHGETTER, USERLOGGEDINTYPE } from "@/store/constants";
import { mapGetters } from "vuex";
  export default {
    name: 'SectionHero',

    provide: {
      theme: { isDark: true },
    },

    computed: {
      ...mapGetters("Auth", [AUTHGETTER, USERLOGGEDINTYPE]),
      minHeight () {
        const height = this.$vuetify.breakpoint.mdAndUp ? '100vh' : '50vh'

        return `calc(${height} - ${this.$vuetify.application.top}px)`
      },
    },
  }
</script>
