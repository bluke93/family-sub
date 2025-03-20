<template>
  <div class="subscription-container">
    <h3>{{ service.name }}</h3>
    <div class="subscription-members">
      <Member 
        v-for="member in members" 
        :key="member.user_id"
        :ownerId="service.owner_id"
        :isCurrentUser="isCurrentUser"
        :member="member"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Member from './Member.vue'
import type { Service } from '~/types/subscription'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps<{
  service: Service
}>()

// always put the logged in user in the first position
const members = computed(() => {
  return [...props.service.members].sort((a, b) => a.user_id === props.service.owner_id ? -1 : 1)
})

const authStore = useAuthStore()

const isCurrentUser = computed(() => {
  return authStore.user?.id === props.service.owner_id
})

</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;

.subscription-container {
  display: flex;
  flex-direction: column;
  gap: $space-small;
  width: 100%;
  position: relative;
  .subscription-members {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-medium;
    width: 100%;
    position: relative;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>