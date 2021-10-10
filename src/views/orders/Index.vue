<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Admin',

    metaInfo: { title: 'Orders' },

    extends: View,

    mixins: [
      LoadSections([
        'orders',
      ]),
    ],
  }
</script>
