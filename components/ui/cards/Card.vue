<template>
  <div class="card">
    <slot />
  </div>
</template>


<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;

.card {
  position: relative;
  background-color: $background-color-tertiary;
  border-radius: $border-radius-medium;
  padding: $space-medium;
  box-shadow: $box-shadow;
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
}
</style>