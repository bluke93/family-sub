<template>
  <header class="header">
    <div class="logo">
      NSOS
    </div>
    <div class="nav">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
    <div v-if="isLoggedIn" class="user">
      <div class="user-info">
        <div class="user-info-name">{{ displayUser }}</div>
      </div>
      <a href="/auth/login" @click="logout">Logout</a>
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

const logout = () => {
  authStore.logout()
  navigateTo('/auth/login')
}

const displayUser = computed(() => {
  if (isLoggedIn.value) {
    return authStore.user?.email
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

    a {
      text-decoration: none;
      color: $font-color;
      @extend .text-medium;
    }
  }
}
</style>