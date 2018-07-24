Use JSONP and other alternatives to bypass the Same Origin Policy

In this article, we will be looking at what JSONP is, its drawbacks, and some alternatives to JSONP.

You may have run into situations where you make an API call from one origin to another. 
For example, we have a page served from localhost:3000 that is calling an API from localhost:8000.
(https://gist.github.com/newyork-anthonyng/cb7e842d254878350ab923f40e09030c)

In quotes: We will refer to localhost:3000 as our client server. We will refer to localhost:8000 as our api server.

But we see this intimidating error.

```
Failed to load http://localhost:8000/api/text: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

This is the Same-Origin Policy protecting us. This policy restricts how resources from one origin interacts with resources from another origin. It is a critical security mechanism in the browser. But there are instances where we want to make cross-origin requests to trusted resources.

JSONP (JSON with Padding) provides a work-around for this Same-Origin Policy problem. Let's look at how JSONP came to be.

# Technical dive
We can run JavaScript code inside our HTML file with <script> tags.
(https://gist.github.com/newyork-anthonyng/af6b374b7220e7767c0d7151f42aa47e)

We can move our JavaScript code into a separate JavaScript file and reference it with our script tag. Our webpage now makes an external network call for the JavaScript file. But functionality everything works the same.
https://gist.github.com/newyork-anthonyng/2e7acf9e2265fd27b8ccfa189167be75

The Javascript file doesn't have to have a .js extension. The browser will interpret content as JavaScript if the Response's Content-Type is JavaScript. (text/javascript, application/javascript).
Most servers will allow you to set the content type. In [Express](https://expressjs.com), you would do:
```js
response.set('Content-Type', 'text/javascript');
```
https://gist.github.com/newyork-anthonyng/fc0c44e1d72520d98fc46c5930fff996

Script tags are not limited by the Same-Origin Policy. There are other tags, such as <img> and <video> tags, that are not limited by the Same-Origin Policy. So our JavaScript can live on a different origin.
https://gist.github.com/newyork-anthonyng/cc6326c7d5378cceb318c64cdc3097dc

The code inside the JavaScript file has access to everything that is in scope. You can use functions defined earlier in your HTML file.
https://gist.github.com/newyork-anthonyng/ff6093a298879267ef90c45dbc75627e

You can pass arguments as you would for a normal function call.
https://gist.github.com/newyork-anthonyng/94dc22972a996f4aa51454e43cdd6366

In the above example, we passed a hard-coded string. But we could also pass in data coming from a database. Our API server can construct the JavaScript file with this dynamic information.
https://gist.github.com/newyork-anthonyng/b1e6bf53647771c2fb7f78334764c461

This is what JSONP is. Instead of using `fetch` or `XMLHTTPRequest` to make an API call to retrieve data, we used a <script> tag.
Because we used a <script> tag, we were able to bypass the Same-Origin Policy. 

JSONP means JSON with Padding. What does the padding mean? Normal API responses return JSON. In JSONP responses, we return the JSON response surrounded (or padded) with a JavaScript function. 
# TODO: Draw JSON with padding

Most servers allow you to specify the name of your padding function.
https://gist.github.com/newyork-anthonyng/8326924984ae9cff78e8b090bdc79a47
The server takes your padding function name as a query. It invokes your padding function with the JSON data as an argument.

You are not limited to passing function names as your callback. You can pass inline JavaScript in your query.
https://gist.github.com/newyork-anthonyng/26932a8028239abf06b66a4ad88e02d8
I have not thought of a reason to do this.

# More examples
See this repository for more examples.
* https://github.com/newyork-anthonyng/jsonp-example.

# Alternatives to using JSONP
There is no official spec for JSONP. You can think of JSONP as more of a hack.

<script> tags can only make GET requests. So JSONP can only make GET requests.

Cross-Origin Resource Sharing (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) has an official specification, and is the preferred way of getting around the Same-Origin Policy.
You can enable Cross-Origin Resource Sharing by adding a header to our Response.
```js
response.set('Access-Control-Allow-Origin', '*'); 
```
This means all origins can use this resource without fear of the Same-Origin Policy.

Sometimes, you don't have control over the server-code though. You would not be able to include the `Access-Control-Allow-Origin` header. An alternate solution is to make your own proxy server make the cross-origin request for you. The Same-Origin policy only applies to the browser. Servers are free to make cross-origin requests.
# TODO: Include drawing of proxy server.

# Resources
* https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
* https://github.com/newyork-anthonyng/jsonp-example.
* Good explanation of JSONP
    https://web.archive.org/web/20160304044218/http://www.json-p.org/