const express = require('express')
const http = require('http')
const httpProxy = require('http-proxy')
const fetch = require('node-fetch');
const app = express()

const proxy = httpProxy.createProxyServer({});
const server = http.createServer(function(req, res) {
  proxy.web(req, res, {
    target: `http://localhost:${apiServerPort}`
  });
});
const proxyServerPort = 8000
server.listen(proxyServerPort, () => console.log(`Proxy server on http://localhost:${proxyServerPort}`));

proxy.on('error', function (err, req, res) {
  console.log(err)
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end(err.message);
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('a-custom-header','this is a custom header')
});

app.get('/hello', (req, res) => {
  return res.json({ text: 'Hello World!' });
})

app.get('/image/:imageUrl', async (req, res) => {
  const options = {
    method: 'get',
    headers: { 'accept': 'image/*' },
  }
  const { imageUrl } = req.params
  const response = await fetch(decodeURIComponent(imageUrl), options);
  const type = response.headers.get('content-type')
  const buffer = await response.buffer()
  const base64 = buffer.toString('base64')
  res.send('data:'+type+';base64,'+base64)
})
const apiServerPort = 5000
app.listen(apiServerPort, () => console.log(`Api server on http://localhost:${apiServerPort}`))
