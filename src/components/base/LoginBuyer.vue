<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
    />

    <base-text-field label="Email" />

    <base-text-field label="Password" />

    <base-btn
      :color="!theme.isDark ? 'accent' : 'white'"
      href="mailto:shop@vuetifyjs.com?subject=Zero%20Theme%20Question"
      outlined
      target="_blank"
    >
      Connexion
    </base-btn>
  </div>
</template>

<script>
  export default {
    name: 'LoginBuyer',

    // Injected from the Vuetify Themeable mixin
    inject: ['theme'],

    props: {
      subtitle: String,
      title: {
        type: String,
        default: 'VOUS ÊTES UN MARCHAND',
      },
    },
  }
</script>
