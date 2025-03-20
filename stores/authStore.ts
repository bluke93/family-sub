import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  created_at: string
  full_name: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
  },
  actions: {
    setToken(token: string | null) {
      this.accessToken = token
      useCookie('token').value = token
    },
    setUser(user: User) {
      this.user = user
    },
    logout() {
      this.accessToken = null
      this.user = null
      useCookie('token').value = null
    },
  },
})