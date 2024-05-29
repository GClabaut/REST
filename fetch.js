export async function REST({ url, query, method, data }) {

  const result = await fetch(`${url}${query ? "/"+query : ''}`, {
      method: method || 'GET',
      body: data ? JSON.stringify(data) : data,
      headers: {
        'Content-Type': 'application/json'
      }
  })

  if (result.ok) {
    return result.json()
  }
  throw new Error ('Request error')
};