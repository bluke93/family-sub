<template>
  <NuxtLayout>
    <div class="container">
      <h1>Error</h1>
      <p>{{ error?.statusCode }}</p>
      <p>{{ error?.statusMessage }}</p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const error = useError()
</script>