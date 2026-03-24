import { useState, useEffect } from 'react'
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
  const [data, setData] = useState({ price: null, change: null, changePct: null });

  useEffect(() => {
    async function fetchPrice() {
  try {
    const res = await window.fetch('/api/nifty');
    const json = await res.json();

    // Yahoo's path to data
    const result = json.chart.result[0];
    const price = result.meta.regularMarketPrice;
    const prevClose = result.meta.chartPreviousClose;
    
    const change = +(price - prevClose).toFixed(2);
    const changePct = +((change / prevClose) * 100).toFixed(2);

    if (!isNaN(price)) {
      setData({ price, change, changePct });
    }
  } catch (err) {
    console.error("Nifty Fetch Error:", err);
  }
}
    fetchPrice();
    
    // Check if isMarketOpen exists in your utils, otherwise remove this guard
    // if (typeof isMarketOpen === 'function' && !isMarketOpen()) return;

    const t = setInterval(fetchPrice, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(t);
  }, []);

  return data;
}

export default function TopBar({ onRefetch }) {
  const [clock, setClock] = useState(getIST())
  const { price, change, changePct } = useNiftyPrice()

  useEffect(() => {
    const t = setInterval(() => setClock(getIST()), 1000)
    return () => clearInterval(t)
  }, [])

  const isUp      = change >= 0
  const priceStr  = price != null ? price.toLocaleString('en-IN', { maximumFractionDigits: 2 }) : '—'
  const changeStr = change != null ? `${isUp ? '+' : ''}${change.toFixed(2)}` : ''
  const pctStr    = changePct != null ? `(${isUp ? '+' : ''}${changePct.toFixed(2)}%)` : ''

  return (
    <div className="topbar">
      <div className="topbar__brand">
        <div className="topbar__logo">Nifty<span>Edge</span></div>
        <div className="topbar__sub">Swing Signal System</div>
      </div>

      <div className="topbar__right">
        <div className="topbar__index-card">
          <span className="topbar__index-name">NIFTY 50</span>
          <span className={`topbar__index-price${price != null ? (isUp ? ' topbar__index-price--up' : ' topbar__index-price--down') : ''}`}>
            {priceStr}
          </span>
          {change != null && (
            <span className={`topbar__index-change ${isUp ? 'topbar__index-change--up' : 'topbar__index-change--down'}`}>
              {changeStr} {pctStr}
            </span>
          )}
        </div>

        <div className="topbar__divider" />

        <div className="topbar__live">
          <span className="topbar__live-dot" />
          LIVE
        </div>

        <span className="topbar__clock">{clock}</span>

        <button className="topbar__refresh" onClick={onRefetch}>↻ Refresh</button>
      </div>
    </div>
  )
}