import { useState, useEffect } from 'react'

export function useCountUp(target, duration = 1000) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const num = parseFloat(target)
    if (isNaN(num)) { setValue(target); return }
    if (num === 0)  { setValue(0); return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(num); return }

    const start = performance.now()
    let rafId

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setValue(num * eased)
      if (progress < 1) rafId = requestAnimationFrame(tick)
      else setValue(num)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration])

  return value
}
