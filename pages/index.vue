<template>
  <div class="container">
    <div class="hero">
      <h1>Family Sub Manager</h1>
      <p class="subtitle">Simplify your shared subscription management</p>
    </div>

    <div class="features">
      <Card class="feature-card">
        <h2>For Subscription Leaders</h2>
        <p class="feature-description">
          Track members, send reminders, and let the system handle cost calculations automatically.
        </p>
      </Card>

      <Card class="feature-card">
        <h2>For Members</h2>
        <p class="feature-description">
          Access your subscription details, quota, and payment status at a glance.
        </p>
      </Card>
    </div>

    <div class="cta">
      <NuxtLink to="/auth/login" class="btn-primary">Login</NuxtLink>
      <NuxtLink to="/examples" class="btn-secondary">Examples</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'

// Add navigation guard using Nuxt's definePageMeta
definePageMeta({
  middleware: 'guest'
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;

.container {
  max-width: $container-max-width;
  margin: 0 auto;
  padding: $space-large;
  text-align: center;
}

.hero {
  margin-bottom: $space-xxlarge;
  
  h1 {
    font-size: $font-size-xxlarge;
    margin-bottom: $space-medium;
    color: $font-color-tertiary;
    font-weight: $font-weight-bold;
  }
  
  .subtitle {
    font-size: $font-size-large;
    color: $font-color-secondary;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $space-large;
  margin-bottom: $space-xxlarge;
}

.feature-card {
  padding: $space-large;
  transition: all $transition-duration-short;
  &:hover {
    transform: translateY(-4px);
  }
  
  h2 {
    margin-bottom: $space-medium;
    color: $font-color-tertiary;
    font-size: $font-size-large;
  }
  
  .feature-description {
    color: $font-color-secondary;
    line-height: $line-height-large;
    max-width: 400px;
    margin: 0 auto;
  }
}

.cta {
  .btn-primary, .btn-secondary {
    display: inline-block;
    padding: $space-small $space-large;
    margin: 0 $space-small;
    border-radius: $border-radius-small;
    text-decoration: none;
    font-weight: $font-weight-medium;
    transition: all $transition-duration-short;
  }

  .btn-primary {
    background: $background-color-current-user;
    color: $font-color-current-user;
    
    &:hover {
      background: darken($background-color-current-user, 5%);
      box-shadow: $box-shadow;
    }
  }

  .btn-secondary {
    border: 1px solid $border-color-secondary;
    color: $font-color-tertiary;
    
    &:hover {
      background: $background-color-secondary;
      box-shadow: $box-shadow;
    }
  }
}

@media (max-width: $breakpoint-tablet) {
  .features {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: $font-size-xlarge;
  }

  .hero .subtitle {
    font-size: $font-size-medium;
  }
}
</style>