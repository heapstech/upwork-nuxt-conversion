<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5 col-xl-4 my-5">
        <h1 class="display-4 text-center mb-3">
          {{ this.$auth.user.email }}
        </h1>
        <p class="text-muted text-center mb-5">Your account email</p>

        <button
          class="btn btn-sm btn-block btn-primary mb-1"
          @click="toggleTheme()"
        >
          Toggle Theme
        </button>
        <NuxtLink class="btn btn-sm btn-block btn-primary mb-1" to="logout">
          Logout
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  middleware: 'auth',
  methods: {
    ...mapActions({
      toggleTheme: 'site/toggleTheme',
    }),
    async asyncData(context) {
      await context.$auth.logout()
    },
  },
  head() {
    return {
      title: 'Account',
    }
  },
}
</script>
