import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { cn } from '../lib/utils'
import './SpotlightCard.css'

const MotionCard = motion.div

const TILT_MAX = 4
const TILT_SPRING = { stiffness: 300, damping: 28 }
const GLOW_SPRING = { stiffness: 180, damping: 22 }

/**
 * @param {Object} props
 * @param {import('lucide-react').LucideIcon} [props.icon]
 * @param {string} [props.title]
 * @param {string} [props.subtitle]
 * @param {string} props.color - Accent hex for glow / badge
 * @param {boolean} [props.dimmed]
 * @param {() => void} [props.onHoverStart]
 * @param {() => void} [props.onHoverEnd]
 * @param {import('react').ReactNode} [props.children]
 * @param {string} [props.className]
 * @param {'default' | 'compact' | 'flush'} [props.variant]
 * @param {boolean} [props.hideIcon]
 * @param {boolean} [props.inlineTitle] - title next to icon row (metrics)
 * @param {string} [props.mainClassName] - extra class on content wrapper
 * @param {import('react').CSSProperties} [props.style] - merged onto root (e.g. animation-delay)
 */
export default function SpotlightCard({
  icon: Icon,
  title,
  subtitle,
  color,
  dimmed = false,
  onHoverStart,
  onHoverEnd,
  children,
  className,
  variant = 'default',
  hideIcon = false,
  inlineTitle = false,
  mainClassName,
  style: styleProp,
}) {
  const cardRef = useRef(null)
  const reduceMotion = useReducedMotion()

  const normX = useMotionValue(0.5)
  const normY = useMotionValue(0.5)

  const rawRotateX = useTransform(normY, [0, 1], [TILT_MAX, -TILT_MAX])
  const rawRotateY = useTransform(normX, [0, 1], [-TILT_MAX, TILT_MAX])

  const rotateX = useSpring(rawRotateX, TILT_SPRING)
  const rotateY = useSpring(rawRotateY, TILT_SPRING)
  const glowOpacity = useSpring(0, GLOW_SPRING)

  const hex14 = `${color}14`
  const hex2e = `${color}2e`
  const hex18 = `${color}18`
  const hex30 = `${color}30`

  function handleMouseMove(e) {
    if (reduceMotion) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    normX.set((e.clientX - rect.left) / rect.width)
    normY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseEnter() {
    if (!reduceMotion) glowOpacity.set(1)
    onHoverStart?.()
  }

  function handleMouseLeave() {
    normX.set(0.5)
    normY.set(0.5)
    if (!reduceMotion) glowOpacity.set(0)
    onHoverEnd?.()
  }

  const motionStyle = reduceMotion
    ? { transformPerspective: 900, ...styleProp }
    : {
        rotateX,
        rotateY,
        transformPerspective: 900,
        ...styleProp,
      }

  return (
    <MotionCard
      ref={cardRef}
      className={cn(
        'spotlight-card',
        variant === 'compact' && 'spotlight-card--compact',
        variant === 'flush' && 'spotlight-card--flush',
        className,
      )}
      data-dimmed={dimmed ? 'true' : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={motionStyle}
    >
      <div
        aria-hidden
        className="spotlight-card__tint"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${hex14}, transparent 65%)`,
        }}
      />

      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="spotlight-card__glow"
          style={{
            opacity: glowOpacity,
            background: `radial-gradient(ellipse at 35% 30%, ${hex2e}, transparent 62%)`,
          }}
        />
      )}

      <div aria-hidden className="spotlight-card__shimmer" />

      {inlineTitle && (Icon || title) ? (
        <div className="spotlight-card__row">
          {!hideIcon && Icon && (
            <div
              className="spotlight-card__badge"
              style={{
                background: hex18,
                boxShadow: `inset 0 0 0 1px ${hex30}`,
              }}
            >
              <Icon size={17} strokeWidth={1.9} style={{ color }} aria-hidden />
            </div>
          )}
          <div className="spotlight-card__body">
            {title && <h3 className="spotlight-card__title">{title}</h3>}
            {subtitle && <p className="spotlight-card__subtitle">{subtitle}</p>}
          </div>
        </div>
      ) : (
        <>
          {!hideIcon && Icon && (
            <div
              className="spotlight-card__badge"
              style={{
                background: hex18,
                boxShadow: `inset 0 0 0 1px ${hex30}`,
              }}
            >
              <Icon size={17} strokeWidth={1.9} style={{ color }} aria-hidden />
            </div>
          )}
          {(title || subtitle) && (
            <div className="spotlight-card__body">
              {title && <h3 className="spotlight-card__title">{title}</h3>}
              {subtitle && <p className="spotlight-card__subtitle">{subtitle}</p>}
            </div>
          )}
        </>
      )}

      {children != null && (
        <div className={cn('spotlight-card__main', mainClassName)}>{children}</div>
      )}

      <div aria-hidden className="spotlight-card__accent-line" />
    </MotionCard>
  )
}
