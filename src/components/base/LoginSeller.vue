<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
    />

    <form @submit.prevent="loginSeller">
      <input
        label="Email"
        v-model="email"
        type="email"
      />

      <input
        v-model="password"
        type="password"
      />

      <!--button type="submit">Log in</button-->

      <base-btn
        :color="!theme.isDark ? 'accent' : 'white'"
        outlined
        type="submit"
        >
        Connexion
      </base-btn>

    </form>

    <!--base-text-field
      label="Email"
      v-model="email"
    />

    <base-text-field
      label="Password"
    /-->
  </div>
</template>

<script>
  export default {
    name: 'LoginSeller',

    data() {
      return {
      email: "",  
      password: "",
      };
    },

    // Injected from the Vuetify Themeable mixin
    inject: ['theme'],

    props: {
      subtitle: String,
      title: {
        type: String,
        default: 'YOU ARE A SELLER',
      },
    },

    methods : {
        async loginSeller () {
          const response = await fetch ("http://localhost:3000/api/seller/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
        });
        const {token } = await response.json();
        if (token) {
          this.$router.push("/");
        } else {
          // error
          console.log("Error", response);
        }
        /*if (response.data.accessToken) {
          this.$router.push("/");
        } else {
          // error
          console.log("Error", response);
        }*/
      },
    }
  }
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
