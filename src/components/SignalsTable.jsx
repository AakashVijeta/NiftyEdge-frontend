import { useState } from 'react'
import './SignalsTable.css'

function volLevel(v)  { return v >= 1.5 ? 'up' : v >= 1.1 ? 'mid' : 'neu' }
function smLevel(v)   { return v > 0.015 ? 'up' : v > 0 ? 'mid' : 'down' }
function rsiColor(v)  { return v >= 60 ? 'var(--amber)' : v >= 45 ? 'var(--green)' : 'var(--red)' }

export default function SignalsTable({ signals }) {
  const sectors = ['All', ...new Set(signals.map(s => s.sector))]
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? signals : signals.filter(s => s.sector === active)

  return (
    <div className="card signals fade-up" style={{ animationDelay: '0.1s' }}>
      <div className="signals__header">
        <div>
          <span className="signals__title">All Signals</span>
          <span className="signals__count">{filtered.length} stocks</span>
        </div>
        <div className="signals__filters">
          {sectors.map(s => (
            <button
              key={s}
              className={`filter-btn${active === s ? ' filter-btn--active' : ''}`}
              onClick={() => setActive(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="signals__empty">No signals for this sector today.</div>
      ) : (
        <table className="signals__table">
          <thead>
            <tr>
              <th>Stock</th>
              <th>Confidence</th>
              <th>RSI</th>
              <th>Volume</th>
              <th className="col-sm">Sector Mom.</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sig => {
              const pct = (sig.probability * 100).toFixed(1)
              return (
                <tr key={sig.ticker}>
                  <td>
                    <div className="sig-ticker">{sig.ticker.replace('.NS', '')}</div>
                    <div className="sig-sector">{sig.sector}</div>
                  </td>
                  <td className="sig-prob-cell">
                    <span className="sig-prob">{pct}%</span>
                  </td>
                  <td className="sig-rsi-cell">
                    <span className="sig-rsi-val" style={{ color: rsiColor(sig.rsi) }}>
                      {sig.rsi?.toFixed(1) ?? '—'}
                    </span>
                    <div className="sig-rsi-bar">
                      <div className="sig-rsi-fill" style={{
                        width: `${Math.min(sig.rsi ?? 0, 100)}%`,
                        background: rsiColor(sig.rsi),
                      }} />
                    </div>
                  </td>
                  <td className="sig-chip-cell">
                    <span className={`pill pill--${volLevel(sig.volume_ratio)}`}>
                      {sig.volume_ratio ? `${sig.volume_ratio.toFixed(2)}×` : '—'}
                    </span>
                  </td>
                  <td className="col-sm sig-chip-cell">
                    <span className={`pill pill--${smLevel(sig.sector_momentum)}`}>
                      {sig.sector_momentum ? `${(sig.sector_momentum * 100).toFixed(1)}%` : '—'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
