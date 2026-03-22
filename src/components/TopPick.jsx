import './TopPick.css'

function StatBox({ label, value, color }) {
  return (
    <div className="stat-box">
      <div className="stat-box__label">{label}</div>
      <div className="stat-box__value" style={{ color: color || 'var(--text)' }}>{value}</div>
    </div>
  )
}

export default function TopPick({ signal }) {
  if (!signal) return (
    <div className="card top-pick">
      <div className="top-pick__empty">No signals today</div>
    </div>
  )

  const rsiColor = signal.rsi >= 60 ? 'var(--amber)' : signal.rsi >= 45 ? 'var(--green)' : 'var(--red)'
  const volColor = signal.volume_ratio >= 1.5 ? 'var(--green)' : signal.volume_ratio >= 1.1 ? 'var(--amber)' : 'var(--text2)'
  const bbColor  = signal.bb_position >= 0.8 ? 'var(--red)' : signal.bb_position >= 0.6 ? 'var(--amber)' : 'var(--green)'
  const smColor  = signal.sector_momentum > 0.015 ? 'var(--green)' : signal.sector_momentum > 0 ? 'var(--amber)' : 'var(--red)'
  const pct      = (signal.probability * 100).toFixed(1)

  return (
    <div className="card card--accent top-pick fade-up">
      <div className="top-pick__eyebrow">Top Pick</div>

      <div className="top-pick__ticker">{signal.ticker.replace('.NS', '')}</div>
      <div className="top-pick__meta">
        <span className="top-pick__sector">{signal.sector}</span>
        <span className="top-pick__exchange">NSE</span>
      </div>

      <div className="top-pick__confidence">
        <div className="top-pick__pct">{pct}%</div>
        <div className="top-pick__conf-label">model confidence</div>
      </div>

      <div className="top-pick__bar-track">
        <div className="top-pick__bar-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="top-pick__divider" />

      <div className="top-pick__stats">
        <StatBox label="RSI"           value={signal.rsi?.toFixed(1) ?? '—'}                                    color={rsiColor} />
        <StatBox label="Vol Ratio"     value={signal.volume_ratio ? `${signal.volume_ratio.toFixed(2)}×` : '—'} color={volColor} />
        <StatBox label="BB Position"   value={signal.bb_position?.toFixed(2) ?? '—'}                            color={bbColor}  />
        <StatBox label="Sector Mom."   value={signal.sector_momentum ? `${(signal.sector_momentum*100).toFixed(1)}%` : '—'} color={smColor} />
        <StatBox label="vs Nifty"      value={signal.rs_vs_nifty ? `+${signal.rs_vs_nifty.toFixed(1)}` : '—'}  color="var(--green)" />
        <StatBox label="Rank"          value="#1"                                                               color="var(--text2)" />
      </div>

      <div className="top-pick__actions">
        <div className="action-chip action-chip--buy">
          <div className="action-chip__label">Signal</div>
          <div className="action-chip__value">BUY</div>
        </div>
        <div className="action-chip action-chip--tp">
          <div className="action-chip__label">Target</div>
          <div className="action-chip__value">+2.5%</div>
        </div>
        <div className="action-chip action-chip--sl">
          <div className="action-chip__label">Stop Loss</div>
          <div className="action-chip__value">−1.0%</div>
        </div>
      </div>
    </div>
  )
}