<template>
  <div>
    <router-link
      :to="{
        name: 'Article',
        params: { slug: 'lorem-ipsum-dolor-sit-amet-consectetur' }
      }"
      class="d-block"
    >
      <base-img
        :height="prominent ? 400 : 250"
        :src="src"
        flat
        tile
      >
        <v-row
          class="ma-0 fill-height"
          align="end"
          justify="end"
        >
          <v-sheet
            class="pa-2 d-inline-flex align-center justify-center"
            color="primary"
            dark
            tile
            height="40"
            width="40"
          >
            <v-icon
              v-if="icon"
              v-text="icon"
            />
          </v-sheet>
        </v-row>
      </base-img>
    </router-link>

    <v-theme-provider :dark="!$vuetify.theme.isDark">
      <v-sheet
        :dark="!$vuetify.theme.isDark"
        :light="$vuetify.theme.isDark"
        class="d-flex"
        tile
        max-width="100%"
      >
        <div class="grow pa-2 body-2">
          <div class="d-flex align-center fill-height">
            <span
              class="px-2"
              v-text="date"
            />
            /
            <span
              class="px-2"
              v-text="category"
            />

            <template v-if="$vuetify.breakpoint.mdAndUp">
              /
              <span
                class="px-2"
                v-text="`${comments} Comments`"
              />
            </template>
          </div>
        </div>
      </v-sheet>
    </v-theme-provider>

    <div class="pa-4">
      <base-title
        :title="title"
        class="text-truncate text-uppercase"
      />

      <base-body
        :text="!html ? truncatedText : undefined"
        :html="html"
        space="0"
      />
    </div>

    <v-btn
      v-if="readMore"
      class="font-weight-bold"
      text
    >
      Read More
    </v-btn>

    <v-divider
      v-if="divider"
      class="mt-6"
    />
  </div>
</template>

<script>
  export default {
    name: 'NewsCard',

    props: {
      category: String,
      comments: [Number, String],
      date: String,
      divider: Boolean,
      html: String,
      icon: String,
      prominent: Boolean,
      readMore: Boolean,
      src: String,
      text: String,
      title: String,
      truncate: [Number, String],
    },

    computed: {
      truncatedText () {
        if (!this.text) return ''

        const truncate = Number(this.truncate)

        return this.text.length > truncate
          ? this.text.slice(0, truncate) + ' [...]'
          : this.text
      },
    },
  }
</script>
