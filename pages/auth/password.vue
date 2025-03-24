<template>
  <div class="container">
    <Card>
      <form @submit.prevent="handleSubmit" class="form-wrapper">
        <div class="form-field">
          <label for="current_password">Current Password</label>
          <input 
            type="password" 
            placeholder="Current Password" 
            v-model="currentPassword" 
            required
          />
        </div>
        <div class="form-field">
          <label for="new_password">New Password</label>
          <input 
            type="password" 
            placeholder="New Password" 
            v-model="newPassword" 
            required
          />
        </div>
        <div class="form-field">
          <label for="confirm_password">Confirm New Password</label>
          <input 
            type="password" 
            placeholder="Confirm New Password" 
            v-model="confirmPassword" 
            required
          />
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <input type="submit" class="btn-primary" value="Change Password"/>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'

definePageMeta({
  layout: 'default',
  middleware: 'auth', // Ensure user is authenticated to access this page
})

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  
  // Validate passwords match
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'New passwords do not match'
    return
  }

  try {
    const { error: updateError } = await $fetch('/api/auth/update-password', {
      method: 'POST',
      body: {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      },
    })

    if (updateError) {
      error.value = updateError.message
      return
    }

    // Clear form and show success
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    alert('Password updated successfully')
    
    // Optionally redirect
    navigateTo('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'An error occurred while updating password'
  }
}
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

    .error-message {
      color: red;
      font-size: $font-size-small;
      margin-top: $space-small;
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
