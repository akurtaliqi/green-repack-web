<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Admin',

    metaInfo: { title: 'Admin' },

    extends: View,

    mixins: [
      LoadSections([
        'check-out-success',
      ]),
    ],
  }
</script>
