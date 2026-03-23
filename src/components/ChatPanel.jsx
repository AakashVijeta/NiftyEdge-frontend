import { useState, useEffect, useRef } from 'react'
import './ChatPanel.css'

const SUGGESTIONS = [
  'Rank the top 3 setups today',
  'Which signals have the strongest volume confirmation?',
  'Are there any risky entries I should avoid?',
  'Which sectors have the best tailwind today?',
]

export default function ChatPanel({ signals }) {
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  async function send(text) {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')

    const userMessage = { role: 'user', text: msg }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setLoading(true)

    // Build history in OpenAI format (exclude the message we're about to send)
    const history = messages.map(m => ({
      role:    m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    }))

    try {
      const res = await fetch('https://niftyedge-backend-production.up.railway.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, signals, history }),
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'agent', text: data.response }])

    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'agent',
        text: err.message.includes('fetch')
          ? 'Could not reach the AI analyst. Is the backend running?'
          : `Error: ${err.message}`,
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card chat fade-up" style={{ animationDelay: '0.2s' }}>
      <div className="chat__header">
        <div className="chat__title">AI Analyst</div>
        <span className="chat__badge">NiftyEdge</span>
        {messages.length > 0 && (
          <button className="chat__reset" onClick={() => setMessages([])}>↺ Reset</button>
        )}
      </div>

      <div className="chat__body">
        <div className="chat__messages" ref={messagesRef}>
          {messages.length === 0 && (
            <div className="chat__bubble chat__bubble--system">
              {signals.length > 0
                ? `${signals.length} signal${signals.length > 1 ? 's' : ''} loaded for today. Ask me anything about the setups.`
                : 'Waiting for signals to load...'}
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`chat__bubble chat__bubble--${m.role}`}>
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="chat__bubble chat__bubble--thinking">Analysing…</div>
          )}
        </div>

        {messages.length === 0 && (
          <div className="chat__suggestions">
            {SUGGESTIONS.map(s => (
              <button key={s} className="suggestion-btn" onClick={() => send(s)}>
                {s} ↗
              </button>
            ))}
          </div>
        )}

        <div className="chat__input-row">
          <input
            className="chat__input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Ask about today's signals…"
            disabled={loading}
          />
          <button className="chat__send" onClick={() => send()} disabled={loading}>
            {loading ? '…' : 'Ask ↗'}
          </button>
        </div>
      </div>
    </div>
  )
}