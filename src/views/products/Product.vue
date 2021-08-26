<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'Product',

    metaInfo: { title: 'Product Single' },

    extends: View,

    mixins: [
      LoadSections([
        'hero-alt',
        'project',
        'related-projects',
        'recent-works',
        'we-help-your-success',
        'affiliates',
        'keep-in-touch',
        'newsletter',
        'info',
      ]),
    ],

    props: {
      id: {
        type: String,
        default: 'work',
      },
    },
  }
</script>
