import { useState, useEffect, useRef } from 'react'
import './TopBar.css'

function getIST() {
  const now = new Date()
  const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)
  const h = String(ist.getUTCHours()).padStart(2, '0')
  const m = String(ist.getUTCMinutes()).padStart(2, '0')
  const s = String(ist.getUTCSeconds()).padStart(2, '0')
  return `${h}:${m}:${s} IST`
}

function isMarketOpen() {
  const now  = new Date()
  const ist  = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)
  const day  = ist.getUTCDay()
  const mins = ist.getUTCHours() * 60 + ist.getUTCMinutes()
  if (day === 0 || day === 6) return false
  return mins >= 555 && mins <= 930
}

function useNiftyPrice() {
  const [data, setData] = useState({ price: null, change: null, changePct: null })

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res       = await window.fetch('/api/nifty')
        const json      = await res.json()
        const result    = json.chart.result[0]
        const meta      = result.meta
        const price     = meta.regularMarketPrice
        const prevClose = meta.chartPreviousClose
        const change    = +(price - prevClose).toFixed(2)
        const changePct = +((change / prevClose) * 100).toFixed(2)
        if (!isNaN(price)) setData({ price, change, changePct })
      } catch (err) {
        console.error('Nifty Fetch Error:', err)
      }
    }
    fetchPrice()
    const t = setInterval(fetchPrice, 5 * 60 * 1000)
    return () => clearInterval(t)
  }, [])

  return data
}

export default function TopBar({ onRefetch }) {
  const [clock, setClock] = useState(getIST())
  const [flash, setFlash] = useState(false)
  const { price, change, changePct } = useNiftyPrice()
  const prevPrice  = useRef(null)
  const marketOpen = isMarketOpen()

  useEffect(() => {
    const t = setInterval(() => setClock(getIST()), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (price !== null && prevPrice.current !== null && price !== prevPrice.current) {
      setFlash(true)
      const t = setTimeout(() => setFlash(false), 800)
      return () => clearTimeout(t)
    }
    prevPrice.current = price
  }, [price])

  const isUp      = change >= 0
  const priceStr  = price     != null ? price.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '—'
  const changeStr = change    != null ? `${isUp ? '+' : ''}${change.toFixed(2)}` : ''
  const pctStr    = changePct != null ? `(${isUp ? '+' : ''}${changePct.toFixed(2)}%)` : ''

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <div className="topbar__logo">Nifty<span>Edge</span></div>
        <div className="topbar__sub">Swing Signal System</div>
      </div>

      <div className="topbar__right">
        <div className={`topbar__market-status ${marketOpen ? 'topbar__market-status--open' : 'topbar__market-status--closed'}`}>
          <span className="topbar__market-dot" />
          {marketOpen ? 'MARKET OPEN' : 'MARKET CLOSED'}
        </div>

        <div className="topbar__divider" />

        <div className="topbar__index-card">
          <span className="topbar__index-name">NIFTY 50</span>
          <span className={[
            'topbar__index-price',
            price != null ? (isUp ? 'topbar__index-price--up' : 'topbar__index-price--down') : '',
            flash ? 'topbar__index-price--flash' : '',
          ].filter(Boolean).join(' ')}>
            {priceStr}
          </span>
          {change != null && (
            <span className={`topbar__index-change ${isUp ? 'topbar__index-change--up' : 'topbar__index-change--down'}`}>
              {changeStr} {pctStr}
            </span>
          )}
        </div>

        <div className="topbar__divider" />

        <span className="topbar__clock">{clock}</span>

        <button className="topbar__refresh" onClick={onRefetch}>↻ Refresh</button>
      </div>
    </header>
  )
}
