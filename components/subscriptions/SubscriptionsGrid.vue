<template>
  <div class="subscription-container">
    <SubscriptionItem 
      v-for="subscription in subscriptions" 
      :key="subscription.id"
      :subscription="subscription"
    />
  </div>
</template>

<script setup lang="ts">
import SubscriptionItem from './SubscriptionItem.vue'

interface Subscription {
  id: string
  user: {
    full_name: string
    username: string
    is_leader: boolean
  }
  renew: boolean
}

defineProps<{
  subscriptions: Subscription[]
}>()
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;

.subscription-container {
  display: flex;
  flex-direction: column;
  gap: $space-medium;
  width: 100%;
  position: relative;
}
</style>