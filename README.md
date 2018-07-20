# JSONP Examples

# Getting Started

```bash
$ npm install
$ npm start

# In browser, open up localhost:3000
```

# Available routes

| Route                          | Description                                                                                                                                              |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `localhost:3000/without-jsonp` | Client is making a failing cross-origin request                                                                                                          |
| `localhost:3000/with-jsonp`    | Client is making a JSONP request                                                                                                                         |
| `localhost:3000/with-cors`     | Client is making successful cross-origin request. The server is adding `Access-Control-Allow-Origin` to avoid same-origin policy                         |
| `localhost:3000/with-proxy`    | Client is making a request to its own origin server. The origin server is making a cross-origin request. The Same-origin policy only applies to browsers |
