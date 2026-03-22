import { useState, useEffect, useRef } from 'react'
import './ChatPanel.css'

const SUGGESTIONS = [
  'Explain the top signal',
  'Which signals have the strongest volume?',
  'What sectors should I avoid today?',
]

export default function ChatPanel({ signals }) {
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const bottomRef               = useRef(null)

  const isFirstRender = useRef(true)

useEffect(() => {
  const el = bottomRef.current
  if (!el) return

  el.scrollIntoView({ behavior: messages.length > 1 ? 'smooth' : 'auto' })
}, [messages])

  async function send(text) {
    const msg = text || input.trim()
    if (!msg) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, signals }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'agent', text: data.response }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'agent',
        text: 'Could not reach the AI analyst. Is the backend running?',
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card chat fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="chat__header">
        <div className="chat__title">AI Analyst</div>
        <span className="chat__badge">Claude</span>
        {messages.length > 0 && (
          <button className="chat__reset" onClick={() => setMessages([])}>↺ Reset</button>
        )}
      </div>

      <div className="chat__body">
        <div className="chat__messages">
          {messages.length === 0 && (
            <div className="chat__bubble chat__bubble--system">
              {signals.length > 0
                ? `${signals.length} signals loaded for today. Ask me anything about the setups.`
                : 'Waiting for signals to load...'}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`chat__bubble chat__bubble--${m.role}`}>{m.text}</div>
          ))}
          {loading && (
            <div className="chat__bubble chat__bubble--thinking">Thinking...</div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length === 0 && (
          <div className="chat__suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="suggestion-btn" onClick={() => send(s)}>{s} ↗</button>
            ))}
          </div>
        )}

        <div className="chat__input-row">
          <input
            className="chat__input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Ask about today's signals..."
          />
          <button className="chat__send" onClick={() => send()}>Ask ↗</button>
        </div>
      </div>
    </div>
  )
}