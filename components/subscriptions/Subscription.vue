<template>
  <div class="subscription-container">
    <h3 class="subscription-name">
      {{ service.name }} 
      <span class="members-count">
        {{ service.max_members }} / {{ members.length }}
      </span>
    </h3>
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

  .subscription-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
    color: $font-color;
    margin-bottom: $space-small;

    .members-count {
      font-size: $font-size-small;
      font-weight: $font-weight-medium;
      color: $font-color-secondary;
      margin-bottom: $space-small;
      background-color: $background-color-tertiary;
      padding: $space-small;
      border-radius: $border-radius-large;
      border: 1px solid $border-color-tertiary;
    }
  }

  .members-count {
    font-size: $font-size-small;
    color: $font-color-secondary;
    margin-bottom: $space-small;
    background-color: $background-color-secondary;
    padding: $space-small;
    display: flex;
    flex-shrink: 0;
    flex-grow: 0;
  }

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