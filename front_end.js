const apiServerBaseUrl = 'http://localhost:5000'
const proxiedApiServerBaseUrl = 'http://localhost:8000'
const helloUrl = proxiedApiServerBaseUrl + '/hello'

const sendRequest = async () => {
  const options = { headers: { accept: 'application/json' } }
  const response = await fetch(helloUrl, options)
  const data = await response.json()
  document.getElementById('response-data').textContent = JSON.stringify(data)
}

const images = [
  'https://cdn.eso.org/images/thumb300y/eso1907a.jpg',
  'https://api.media.atlassian.com/file/90edef1f-f222-44e7-8a58-e60e4b70826e/binary?token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI0ZTlmNGFiMS1iN2FiLTQ5YjItODlkOS05ZmEyMDc2NDI0ZTMiLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpmaWxlOjkwZWRlZjFmLWYyMjItNDRlNy04YTU4LWU2MGU0YjcwODI2ZSI6WyJyZWFkIl19LCJleHAiOjE1ODk1MzczNDUsIm5iZiI6MTU4OTQ1NDM2NX0.l-bBjqc3lgq96S7fC1PMmFksac1mBOb4QqaJot5U4aU&client=4e9f4ab1-b7ab-49b2-89d9-9fa2076424e3&name=image.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Square_200x200.svg/1200px-Square_200x200.svg.png'
]

const getImageData = async (imageUrl) => {
  const options = { headers: { accept: 'image/*' } }
  const response = await fetch(`http://localhost:8000/image/${encodeURIComponent(imageUrl)}`, options)
  return await response.text()
}
const appendToContainer = (url) => {
  const elem = document.createElement("img");
  elem.setAttribute("src", url);
  elem.setAttribute("height", "200");
  elem.setAttribute("width", "200");
  elem.setAttribute("alt", "loaded image");
  document.getElementById("container").appendChild(elem);
}

window.onload = async () => {
  for (const imageUrl of images) {
    appendToContainer(await getImageData(imageUrl))
  }
}
