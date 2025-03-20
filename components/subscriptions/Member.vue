<template>
  <Card>
    <div :class="['member-card', { 'current-user': isCurrentUser }]">
      <div class="name">
        <div class="leader-icon" v-if="ownerId === member.user_id">&#x1F451;</div>
        {{ member.user.full_name }}
      </div>
      <div class="email">{{ member.subscription_email || member.user.email }}</div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'
import type { Member } from '~/types/subscription'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps<{
  member: Member
  ownerId: string
}>()

const isOwner = computed(() => {
  return props.member.user_id === props.ownerId
})

const isCurrentUser = computed(() => {
  const authStore = useAuthStore()
  return props.member.user_id === authStore.user?.id
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;
.member-card {
  position: relative;
  flex-direction: column;
  gap: $space-small;
  overflow: hidden;
  padding: $space-medium;
  display: flex;
  &.current-user {
    background-color: $background-color-current-user;
    color: $font-color-current-user;
  }

  .name {
    display: flex;
    align-items: center;
    gap: $space-small;
    @extend .text-xlarge;
    font-weight: $font-weight-bold;
    .leader-icon {
      font-size: 26px;
      pointer-events: none;
    }
  }

  .email {
    @extend .text-medium;
  }
}
</style>
