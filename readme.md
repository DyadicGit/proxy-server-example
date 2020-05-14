#### a proxy server that modifies headers (adds CORS) for a "helloWorld" api server, used in a basic front-end
* the api server is on port 5000
* api is "/hello"
* the proxy server is on port 8000
* the proxy server adds CORS header + one custom header
* the front-end app calls the localhost:8000/hello, because it uses CORS headers
that's it
