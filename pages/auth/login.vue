<template>
  <div class="container">
    <Card>
      <form @submit.prevent="handleSubmit" class="form-wrapper">
        <div class="form-field">
          <label for="email">Email</label>  
          <input type="email" placeholder="Email" v-model="email" required/>
        </div>
        <div class="form-field">
          <label for="password">Password</label>
          <input type="password" placeholder="Password" v-model="password" required/>
        </div>
        <input type="submit" class="btn-primary" value="Login"/>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'
definePageMeta({
  layout: 'default',
  middleware: 'guest',
})

const authStore = useAuthStore()

const handleSubmit = async () => {
  try {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
      watch: false,
    })

    console.log(data)

    if (data.user) {
      authStore.setUser({
        id: data.user.id,
        email: data.user.email as string,
        created_at: data.user.created_at,
        full_name: data.user.user_metadata.full_name,
      })
      authStore.setToken(data.session.access_token)

      navigateTo('/dashboard')
    } else {
      console.error('User not found')
    }
  } catch (error) {
    console.error(error)
  }
}

const email = ref('')
const password = ref('')
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $space-large;
  max-width: 400px;
  margin: 0 auto;

  .form-wrapper {
    padding: $space-large;
    display: flex;
    flex-direction: column;
    gap: $space-medium;
    max-width: 400px;

    .form-field {
      display: flex;
      flex-direction: column;
      gap: $space-small;
      label {
        font-weight: $font-weight-medium;
        font-size: $font-size-small;
        color: $font-color-tertiary;
      }
      input {
        padding: $space-small;
        border-radius: $border-radius-small;
        border: 1px solid $border-color-tertiary;
        background-color: transparent;
        color: $font-color-tertiary;
      }
    }

    .btn-primary {
      width: auto;
      display: inline-block;
      padding: $space-small $space-large;
      border-radius: $border-radius-small;
      border: none;
      text-decoration: none;
      font-weight: $font-weight-medium;
      transition: all $transition-duration-short;
      color: $font-color-current-user;
      background: $background-color-secondary;
      border: 1px solid $border-color-tertiary;
        &:hover {
          background: $background-color-secondary;
          box-shadow: $box-shadow;
        }
    }
  }
}

</style>