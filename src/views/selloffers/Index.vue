<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'SellOffers',

    metaInfo: { title: 'Sell Offers' },

    extends: View,

    mixins: [
      LoadSections([
        'sell-offers',
      ]),
    ],
  }
</script>
