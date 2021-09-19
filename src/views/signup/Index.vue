<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'SignUp',

    metaInfo: { title: 'SignUp' },

    extends: View,

    mixins: [
      LoadSections([
        'sign-up',
      ]),
    ],
  }
</script>
