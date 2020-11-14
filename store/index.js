// // eslint-disable-next-line no-unused-vars
// const cookieparser = process.server ? require('cookieparser') : undefined
//
// export const state = () => {
//   return {
//     auth: null,
//     refreshToken: null,
//     accessToken: null,
//     id: null,
//   }
// }
// export const mutations = {
//   SET_AUTH(state, auth) {
//     state.auth = auth
//   },
// }
// export const actions = {
//   async nuxtServerInit({ commit, dispatch, state }, { req }) {
//     // const { accessToken, refreshToken } = state.auth
//     //
//     // if (accessToken && refreshToken) {
//     //   try {
//     //     await dispatch('auth/refresh')
//     //   } catch (e) {
//     //     await dispatch('auth/logout')
//     //   }
//     // }
//     // let auth = null
//     // if (req.headers.cookie) {
//     //   const parsed = cookieparser.parse(req.headers.cookie)
//     //   try {
//     //     auth = JSON.parse(parsed.auth)
//     //   } catch (err) {
//     //     // No valid cookie found
//     //   }
//     // }
//     // commit('setAuth', auth)
//   },
// }
//
// // // import axios from '@nuxtjs/axios'
// //
// // export const state = () => ({
// //   user: null,
// //   loggedIn: false,
// // })
// //
// // export const getters = {
// //   isAuthenticated(state) {
// //     return state.auth.loggedIn
// //   },
// //
// //   loggedInUser(state) {
// //     return state.auth.user
// //   },
// // }
// //
// // export const mutations = {
// //   SET_USER(state, user) {
// //     state.user = user
// //   },
// //   // REGISTER(state, user) {
// //   //   state.user = user
// //   // },
// //   register(state, { email, password }) {
// //     state.user.email = email
// //     state.user.password = password
// //   },
// //   login(state) {
// //     state.loggedIn = true
// //   },
// // }
// //
// // export const actions = {
// //   // nuxtServerInit({ commit }, { req }) {
// //   //   if (req.session && req.session.user) {
// //   //     commit('SET_USER', req.session.user)
// //   //   }
// //   // },
// //   // async login({ commit }, { email, password }) {
// //   //   try {
// //   //     const { data } = await axios.post('/api/auth/login', { email, password })
// //   //     commit('SET_USER', data)
// //   //   } catch (e) {
// //   //     if (e.response && e.response.status === 401) {
// //   //       throw new Error('Bad Credentials')
// //   //     }
// //   //     throw e
// //   //   }
// //   // },
// //   // async register({ commit }, { email, password }) {
// //   //   try {
// //   //     await axios.post('/api/auth/register', { email, password })
// //   //     const user = await this.$auth.loginWith('local', {
// //   //       data: {
// //   //         email: this.form.email,
// //   //         password: this.form.password,
// //   //       },
// //   //     })
// //   //     if (user) {
// //   //       return true
// //   //     }
// //   //   } catch (e) {
// //   //     if (e.response && e.response.status === 401) {
// //   //       throw new Error('Bad Credentials')
// //   //     }
// //   //     throw e
// //   //   }
// //   // },
