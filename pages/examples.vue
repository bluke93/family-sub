<template>
  <div class="container">
    <h1>Hello, John Doe!</h1>
    <p>This is an example of a dashboard with mock data.</p>

    <div v-for="service in services" :key="service.id" class="service-container">
      <Subscription :service="service" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Subscription from '~/components/subscriptions/Subscription.vue'
import type { Service } from '~/types/subscription'

const services = ref<Service[]>([
  {
    id: '1',
    name: 'Netflix Family Plan',
    created_at: '2024-03-24',
    owner_id: '1',
    started_at: '2024-03-24',
    expiring_at: '2025-03-24',
    price_yearly: 190.99,
    price_monthly: 19.99,
    max_members: 5,
    members: [
      {
        id: '1',
        user_id: '1',
        subscription_email: 'john@example.com',
        full_name: 'John Doe',
        email: 'john@example.com',
        created_at: '2024-03-24',
        is_owner: true,
        has_paid: false,
        wants_renew: false,
        user: {
          id: '1',
          full_name: 'John Doe',
          email: 'john@example.com'
        }
      },
      {
        id: '2',
        user_id: '2',
        subscription_email: 'jane@example.com',
        full_name: 'Jane Doe',
        email: 'jane@example.com',
        created_at: '2024-03-24',
        is_owner: false,
        has_paid: false,
        wants_renew: false,
        user: {
          id: '2',
          full_name: 'Jane Doe',
          email: 'jane@example.com'
        }
      },
      {
        id: '4',
        user_id: '4',
        subscription_email: 'sarah@example.com',
        full_name: 'Sarah Doe',
        email: 'sarah@example.com',
        created_at: '2024-03-24',
        is_owner: false,
        has_paid: true,
        wants_renew: true,
        user: {
          id: '4',
          full_name: 'Sarah Doe',
          email: 'sarah@example.com'
        }
      }
    ]
  },
  {
    id: '2',
    name: 'Spotify Family',
    created_at: '2024-03-24',
    owner_id: '1',
    started_at: '2024-03-24',
    expiring_at: '2025-03-24',
    price_yearly: 149.99,
    price_monthly: 14.99,
    max_members: 6,
    members: [
      {
        id: '1',
        user_id: '1',
        subscription_email: 'john@example.com',
        full_name: 'John Doe',
        email: 'john@example.com',
        created_at: '2024-03-24',
        is_owner: true,
        has_paid: false,
        wants_renew: false,
        user: {
          id: '1',
          full_name: 'John Doe',
          email: 'john@example.com'
        }
      },
      {
        id: '3',
        user_id: '3',
        subscription_email: 'mike@example.com',
        full_name: 'Mike Doe',
        email: 'mike@example.com',
        created_at: '2024-03-24',
        is_owner: false,
        has_paid: false,
        wants_renew: false,
        user: {
          id: '3',
          full_name: 'Mike Doe',
          email: 'mike@example.com'
        }
      }
    ]
  },
  {
    id: '3',
    name: 'Disney+ Premium',
    created_at: '2024-03-24',
    owner_id: '1',
    started_at: '2024-03-24',
    expiring_at: '2025-03-24',
    price_yearly: 109.99,
    price_monthly: 11.99,
    max_members: 4,
    members: [
      {
        id: '5',
        user_id: '1',
        subscription_email: 'john@example.com',
        full_name: 'John Doe',
        email: 'john@example.com',
        created_at: '2024-03-24',
        is_owner: true,
        has_paid: true,
        wants_renew: true,
        user: {
          id: '1',
          full_name: 'John Doe',
          email: 'john@example.com'
        }
      },
      {
        id: '6',
        user_id: '5',
        subscription_email: 'emma@example.com',
        full_name: 'Emma Doe',
        email: 'emma@example.com',
        created_at: '2024-03-24',
        is_owner: false,
        has_paid: true,
        wants_renew: true,
        user: {
          id: '5',
          full_name: 'Emma Doe',
          email: 'emma@example.com'
        }
      }
    ]
  },
  {
    id: '4',
    name: 'YouTube Premium Family',
    created_at: '2024-03-24',
    owner_id: '2',
    started_at: '2024-03-24',
    expiring_at: '2025-03-24',
    price_yearly: 179.99,
    price_monthly: 17.99,
    max_members: 5,
    members: [
      {
        id: '7',
        user_id: '2',
        subscription_email: 'jane@example.com',
        full_name: 'Jane Doe',
        email: 'jane@example.com',
        created_at: '2024-03-24',
        is_owner: true,
        has_paid: true,
        wants_renew: true,
        user: {
          id: '2',
          full_name: 'Jane Doe',
          email: 'jane@example.com'
        }
      },
      {
        id: '8',
        user_id: '6',
        subscription_email: 'tom@example.com',
        full_name: 'Tom Doe',
        email: 'tom@example.com',
        created_at: '2024-03-24',
        is_owner: false,
        has_paid: false,
        wants_renew: false,
        user: {
          id: '6',
          full_name: 'Tom Doe',
          email: 'tom@example.com'
        }
      }
    ]
  }
])

definePageMeta({
  layout: 'default',
  title: 'Examples',
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
