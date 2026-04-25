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
    <>
      <TopBar onRefetch={refetch} />

      <div className="app">
        {error && <div className="error-banner fade-up">{error}</div>}

        {loading ? (
          <div className="loading-state">
            <span className="loading-state__text">LOADING SIGNALS</span>
            <span className="loading-state__dots" />
          </div>
        ) : (
          <div className="dashboard-grid">
            <div className="col-left">
              <Metrics signals={signals} />
              <SignalsTable signals={signals} />
            </div>
            <div className="col-right">
              <TopPick signal={signals[0]} />
              <SectorHeatmap signals={signals} />
            </div>
          </div>
        )}
      </div>

      <ChatPanel signals={signals} />
    </>
  )
}