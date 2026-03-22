import './Metrics.css'

export default function Metrics({ signals }) {
  const count = signals.length
  const avg = count > 0
    ? (signals.reduce((s, x) => s + x.probability, 0) / count * 100).toFixed(1)
    : '—'

  const cards = [
    {
      label: 'Signals Today',
      value: count || '—',
      pill: count > 0 ? { text: 'Above 55%', cls: 'up' } : null,
      sub: count > 0 ? null : 'No signals yet',
    },
    {
      label: 'Avg Confidence',
      value: count > 0 ? `${avg}%` : '—',
      pill: null,
      sub: 'Model confidence',
    },
    {
      label: 'Backtest Win Rate',
      value: '45.6%',
      pill: { text: '2.5% TP · 1.0% SL', cls: 'neu' },
      sub: null,
    },
  ]

  return (
    <div className="metrics">
      {cards.map((c, i) => (
        <div key={i} className="card metric-card fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
          <div className="metric-card__label">{c.label}</div>
          <div className="metric-card__value">{c.value}</div>
          <div className="metric-card__footer">
            {c.pill && <span className={`pill pill--${c.pill.cls}`}>{c.pill.text}</span>}
            {c.sub  && <span className="metric-card__sub">{c.sub}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}
