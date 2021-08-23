<template>
  <base-section id="gallery">
    <v-tabs
      v-model="tab"
      centered
      class="mb-12"
    >
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        :href="`#${tab.toLowerCase()}`"
        class="text-capitalize"
      >
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-container>
      <v-fade-transition
        group
        hide-on-leave
        tag="div"
        class="row"
      >
        <v-col
          v-for="(project, i) in projects"
          :key="project.title"
          class="gallery-card"
          cols="12"
          sm="6"
          md="4"
        >
          <project-card
            v-bind="project"
            :src="require(`@/assets/project-${i + 1}.jpg`)"
            height="300"
            width="100%"
          />
        </v-col>
      </v-fade-transition>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionGallery',

    components: {
      ProjectCard: () => import('@/components/ProjectCard'),
    },

    data: () => ({
      tab: 'All',
      tabs: [
        'Connection acheteur',
        'Connection marchand',
      ],
    }),
  }
</script>

<style lang="sass">
  .gallery-card
    transform-origin: center center 0
    transition: .3s cubic-bezier(.25,.8,.50,1)
</style>
