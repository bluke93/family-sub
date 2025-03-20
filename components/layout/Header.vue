<template>
  <header class="header">
    <div class="logo">
      NSOS
    </div>
    <div v-if="isLoggedIn" class="user">
      <div class="user-info" @click="toggleMobileMenu">
        <div class="user-info-avatar">
          <div class="char">{{ displayUser?.charAt(0) }}</div>
        </div>
        <div class="user-info-name">{{ displayUser }}</div>
      </div>
      <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
        <a @click.prevent="logout">Logout</a>
      </div>
    </div>
    <div v-else class="user">
      <a href="/auth/login">Login</a>
      <a href="/auth/register">Register</a>
    </div>
  </header>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const logout = async () => {
  isMobileMenuOpen.value = false
  authStore.logout()
  await navigateTo('/auth/login', { replace: true })
}

const displayUser = computed(() => {
  if (isLoggedIn.value) {
    return authStore.user?.full_name || authStore.user?.email
  }
  return null
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  padding: $space-small $space-medium;
  background-color: $background-color-tertiary;
  border-bottom: 1px solid $border-color-tertiary;
  box-shadow: $box-shadow;
  z-index: 100;
  height: 50px;

  .user-info {
    display: flex;
    align-items: center;
    gap: $space-small;
    cursor: pointer;

    &-avatar {
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #4CAF50;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 500;
      text-transform: uppercase;
      .char {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &-name {
      @extend .text-medium;
    }
  }

  .nav {
    ul {
      display: flex;
      gap: $space-small;
      list-style: none;
      a {
        text-decoration: none;
        color: $font-color;
        @extend .text-medium;
      }
    }
  }

  .user {
    display: flex;
    gap: $space-small;
    position: relative;

    a {
      text-decoration: none;
      color: $font-color;
      @extend .text-medium;
    }

    .mobile-menu {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      background-color: $background-color-tertiary;
      border: 1px solid $border-color-tertiary;
      border-radius: 4px;
      box-shadow: $box-shadow;
      padding: $space-small;
      margin-top: $space-small;
      min-width: 120px;

      a {
        display: block;
        padding: $space-small;
        text-align: center;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }

      &.is-open {
        display: block;
      }
    }
  }

  @media (max-width: 768px) {
    .user {
      .mobile-menu {
        display: block;
        transform: translateY(-10px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;

        &.is-open {
          display: block;
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }
      }
    }
  }
}
</style>