<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-5 col-xl-4 my-5">
        <h1 class="display-4 text-center mb-3">Sign up</h1>
        <p class="text-muted text-center mb-5">Free access to our dashboard.</p>
        <form method="post" @submit.prevent="submitForm">
          <div class="form-group">
            <label> Email Address </label>
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              placeholder="name@address.com"
            />
          </div>
          <div class="form-group">
            <label> Password </label>
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
          <button class="btn btn-lg btn-block btn-primary mb-3">Sign up</button>
          <div class="text-center">
            <small class="text-muted text-center">
              Already have an account?
              <nuxt-link to="login">Log in</nuxt-link>.
            </small>
          </div>
          <div
            v-if="form.errors"
            :class="`alert ${form.status ? 'alert-success' : 'alert-danger'}`"
          >
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
        email: null,
        password: null,
        status: false,
      },
      dataDebug: null,
    }
  },
  created() {},
  methods: {
    // TODO: Could be moved to store/auth instead
    submitForm() {
      this.$axios
        // without /api because it's been set as baseURL
        .post('/auth/register', {
          email: this.form.email,
          password: this.form.password,
        })
        .then((response) => {
          // this.dataDebug = response.data.message
          if (response.data.email) {
            this.form.status = true
            this.form.errors = response.data.message

            // Auto log in if successfully registered
            this.$auth
              .loginWith('local', {
                data: {
                  email: this.form.email,
                  password: this.form.password,
                },
              })
              .catch((e) => {
                this.form.errors = e.response.data.message
              })

            // Simulated delay
            setTimeout(() => {
              this.$router.push({
                name: 'login',
                params: { registered: 'yes' },
              })
            }, 3000)
          }
        })
        .catch((e) => {
          if (e.message) {
            this.form.errors = e.message
          }
        })
    },
  },
  head() {
    return {
      title: 'Sign Up',
    }
  },
}
</script>
