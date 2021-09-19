<script>
  // Extensions
  import View from '@/views/View'

  // Mixins
  import LoadSections from '@/mixins/load-sections'

  export default {
    name: 'AddProduct',

    metaInfo: { title: 'Add product' },

    extends: View,

    mixins: [
      LoadSections([
        'add-product',
      ]),
    ],
  }
</script>
