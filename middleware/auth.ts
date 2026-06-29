export default defineNuxtRouteMiddleware(async (to, from) => {
  // Try fetching the session status
  const { data, error } = await useFetch('/api/auth/me', {
    headers: useRequestHeaders(['cookie']) // Forward cookies in SSR
  })
  
  if (error.value || !data.value?.authenticated) {
    return navigateTo('/admin/login')
  }
})
