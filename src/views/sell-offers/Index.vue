<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'SellOffers',

    metaInfo: { title: 'Mes offres d\'achat' },

    extends: View,

    mixins: [
      LoadSections([
          'SectionSellOffers'
      ]),
    ],
  }
</script>
