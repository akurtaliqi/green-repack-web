<template>
  <div>
    <base-info-card :title="title" :subtitle="subtitle" space="4" color="primary" />

    <form @submit.prevent="submit">
      <input v-model="username" label="Username" type="username" />

      <input v-model="password" type="password" />

      <base-btn :color="!theme.isDark ? 'accent' : 'white'" outlined type="submit">
        Connexion
      </base-btn>
    </form>
  </div>
</template>

<script>
  import { LOGINADMINACTION } from "@/store/constants";
  export default {
    name: 'LoginAdmin',

    // Injected from the Vuetify Themeable mixin
    inject: ['theme'],

    props: {
      subtitle: String,
      title: {
        type: String,
        default: 'ACCÈS AU PANNEAU D\'ADMINISTRATION',
      },
    },
    data() {
      return {
        register: {
          username: "",
          password: ""
        }
      };
    },
    methods: {
    async submit() {
      this.$store
        .dispatch(`Auth/${LOGINADMINACTION}`, {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          if (res) {
            this.$router.push("/");
          }
        });
    },
  }
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

