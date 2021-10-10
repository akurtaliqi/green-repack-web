<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'BuyerProfil',

    metaInfo: { title: 'Mon profil' },

    extends: View,

    mixins: [
      LoadSections([
        'buyer-profil',
      ]),
    ],
  }
</script>
