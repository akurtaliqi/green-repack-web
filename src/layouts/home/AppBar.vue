<template>
  <div>
    <v-app-bar id="home-app-bar" app elevation="1" elevate-on-scroll height="80">
      <router-link to="/">
        <base-img
          :src="require(`@/assets/greenrepacklogo.png`)"
          contain
          max-width="150"
          width="100%"
        />
      </router-link>

      <v-spacer />

      <div>
        <v-tabs class="hidden-sm-and-down" optional background-color="transparent">
          <template v-for="(name, i) in items">
            <template v-if="name.type === 'link'">
              <v-tab
                v-if="
                  name.access === 'all' ||
                  (AUTHGETTER && name.access === USERLOGGEDINTYPE) ||
                  (!AUTHGETTER && name.access === 'restricted') ||
                  (AUTHGETTER && name.access === 'loggedin')
                "
                :key="name.title + i + 'title'"
                :to="name.route ? name.route : ''"
                :exact="name === 'Home'"
                :ripple="false"
                class="font-weight-bold"
                min-width="96"
                text
              >
                {{ name.title }}
              </v-tab>
            </template>
            <template v-else>
              <v-tab
                v-if="AUTHGETTER && name.access === 'loggedInOnly'"
                :key="name.title + i + 'title'"
                :exact="name === 'Home'"
                :ripple="false"
                class="font-weight-bold"
                min-width="96"
                text
                @click="logout"
              >
                {{ name.title }}
              </v-tab>
            </template>
          </template>
        </v-tabs>
      </div>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>

    <home-drawer v-model="drawer" :items="items" />
  </div>
</template>

<script>
import { AUTHGETTER, USERLOGGEDINTYPE } from "@/store/constants";
import { mapGetters } from "vuex";

export default {
  name: "HomeAppBar",

  components: {
    HomeDrawer: () => import("./Drawer"),
  },

  data: () => ({
    drawer: null,
    items: [
      { title: "Home", access: "all", route: "/", type: "link" },
      { title: "Products", access: "all", route: "Products", type: "link" },
      { title: "Mes offres de ventes", access: "seller", route: "selloffers", type: "link" },
      { title: "Vendre un produit", access: "seller", route: "addproduct", type: "link" },
      { title: "Login", access: "restricted", route: "Login", type: "link" },
      { title: "About", access: "all", route: "About", type: "link" },
      { title: "Gestion des listes", access: "admin", route: "managelists", type: "link" },
      { title: "Gestion produits", access: "admin", route: "manageselloffers", type: "link" },
      { title: "Logout", access: "loggedInOnly", type: "button" },
    ],
  }),
  computed: {
    ...mapGetters("Auth", [AUTHGETTER, USERLOGGEDINTYPE]),
  },
  methods: {
    logout: function () {
      this.$store.dispatch("Auth/LOGOUTUSER").then((res) => {
        if (res) {
          this.$router.push("/Login");
        }
      });
    },
  },
};
</script>

<style lang="sass">
  #home-app-bar
    .v-tabs-slider
      max-width: 24px
      margin: 0 auto

    .v-tab
      &::before
        display: none
</style>
