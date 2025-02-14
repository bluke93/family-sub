<template>
  <Card class="subscription-card" :class="{ 'current-user': subscription.user.is_leader }">
    <div class="subscription">
      <div class="name">
        {{ subscription.user.full_name }}
      </div>
      <div class="renew" :class="renew" :id="'tooltip-' + subscription.id">
        <div class="renew-icon" v-if="renew === 'active'">🟢</div>
        <div class="renew-icon" v-if="renew === 'inactive'">🔴</div>
        <div class="renew-icon" v-if="renew === 'pending'">🟡</div>
      </div>
      <Tooltip :target-id="'tooltip-' + subscription.id">
        Subscription status: {{ renew.toUpperCase() }}
      </Tooltip>
    </div>
    <div class="leader-icon" v-if="subscription.user.is_leader">&#x1F451;</div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'
import Tooltip from '@/components/ui/tooltips/Tooltip.vue'
interface Subscription {
  id: string
  user: {
    full_name: string
    username: string
    is_leader: boolean
    friend_code: string
  }
  is_pending: boolean
  renew: boolean
}

const props = defineProps<{
  subscription: Subscription
}>()

const renew = computed(() => {
  if (props.subscription.is_pending) {
    return 'pending'
  } else {
    return props.subscription.renew ? 'active' : 'inactive'
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;
.subscription-card {
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
    min-height: 150px;

    .name {
      @extend .text-xlarge;
      font-weight: $font-weight-bold;
    }

    .email {
      @extend .text-medium;
    }

    .renew {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      border-radius: 100%;
      overflow: hidden;
      font-size: 8px;
      cursor: default;
      &.active {
        box-shadow: 0 0 10px 0 rgba(0, 255, 106, 0.5);
      }
      &.pending {
        box-shadow: 0 0 10px 0 rgba(255, 221, 0, 0.5);
      }
      &.inactive {
        box-shadow: 0 0 10px 0 rgba(255, 0, 0, 0.676);
      }
    }
  }

  .leader-icon {
    width: 100%;
    height: 100%;
    right: -10px;
    bottom: -30px;
    position: absolute;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-size: 130px;
    opacity: 0.2;
    filter: saturate(0);
    transition: $transition-duration-medium;
    pointer-events: none;
  }
}
</style>
