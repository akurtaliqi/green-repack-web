<template>
  <v-sheet tile>
    <v-sheet
      class="py-3"
      tile
    >
      <base-title
        align="center"
        title="RELATED PROJECTS"
        tag="h2"
        space="0"
      />
    </v-sheet>

    <projects class="py-12 py-md-12" />
  </v-sheet>
</template>

<script>
  export default {
    name: 'SectionProjects',

    components: {
      Projects: () => import('@/views/sections/Projects'),
    },
  }
</script>
