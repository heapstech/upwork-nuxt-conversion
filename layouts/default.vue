<template>
  <div>
    <Nuxt class="" />
  </div>
</template>

<script>
if (process.client) {
  require('jquery/dist/jquery')
  require('dropzone')
  require('bootstrap')
  require('@shopify/draggable')
  require('autosize')
  require('chart.js')
  require('flatpickr')
  require('highlightjs')
  require('jquery-mask-plugin')
  require('list.js')
  require('quill')
  require('select2')

  require('~/assets/js/wizard')
  require('~/assets/js/checklist')
  // require('~/assets/js/tooltip')
  require('~/assets/js/map')
  require('~/assets/js/kanban')
  require('~/assets/js/dashkit')
}

export default {
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: `/css/${this.$store.getters['site/getColorScheme']}.css`,
        },
      ],
      bodyAttrs: {
        class:
          'd-flex align-items-center bg-auth border-top border-top-2 border-primary',
      },
    }
  },
}
</script>

<style>
body {
  display: none;
}
</style>
