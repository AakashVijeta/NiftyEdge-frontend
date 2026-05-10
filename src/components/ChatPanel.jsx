import { useState, useEffect, useRef } from 'react'
import { MessageSquareText } from 'lucide-react'
import './ChatPanel.css'

const DRAWER_ID = 'ai-analyst-drawer'

const SUGGESTIONS = [
  'Rank the top 3 setups today',
  'Which signals have the strongest volume confirmation?',
  'Are there any risky entries I should avoid?',
  'Which sectors have the best tailwind today?',
]

export default function ChatPanel({ signals }) {
  const [isOpen,   setIsOpen]   = useState(false)
  const [messages, setMessages] = useState([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const messagesRef = useRef(null)
  const inputRef    = useRef(null)

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKey(e) { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const id = requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
    return () => cancelAnimationFrame(id)
  }, [isOpen])

  async function send(text) {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput('')

    const nextMessages = [...messages, { role: 'user', text: msg }]
    setMessages(nextMessages)
    setLoading(true)

    const history = messages.map(m => ({
      role:    m.role === 'user' ? 'user' : 'assistant',
      content: m.text,
    }))

    try {
      const res = await fetch('https://niftyedge-backend-rt2s.onrender.com/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message: msg, signals, history }),
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
    <>
      <button
        type="button"
        className="chat-trigger"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Analyst chat"
        aria-expanded={isOpen}
        aria-controls={DRAWER_ID}
        tabIndex={isOpen ? -1 : 0}
        aria-hidden={isOpen}
      >
        <span className="chat-trigger__icon" aria-hidden>
          <MessageSquareText size={18} strokeWidth={2} />
        </span>
        <span className="chat-trigger__label chat-trigger__label-full">AI Analyst</span>
        <span className="chat-trigger__label chat-trigger__label-short">AI</span>
      </button>

      {isOpen && (
        <div
          className="chat-backdrop"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        id={DRAWER_ID}
        className={`chat${isOpen ? ' chat--open' : ''}`}
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-label="AI Analyst"
        aria-hidden={!isOpen}
      >
        <div className="chat__header">
          <div className="chat__title">AI Analyst</div>
          <span className="chat__badge">NiftyEdge</span>
          <div className="chat__header-actions">
            {messages.length > 0 && (
              <button type="button" className="chat__reset" onClick={() => setMessages([])}>
                ↺ Reset
              </button>
            )}
            <button
              type="button"
              className="chat__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Analyst"
            >
              ✕
            </button>
          </div>
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
              <div className="chat__bubble chat__bubble--thinking" aria-live="polite">
                Analysing…
              </div>
            )}
          </div>

          {messages.length === 0 && (
            <div className="chat__suggestions">
              {SUGGESTIONS.map(s => (
                <button
                  type="button"
                  key={s}
                  className="suggestion-btn"
                  onClick={() => send(s)}
                >
                  {s} ↗
                </button>
              ))}
            </div>
          )}

          <div className="chat__input-row">
            <input
              ref={inputRef}
              className="chat__input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder="Ask about today's signals…"
              disabled={loading}
              aria-label="Message to AI Analyst"
            />
            <button
              type="button"
              className="chat__send"
              onClick={() => send()}
              disabled={loading}
            >
              {loading ? '…' : 'Ask ↗'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
