export const state = () => ({
  demoMode: false,
  colorScheme: 'light',
  colorSchemeCss: 'theme',
  navPosition: 'sidenav',
  navColor: 'default',
  sidebarSize: 'base',
  // themes: {
  //   darkMode: false,
  // },
})

const T = {
  TOGGLE_THEME: 'TOGGLE_THEME',
  TOGGLE_THEME_CSS: 'TOGGLE_THEME_CSS',
}

export const getters = {
  getColorScheme: (state) => {
    return state.colorScheme === 'light' ? 'theme-dark' : 'theme'
  },
}

export const mutations = {
  [T.TOGGLE_THEME](state, payloads) {
    state.colorScheme = payloads
  },
  [T.TOGGLE_THEME_CSS](state, payloads) {
    state.colorSchemeCss = payloads
  },
}

export const actions = {
  toggleTheme({ state, commit }, payloads) {
    commit(T.TOGGLE_THEME, state.colorScheme === 'light' ? 'dark' : 'light')
    commit(
      T.TOGGLE_THEME_CSS,
      state.colorSchemeCss === 'light' ? 'theme-dark.css' : 'theme.css'
    )
  },
  toggleCssName({ state }, payloads) {
    return new Promise((resolve) => {
      const a = state.colorScheme === 'light' ? 'theme-dark' : 'theme'
      resolve(a)
    })
  },
}
