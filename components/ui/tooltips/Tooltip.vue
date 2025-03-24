<template>
  <Teleport to="body">
    <div v-if="isVisible && isDesktop" class="tooltip" :style="tooltipStyle">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface TooltipProps {
  targetId: string
  offset?: {
    x: number
    y: number
  }
}

interface Position {
  x: number
  y: number
}

const props = withDefaults(defineProps<TooltipProps>(), {
  offset: () => ({ x: 10, y: 10 })
})

const isVisible = ref<boolean>(false)
const position = ref<Position>({ x: 0, y: 0 })
const isDesktop = ref(false)

const tooltipStyle = computed(() => {
  const tooltipElement = document.querySelector('.tooltip')
  let finalX = position.value.x + props.offset.x
  let finalY = position.value.y + props.offset.y

  if (tooltipElement) {
    const tooltipRect = tooltipElement.getBoundingClientRect()
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Adjust horizontal position if tooltip would overflow
    if (finalX + tooltipRect.width > windowWidth) {
      finalX = position.value.x - tooltipRect.width - props.offset.x
    }

    // Adjust vertical position if tooltip would overflow
    if (finalY + tooltipRect.height > windowHeight) {
      finalY = position.value.y - tooltipRect.height - props.offset.y
    }
  }

  return {
    position: 'fixed' as const,
    left: `${finalX}px`,
    top: `${finalY}px`,
    zIndex: 9999
  }
})

const updatePosition = (event: MouseEvent): void => {
  position.value = {
    x: event.clientX,
    y: event.clientY
  }
}

const showTooltip = (): void => {
  isVisible.value = true
}

const hideTooltip = (): void => {
  isVisible.value = false
}

const checkIfDesktop = () => {
  isDesktop.value = window.matchMedia('(min-width: 1024px)').matches
}

onMounted(() => {
  checkIfDesktop()
  window.addEventListener('resize', checkIfDesktop)

  const targetElement = document.getElementById(props.targetId)
  if (!targetElement || !isDesktop.value) {
    if (!targetElement) {
      console.warn(`Tooltip target element with id "${props.targetId}" not found`)
    }
    return
  }

  targetElement.addEventListener('mouseenter', showTooltip)
  targetElement.addEventListener('mouseleave', hideTooltip)
  targetElement.addEventListener('mousemove', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIfDesktop)
  
  const targetElement = document.getElementById(props.targetId)
  if (!targetElement || !isDesktop.value) return

  targetElement.removeEventListener('mouseenter', showTooltip)
  targetElement.removeEventListener('mouseleave', hideTooltip)
  targetElement.removeEventListener('mousemove', updatePosition)
})
</script>

<style scoped lang="scss">
.tooltip {
  $background-color: rgba(0, 0, 0, 0.8);
  background-color: $background-color;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  pointer-events: none;
  max-width: 300px;
  word-wrap: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: tooltip-fade 0.2s ease-in-out;
  
  @keyframes tooltip-fade {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
