<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Products',

    metaInfo: { title: 'Tous nos produits' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'products',
      ]),
    ],
  }
</script>
