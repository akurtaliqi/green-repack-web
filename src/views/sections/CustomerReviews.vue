<template>
  <base-section
    id="customer-reviews"
    space="64"
  >
    <base-section-heading
      icon="mdi-vuetify"
      title="Découvrez les derniers produits mis en vente"
    />

    <v-carousel
      class="mt-n12"
      height="600"
    >
      <v-carousel-item
        v-for="(customer, i) in customers"
        :key="i"
      >
        <v-container class="fill-height">
          <v-responsive
            class="mx-auto shrink text-center"
            max-width="90%"
            width="700"
          >
            <base-body
              :text="customer.review"
              tag="em"
              class="mb-6 d-block"
            />

            <v-avatar
              class="mb-6"
              size="200"
              style="border-radius:0px;"
            >
              <base-img :src="require(`@/assets/products-${i + 1}.png`)" />
            </v-avatar>

            <base-title
              :title="customer.name"
              space="0"
            />

            <base-subtitle :title="customer.role" />
          </v-responsive>
        </v-container>
      </v-carousel-item>
    </v-carousel>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionCustomerReviews',

    provide: {
      heading: { align: 'center' },
    },

    data: () => ({
      customers: [
        {
          review: 'Ordinateur de la marque Dell',
          role: 'ORDINATEUR',
        },
        {
          role: 'ORDINATEUR',
        },
        {
          role: 'ORDINATEUR',
        },
      ],
    }),
  }
</script>

<style lang="sass">
  #customer-reviews
    .v-carousel__controls
      background: transparent

    .base-body
      line-height: 2
</style>
