import './index.css'
import { useSignals } from './hooks/useSignals'
import TopBar        from './components/TopBar'
import Metrics       from './components/Metrics'
import TopPick       from './components/TopPick'
import SignalsTable  from './components/SignalsTable'
import SectorHeatmap from './components/SectorHeatmap'
import ChatPanel     from './components/ChatPanel'

export default function App() {
  const { signals, loading, error, refetch } = useSignals()

  return (
    <div className="app">
      <TopBar onRefetch={refetch} />
      <div className="topbar-line" />

      {error && <div className="error-banner fade-up">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <span className="loading-state__text">LOADING SIGNALS</span>
          <span className="loading-state__dots" />
        </div>
      ) : (
        <div className="dashboard-grid">

          {/* Left column: metrics + signals table */}
          <div className="col-signals">
            <Metrics signals={signals} />
            <SignalsTable signals={signals} />
          </div>

          {/* Middle column: top pick + sector momentum */}
          <div className="col-middle">
            <TopPick signal={signals[0]} />
            <SectorHeatmap signals={signals} />
          </div>

          {/* Right column: AI analyst */}
          <div className="col-chat">
            <ChatPanel signals={signals} />
          </div>

        </div>
      )}
    </div>
  )
}