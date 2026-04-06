/**
 * REST API Execution: Fetches data via HTTP using the API Key.
 */
export const fetchRestData = async (path = '/api/collection', queryString = '') => {
  const apiKey = process.env.PAYLOAD_API_KEY
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  

  const response = await fetch(`${baseUrl}${path}${queryString}`, {
    method: 'GET',
    headers: {
      'Authorization': `users API-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // Optional Next.js caching
  })

  if (!response.ok) {
    throw new Error(`Payload REST Error: ${response.statusText}`)
  }

  return await response.json()
}