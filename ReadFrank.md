# REQ (REQUEST) & RES (REsPONSE)

## REQ

- `req`
  - `req.headers` – Contains all HTTP headers
    - `req.headers.cookie` – The cookies sent in the request
    - `req.headers.host` – The host of the request
    - `req.headers['user-agent']` – User agent info (browser, OS)
  - `req.method` – The HTTP method (GET, POST, etc.)
  - `req.url` – The URL requested by the client
  - `req.originalUrl` – The original URL requested
  - `req.baseUrl` – The base URL (useful with routers)
  - `req.path` – The path part of the URL
  - `req.params` – URL route parameters (e.g., `req.params.id`)
  - `req.query` – URL query string parameters (e.g., `?name=John`)
  - `req.body` – The body of the request (useful with POST/PUT)
  - `req.cookies` – Parsed cookies sent by the client
  - `req.signedCookies` – Signed cookies (if cookie-parser is used)
  - `req.ip` – The IP address of the client
  - `req.ips` – IP addresses (if the "trust proxy" setting is enabled)
  - `req.protocol` – The protocol used (HTTP or HTTPS)
  - `req.secure` – True if the request is via HTTPS
  - `req.subdomains` – Array of subdomains in the request
  - `req.xhr` – True if the request was made with XMLHttpRequest (AJAX)
  - `req.get(header)` – Function to get a specific header (e.g., `req.get('Content-Type')`)
  - `req.route` – The current route info
  - `req.session` – Session data (if session middleware is used)
  - `req.user` – The authenticated user (if using authentication)
  - `req.fresh` – True if the response is still "fresh" according to cache headers
  - `req.stale` – True if the response is "stale"
  - `req.accepts(types)` – Check if the request accepts certain content types
  - `req.is(type)` – Check if the incoming request is of a specific content type
  - `req.app` – Reference to the Express app
  - `req.socket`
    - `req.socket.remoteAddress` – The IP address of the client
    - `req.socket.localAddress` – The local address of the server

### Common use cases:

- `req.headers` – Contains all HTTP headers.
  - `req.headers.cookie` – Access cookies sent in the request.
  - `req.get('Content-Type')` – Get the 'Content-Type' header.
- `req.method` – The HTTP method (GET, POST, etc.).
- `req.url` – The URL requested by the client.
- `req.originalUrl` – The original URL requested.
- `req.baseUrl` – The base URL (useful with routers).
- `req.path` – The path part of the URL.
- `req.params` – URL route parameters (e.g., `req.params.id`).
- `req.query` – URL query string parameters (e.g., `?name=John`).
- `req.body` – The body of the request (useful with POST/PUT).
- `req.cookies` – Parsed cookies sent by the client.
- `req.signedCookies` – Signed cookies (if using cookie-parser).
- `req.ip` – The IP address of the client.
- `req.protocol` – The protocol used (HTTP or HTTPS).
- `req.secure` – True if the request was made over HTTPS.
- `req.xhr` – True if the request was made via AJAX (XMLHttpRequest).
- `req.route` – The current route info.
- `req.app` – Reference to the Express app.

## RES

- `res`
  - `res.statusCode` – The HTTP status code of the response
  - `res.status(statusCode)` – Set the status code (e.g., `res.status(200)`)
  - `res.set(header, value)` – Set a response header (e.g., `res.set('Content-Type', 'application/json')`)
  - `res.get(header)` – Get a specific header value (e.g., `res.get('Content-Type')`)
  - `res.headersSent` – Boolean, true if headers have already been sent
  - `res.send([body])` – Send a response with the body (string, object, etc.)
  - `res.sendFile(path)` – Send a file as the response
  - `res.json([body])` – Send a JSON response
  - `res.jsonp([body])` – Send a JSONP response
  - `res.redirect([status], path)` – Redirect the client to a new URL
  - `res.render(view, [locals])` – Render a view template (used with view engines like EJS)
  - `res.end([body])` – End the response process
  - `res.setHeader(header, value)` – Set a specific response header
  - `res.append(header, value)` – Append a value to the response header (e.g., `res.append('Link', '<http://localhost/>')`)
  - `res.cookie(name, value, [options])` – Set a cookie (use cookie-parser middleware)
  - `res.clearCookie(name, [options])` – Clear a cookie
  - `res.type(type)` – Set the content type (e.g., `res.type('html')`)
  - `res.format(object)` – Respond with different formats (content negotiation)
  - `res.location(url)` – Set the location header (useful for redirects)
  - `res.vary(field)` – Add the "Vary" header for content negotiation
  - `res.attachment([filename])` – Set the content disposition to attachment for file downloads
  - `res.download(path, [filename], [callback])` – Prompt a file download (e.g., `res.download('/path/to/file')`)
  - `res.locals` – An object containing local variables that are available to views
  - `res.links(links)` – Set links for HTTP Link header (e.g., `res.links({ next: '/page/2', last: '/page/10' })`)
  - `res.setTimeout(ms)` – Set the timeout for the response
  - `res.write([chunk])` – Write a chunk to the response body (usually used with streams)

### Common use cases:

- `res.status(200)` – Set the HTTP status code to 200 (OK).
- `res.statusCode` – Access the current HTTP status code.
- `res.send()` – Send a response with a body (string, object, etc.).
- `res.json()` – Send a JSON response.
- `res.set()` – Set a specific header in the response.
- `res.cookie()` – Set a cookie in the response.
- `res.redirect()` – Redirect the client to another URL.
- `res.render()` – Render a view template (if using a view engine).

# REMOVING AND GETTING DATA FROM OBJECTS

## Remove fileds from objects

### Mongoose

When dealing with sensitive information such as passwords, we can remove these fields by overriding the `toJSON` method in Mongoose. Here's how:

```javascript
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
})

UserSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password // Remove password field
  return obj
}

export default mongoose.model('User', UserSchema)
```

- **`toJSON()` method** – Automatically invoked when using `JSON.stringify()` on the Mongoose model, which strips the password field from the response.

---

### Regular JavaScript constructor Object Example

We can also achieve the same behavior with regular JavaScript objects by defining a custom `toJSON` method directly on the object or class:

```javascript
// Using a class to define a user object
class User {
  constructor(name, email, password) {
    this.name = name
    this.email = email
    this.password = password
  }

  toJSON() {
    const obj = { ...this } // Create a copy of the object
    delete obj.password // Remove password
    return obj
  }
}

const user = new User('John Doe', 'john@example.com', 'supersecret')
console.log(JSON.stringify(user)) // {"name":"John Doe","email":"john@example.com"}
```

### Using a Regular Object

```javascript
const user = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  password: 'supersecret',
  role: 'admin',

  toJSON() {
    const obj = { ...this } // Create a copy of the object
    delete obj.password // Remove the password field
    return obj
  },
}

// Example usage
console.log(JSON.stringify(user)) // Output: {"name":"Jane Doe","email":"jane@example.com","role":"admin"}
```

## Accessing Object Values in JavaScript

### getting values from object into an array

You can define an object like this and access its values using `Object.values()`:

```javascript
export const JOB_SORT_BY = {
  NEWEST_FIRST: 'newest',
  OLDEST_FIRST: 'oldest',
  ASCENDING: 'a-z',
  DESCENDING: 'z-a',
}

const list = Object.values(JOB_SORT_BY)
console.log(list) // Output: ['newest', 'oldest', 'a-z', 'z-a']
```

### Getting data from formData

```javascript
export const action = async (formData) => {
  const data = Object.fromEntries(formData)
  // or
  const item1 = formData.get('item1')
  const item2 = formData.get('item2')
  const item3 = formData.get('item3')
}
```

### Converting an Array of Objects with Two Key-Value Pairs into a Single Object

```javascript
 stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

// example:
 {"stats": [
    {
      "_id": "pending",
      "count": 37
    },
    {
      "_id": "declined",
      "count": 27
    },
    {
      "_id": "interview",
      "count": 36
    }
  ]
}

```

### Getting params from loader

```javascript
// example:
export const loader = async ({ request }) => {
  console.log(request.url)

  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    console.log(params)

    const { jobs } = await customFetch.get('/jobs', {
      params,
    })
    console.log(jobs)

    return {
      jobs,
      searchValues: { ...params },
    }
  } catch (error) {
    toast.error(error.response.jobs.msg)
    return error
  }
}
```
