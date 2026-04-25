import { useCountUp } from '../hooks/useCountUp'
import './Metrics.css'

function SignalCountCard({ count, delay }) {
  const animated = useCountUp(count, 900)
  return (
    <div className="card metric-card fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="metric-card__label">Signals Today</div>
      <div className="metric-card__value">{count > 0 ? Math.round(animated) : '—'}</div>
      <div className="metric-card__footer">
        {count > 0
          ? <span className="pill pill--up">Above 55%</span>
          : <span className="metric-card__sub">No signals yet</span>}
      </div>
    </div>
  )
}

function AvgConfCard({ avg, delay }) {
  const target   = avg !== '—' ? parseFloat(avg) : 0
  const animated = useCountUp(target, 900)
  return (
    <div className="card metric-card fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="metric-card__label">Avg Confidence</div>
      <div className="metric-card__value">{avg !== '—' ? `${animated.toFixed(1)}%` : '—'}</div>
      <div className="metric-card__footer">
        <span className="metric-card__sub">Model confidence</span>
      </div>
    </div>
  )
}

function WinRateCard({ delay }) {
  const animated = useCountUp(45.6, 900)
  return (
    <div className="card metric-card fade-up" style={{ animationDelay: `${delay}s` }}>
      <div className="metric-card__label">Backtest Win Rate</div>
      <div className="metric-card__value">{animated.toFixed(1)}%</div>
      <div className="metric-card__footer">
        <span className="pill pill--neu">2.5% TP · 1.0% SL</span>
      </div>
    </div>
  )
}

export default function Metrics({ signals }) {
  const count = signals.length
  const avg   = count > 0
    ? (signals.reduce((s, x) => s + x.probability, 0) / count * 100).toFixed(1)
    : '—'

  return (
    <div className="metrics">
      <SignalCountCard count={count} delay={0}    />
      <AvgConfCard     avg={avg}     delay={0.07} />
      <WinRateCard                   delay={0.14} />
    </div>
  )
}
