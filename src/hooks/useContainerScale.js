import { useEffect, useState, useRef } from 'react'

/** Scale content to fit its container while preserving aspect ratio. */
export function useContainerScale(baseWidth, baseHeight, { padding = 0.98, maxScale = 3 } = {}) {
  const ref = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const { width, height } = el.getBoundingClientRect()
      if (width <= 0 || height <= 0) return
      const fit = Math.min(width / baseWidth, height / baseHeight) * padding
      setScale(Math.min(Math.max(fit, 0.55), maxScale))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [baseWidth, baseHeight, padding, maxScale])

  return { ref, scale }
}
