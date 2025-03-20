<template>
  <div class="card-container">
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>


<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;

.card-container {
  position: relative;
  background-color: $background-color-tertiary;
  border-radius: $border-radius-medium;
  box-shadow: $box-shadow;
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  .card-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>