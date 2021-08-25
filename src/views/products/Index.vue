<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Products',

    metaInfo: { title: 'Products' },

    extends: View,

    mixins: [
      LoadSections([
        'products',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'recent-works',
      },
    },
  }
</script>
