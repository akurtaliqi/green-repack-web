<template>
  <section :id="id">
    <v-row no-gutters>
      <v-col cols="12">
        <component
          :is="`section-${section}`"
          v-for="section in sections"
          :key="section"
        />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { LOGINUSERFROMLOCALSTORAGE } from "@/store/constants";
export default {
  name: "BaseView",
  props: {
    id: {
      type: String,
      default: "view",
    },
  },
  data: () => ({ sections: [] }),
  mounted() {
    this.LoginFromCache();
  },
  methods: {
    LoginFromCache() {
      this.$store.dispatch(
        `Auth/${LOGINUSERFROMLOCALSTORAGE}`,
        JSON.parse(localStorage.getItem("token"))
      );
    },
  },
};
</script>
