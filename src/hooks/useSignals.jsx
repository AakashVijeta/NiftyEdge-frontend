import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://niftyedge-backend-production.up.railway.app/'

export function useSignals() {
  const [signals, setSignals]         = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => { fetchSignals() }, [])

  async function fetchSignals() {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(`${API}/signals`)
      setSignals(res.data)
      setLastUpdated(new Date())
    } catch {
      setError('Failed to fetch signals. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  return { signals, loading, error, lastUpdated, refetch: fetchSignals }
}