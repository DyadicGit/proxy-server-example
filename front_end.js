const apiServerBaseUrl = 'http://localhost:5000'
const proxiedApiServerBaseUrl = 'http://localhost:8000'
const helloUrl = proxiedApiServerBaseUrl+'/hello'

const sendRequest = async () => {
  const options = { headers: { accept: 'application/json' } }
  const response = await fetch(helloUrl, options)
  const data = await response.json()
  document.getElementById('response-data').textContent = JSON.stringify(data)
}
