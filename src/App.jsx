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
  const showDashboard = !loading && signals.length > 0
  const showEmpty     = !loading && !error && signals.length === 0
  const showFatalError = !loading && !!error && signals.length === 0

  return (
    <>
      <TopBar />

      <main className="app" id="main-content">
        <div className="app__shell">
          {showFatalError && (
            <div className="error-banner fade-up" role="alert">
              {error}
            </div>
          )}

          {loading && (
            <div className="loading-state" aria-busy="true" aria-live="polite">
              <span className="loading-state__spinner" aria-hidden />
              <span className="loading-state__text">Loading signals</span>
            </div>
          )}

          {showEmpty && (
            <div className="empty-state fade-up">
              <div className="empty-state__title">No signals yet</div>
              <p className="empty-state__text">
                The engine returned no setups for this session. Refresh to try again, or check that the backend is running.
              </p>
              <button type="button" className="empty-state__action" onClick={refetch}>
                Refresh signals
              </button>
            </div>
          )}

          {showDashboard && (
            <>
              {error && (
                <div className="error-banner fade-up" role="alert">
                  {error}
                </div>
              )}
              <div className="dashboard-grid">
              <div className="dashboard__cell dashboard__cell--metrics">
                <Metrics signals={signals} />
              </div>
              <div className="dashboard__cell dashboard__cell--toppick">
                <TopPick signal={signals[0]} />
              </div>
              <div className="dashboard__cell dashboard__cell--table">
                <SignalsTable signals={signals} />
              </div>
              <div className="dashboard__cell dashboard__cell--heatmap">
                <SectorHeatmap signals={signals} />
              </div>
            </div>
            </>
          )}
        </div>
      </main>

      <ChatPanel signals={signals} />
    </>
  )
}
