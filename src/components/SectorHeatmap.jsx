import './SectorHeatmap.css'

function heatClass(mom) {
  if (mom > 0.015) return 'hot'
  if (mom > 0)     return 'warm'
  return 'cool'
}

export default function SectorHeatmap({ signals }) {
  const sectorMap = {}
  signals.forEach(s => {
    if (!sectorMap[s.sector])
      sectorMap[s.sector] = { count: 0, momentum: s.sector_momentum ?? 0 }
    sectorMap[s.sector].count++
  })
  const sectors = Object.entries(sectorMap).sort((a, b) => b[1].count - a[1].count)

  return (
    <div className="card heatmap fade-up" style={{ animationDelay: '0.15s' }}>
      <div className="heatmap__header">
        <div className="heatmap__title">Sector Momentum</div>
      </div>
      <div className="heatmap__body">
        <div className="heatmap__grid">
          {sectors.map(([name, data]) => (
            <div key={name} className={`heat-cell heat-cell--${heatClass(data.momentum)}`}>
              <div className="heat-cell__left">
                <div className="heat-cell__name">{name}</div>
                <div className="heat-cell__mom">
                  {data.momentum ? `${(data.momentum * 100).toFixed(1)}% / 10d` : '—'}
                </div>
              </div>
              <div className="heat-cell__right">
                <div className="heat-cell__count">{data.count}</div>
                <div className="heat-cell__count-label">signal(s)</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}