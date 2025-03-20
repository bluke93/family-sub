// Check if user has already a token in cookie
// If token is in cookie, set token and retrieve user from supabase
// - If user is found, set user in authStore
// - If user is not found or token is not valid, clean authStore and logout

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const token = useCookie('token').value
  if (token) {
    try { 
      const user = await $fetch('/api/auth/me', {
        headers: {
          Authorization: token,
        },
      })
      if (user) {
        authStore.setToken(token)
        authStore.setUser({
          id: user.id,
          email: user.email as string,
          created_at: user.created_at,
          full_name: user.full_name,
        })

        
      }
    } catch (error) {
      authStore.logout()
    }
  }
})
