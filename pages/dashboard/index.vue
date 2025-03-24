<template>
  <div class="container">
    <h1>Hello, {{ authStore.user?.full_name }}!</h1>

    <div v-for="service in services" :key="service.id" class="service-container">
      <Subscription :service="service" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Subscription from '~/components/subscriptions/Subscription.vue'
import { useAuthStore } from '@/stores/authStore'
import type { Service } from '~/types/subscription'

const authStore = useAuthStore()

definePageMeta({
  layout: 'default',
  middleware: 'auth',
  title: 'Dashboard',
})

const services = ref<Service[]>([])

onMounted(async () => {
  const data = await $fetch('/api/services', {
    headers: {
      Authorization: authStore.accessToken || '',
    },
  })
  services.value = data as Service[]
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;
.container {
  padding: 0 $space-medium;

  .service-container {
    margin-bottom: $space-large;
    display: flex;
    flex-direction: column;
    gap: $space-medium;
  }
}
</style>