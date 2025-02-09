<template>
  <Card class="subscription-card" :class="{ 'current-user': subscription.user.is_leader }">
    <div class="subscription">
      <div class="name">
        {{ subscription.user.full_name }}
      </div>
      <div class="email">{{ subscription.user.username }}</div>
      <div class="renew">{{ subscription.renew ? '&#128994;' : '&#128993;' }}</div>
    </div>
    <div class="leader-icon" v-if="subscription.user.is_leader">&#x1F451;</div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'

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
  subscription: Subscription
}>()
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;
.subscription-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: $space-small;
  overflow: hidden;

  &.current-user {
    background-color: $background-color-current-user;
    color: $font-color-current-user;
  }

  .subscription {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: $space-small;
    position: relative;

    .name {
      @extend .text-xlarge;
      font-weight: $font-weight-bold;
    }

    .email {
      @extend .text-medium;
    }
  }

  .leader-icon {
    width: 100%;
    height: 100%;
    transform: translate(5%, 10%);
    right: 0;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 130px;
    opacity: 0.3;
    filter: saturate(0);
    transition: $transition-duration-medium;
  }

  &:hover {
    .leader-icon {
      transform: translate(0%, 0%);
      filter: saturate(1);
    }
  }
}
</style>
