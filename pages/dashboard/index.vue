<template>
  <div class="container">
    <h1>Subscriptions</h1>
    <SubscriptionsGrid :subscriptions="subscriptions" />
  </div>
</template>

<script setup lang="ts">
import SubscriptionsGrid from '@/components/subscriptions/SubscriptionsGrid.vue'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
  title: 'Dashboard',
})

const subscriptions = ref<Subscription[]>([])

interface Subscription {
  id: string
  user: {
    is_leader: boolean
    full_name: string
    username: string
  }
  renew: boolean
}

onMounted(async () => {
  const data = await $fetch('/api/subscriptions')
  subscriptions.value = data as Subscription[]
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;
.container {
  padding: 0 $space-medium;
  max-width: $container-max-width;
  margin: 0 auto;
}
</style>