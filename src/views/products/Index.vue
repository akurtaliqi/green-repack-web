<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Products',

    metaInfo: { title: 'Login' },

    extends: View,

    mixins: [
      LoadSections([
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
