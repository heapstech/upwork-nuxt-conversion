<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5 col-xl-4 my-5">
        <h1 class="display-4 text-center mb-3">Sign in</h1>
        <p class="text-muted text-center mb-5">Free access to our dashboard.</p>
        <form method="post" @submit.prevent="submitForm">
          <div class="form-group">
            <label>Email Address</label>
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              placeholder="name@address.com"
            />
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col">
                <label>Password</label>
              </div>
              <div class="col-auto">
                <a
                  href="password-reset.html"
                  class="form-text small text-muted"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div class="input-group input-group-merge">
              <input
                v-model="form.password"
                type="password"
                class="form-control form-control-appended"
                placeholder="Enter your password"
              />
              <div class="input-group-append">
                <span class="input-group-text">
                  <i class="fe fe-eye"></i>
                </span>
              </div>
            </div>
          </div>
          <button class="btn btn-lg btn-block btn-primary mb-3">Sign in</button>
          <div class="text-center">
            <small class="text-muted text-center">
              Don't have an account yet?
              <nuxt-link to="register">Sign up</nuxt-link>.
            </small>
          </div>
          <div v-if="form.errors" class="alert alert-danger">
            <span class="fe fe-alert-circle mr-4"></span>
            {{ form.errors }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      form: {
        errors: null,
        status: false,
        email: '',
        password: '',
      },
    }
  },
  methods: {
    submitForm() {
      this.$auth
        .loginWith('local', {
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        })
        .catch((e) => {
          // console.log(error)
          if (e.response.data.message) {
            this.form.errors = e.response.data.message
          }
        })
    },
  },
  head() {
    return {
      title: 'Sign In',
    }
  },
}
</script>
