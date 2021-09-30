<template>
  <v-navigation-drawer
    bottom
    color="transparent"
    fixed
    height="auto"
    overlay-color="secondary"
    overlay-opacity=".8"
    temporary
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list
      color="white"
      shaped
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        :exact="item === 'Home'"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { AUTHGETTER, USERLOGGEDINTYPE } from "@/store/constants";
import { mapGetters } from "vuex";
  export default {
    name: 'HomeDrawer',

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },

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
    LoginFromCache() {
      this.$store.dispatch(
        `Auth/${LOGINUSERFROMLOCALSTORAGE}`,
        // TODO : SEE IF THERE IS A BETTER WAY / CLEANER
      );
    },
    mounted() {
    this.LoginFromCache();
  },
  },
  }
</script>
