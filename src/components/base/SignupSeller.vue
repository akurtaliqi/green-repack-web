<template>
  <div>
    
    <base-info-card :title="title" :subtitle="subtitle" space="4" color="primary" />

    <form @submit.prevent="submit">
      <input v-model="email" type="email" />

      <input v-model="password" type="password" />

      <base-btn :color="!theme.isDark ? 'accent' : 'white'" outlined type="submit">
        Créer compte
      </base-btn>
    </form>
  </div>
</template>

<script>
import { SIGNUPSELLERACTION } from "@/store/constants";
export default {
  name: "SignupSeller",

  // Injected from the Vuetify Themeable mixin
  inject: ["theme"],

  props: {
    subtitle: String,
    title: {
      type: String,
      default: "VOUS ÊTES UN VENDEUR",
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      this.$store
        .dispatch(`Auth/${SIGNUPSELLERACTION}`, {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push("/Login");
        });
    },
  },
};
</script>
<style scoped>
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 3px;
  background-color: white;
}
</style>
