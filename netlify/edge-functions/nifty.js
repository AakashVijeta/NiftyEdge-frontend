export default async (req) => {
  try {
    // We use range=1d and interval=1m for the most recent data
    const url = 'https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?interval=1m&range=1d';
    
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Yahoo Blocked Request" }), { status: res.status });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export const config = { path: '/api/nifty' };