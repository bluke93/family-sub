<template>
  <Header />
  <div class="page-wrapper">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/_variables.scss' as *;
.page-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
}
</style>