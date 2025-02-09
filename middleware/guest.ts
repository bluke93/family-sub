// Check if user is not logged in to allow access to the page
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  if (authStore.isLoggedIn) {
    return navigateTo('/dashboard')
  }
})
