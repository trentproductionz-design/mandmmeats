const SHEETS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbxyY3aIgMBlyDa9J4vr1fRrQJwijExJ2fllxygkM2HLugdDW2XiomiqN-up1AYBVR97/exec'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const url = `${SHEETS_ENDPOINT}?data=${encodeURIComponent(JSON.stringify(req.body))}`
    await fetch(url)
    res.status(200).send('OK')
  } catch (err) {
    res.status(500).send('Error')
  }
}
