<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Management',

    metaInfo: { title: 'Management' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'admin'
      ]),
    ],
  }
</script>
