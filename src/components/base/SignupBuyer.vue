<template>
  <div>
    <base-info-card :title="title" :subtitle="subtitle" space="4" color="primary" />

    <form @submit.prevent="signUpBuyer">
      <!--v-text-field
        label="Email" outlined placeholder="exemple@email.com" v-model="email"
      ></v-text-field-->
      <input v-model="email" type="email" placeholder="Email" outlined/>
      <!--v-text-field
        label="Mot de passe"
      ></v-text-field-->
      <input v-model="password" type="password" placeholder="Mot de passe" />

      <base-btn :color="!theme.isDark ? 'accent' : 'white'" outlined type="submit">
        Créer compte
      </base-btn>
    </form>
  </div>
</template>

<script>
import { SIGNUPBUYERACTION } from "@/store/constants";
export default {
  name: "SignupBuyer",

  // Injected from the Vuetify Themeable mixin
  inject: ["theme"],

  props: {
    subtitle: String,
    title: {
      type: String,
      default: "VOUS ÊTES UN ACHETEUR",
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signUpBuyer() {
      // do something here
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
