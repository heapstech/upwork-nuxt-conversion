export default function ({ store }) {
  if (process.client) {
    if (store.state.site.demoMode) {
      require('~/assets/js/demo')
    }
    if (store.state.site.colorScheme === 'dark') {
      require('~/assets/js/charts-dark')
    }
  }
}
