// Check if user is logged in to allow access to the page
export default defineNuxtRouteMiddleware(async(to, from) => {
  const authStore = useAuthStore()
  if (!authStore.isLoggedIn) {
    return navigateTo('/auth/login')
  }
})
