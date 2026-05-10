import { useState } from 'react'
import { Activity, Percent, ChartNoAxesCombined } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { ACCENT_HEX } from '../lib/theme'
import SpotlightCard from './SpotlightCard'
import './Metrics.css'

function SignalCountCard({ count, delay, dimmed, onHoverStart, onHoverEnd }) {
  const animated = useCountUp(count, 900)
  return (
    <SpotlightCard
      icon={Activity}
      title="Signals Today"
      color={ACCENT_HEX}
      inlineTitle
      dimmed={dimmed}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="metric-spotlight fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="metric-spotlight__value">{count > 0 ? Math.round(animated) : '—'}</div>
      <div className="metric-spotlight__footer">
        {count > 0
          ? <span className="pill pill--up">Above 55%</span>
          : <span className="metric-spotlight__sub">No signals yet</span>}
      </div>
    </SpotlightCard>
  )
}

function AvgConfCard({ avg, delay, dimmed, onHoverStart, onHoverEnd }) {
  const target   = avg !== '—' ? parseFloat(avg) : 0
  const animated = useCountUp(target, 900)
  return (
    <SpotlightCard
      icon={Percent}
      title="Avg Confidence"
      color={ACCENT_HEX}
      inlineTitle
      dimmed={dimmed}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="metric-spotlight fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="metric-spotlight__value">{avg !== '—' ? `${animated.toFixed(1)}%` : '—'}</div>
      <div className="metric-spotlight__footer">
        <span className="metric-spotlight__sub">Model confidence</span>
      </div>
    </SpotlightCard>
  )
}

function WinRateCard({ delay, dimmed, onHoverStart, onHoverEnd }) {
  const animated = useCountUp(45.6, 900)
  return (
    <SpotlightCard
      icon={ChartNoAxesCombined}
      title="Backtest Win Rate"
      color={ACCENT_HEX}
      inlineTitle
      dimmed={dimmed}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      className="metric-spotlight fade-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="metric-spotlight__value">{animated.toFixed(1)}%</div>
      <div className="metric-spotlight__footer">
        <span className="pill pill--neu">2.5% TP · 1.0% SL</span>
      </div>
    </SpotlightCard>
  )
}

export default function Metrics({ signals }) {
  const [hovered, setHovered] = useState(null)
  const count = signals.length
  const avg   = count > 0
    ? (signals.reduce((s, x) => s + x.probability, 0) / count * 100).toFixed(1)
    : '—'

  return (
    <div className="metrics">
      <SignalCountCard
        count={count}
        delay={0}
        dimmed={hovered !== null && hovered !== 'signals'}
        onHoverStart={() => setHovered('signals')}
        onHoverEnd={() => setHovered(null)}
      />
      <AvgConfCard
        avg={avg}
        delay={0.07}
        dimmed={hovered !== null && hovered !== 'avg'}
        onHoverStart={() => setHovered('avg')}
        onHoverEnd={() => setHovered(null)}
      />
      <WinRateCard
        delay={0.14}
        dimmed={hovered !== null && hovered !== 'win'}
        onHoverStart={() => setHovered('win')}
        onHoverEnd={() => setHovered(null)}
      />
    </div>
  )
}
