<template>
  <div>
    <h1 class="display-4 text-center mb-3">Logout</h1>
    <div class="alert alert-info">
      <span class="fe fe-alert-circle mr-4"></span>
      Logging out
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  async asyncData(context) {
    await context.$auth.logout()
  },
}
</script>
