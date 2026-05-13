import { useState } from 'react'
import { Layers } from 'lucide-react'
import SpotlightCard from './SpotlightCard'
import './SectorHeatmap.css'

function heatColor(mom) {
  if (mom > 0.015) return '#00c853'
  if (mom > 0)     return '#ffc107'
  return '#ff5252'
}

export default function SectorHeatmap({ signals }) {
  const [hovered, setHovered] = useState(null)
  const sectorMap = {}
  signals.forEach(s => {
    if (!sectorMap[s.sector])
      sectorMap[s.sector] = { count: 0, momentum: s.sector_momentum ?? 0 }
    sectorMap[s.sector].count++
  })
  const sectors = Object.entries(sectorMap).sort((a, b) => b[1].count - a[1].count)

  return (
    <div className="heatmap-section fade-up" style={{ animationDelay: '0.15s' }}>
      <h2 className="heatmap-section__title">Sector Momentum</h2>

      {sectors.length === 0 ? (
        <div className="heatmap-section__empty">No sector data for current signals.</div>
      ) : (
        <div className="heatmap-section__grid">
          {sectors.map(([name, data]) => {
            const color = heatColor(data.momentum)
            return (
              <SpotlightCard
                key={name}
                variant="compact"
                icon={Layers}
                title={name}
                color={color}
                inlineTitle
                dimmed={hovered !== null && hovered !== name}
                onHoverStart={() => setHovered(name)}
                onHoverEnd={() => setHovered(null)}
                className="heat-spotlight"
              >
                <div className="heat-spotlight__row">
                  <span className="heat-spotlight__mom">
                    {data.momentum ? `${(data.momentum * 100).toFixed(1)}% / 10d` : '—'}
                  </span>
                  <div className="heat-spotlight__count-block">
                    <span className="heat-spotlight__count">{data.count}</span>
                    <span className="heat-spotlight__count-label">signal(s)</span>
                  </div>
                </div>
              </SpotlightCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
