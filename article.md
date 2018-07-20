Use JSONP and other solutions to bypass the Same Origin Policy

# TODO Provide table of contents, or a summary, of what we are going to be doing here.

You may have run into situations where you are making an API call from one origin to another. 
In our example, we have an HTML page served from localhost:3000.
It is making an API call to localhost:8000.

https://gist.github.com/newyork-anthonyng/cb7e842d254878350ab923f40e09030c

However, we see this intimidating error.
```
Failed to load http://localhost:8000/api/text: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

This is the Same-Origin Policy at work. The same-origin policy restricts how resources from one origin can interact with resources from another origin It is a critical security mechanism in the browser. However, there are instances where we want to make cross-origin requests to trusted resources.

JSONP provides one work-around for this Same-Origin Policy problem. First, let's build up to how JSONP came to be, and how it works.

# Technical dive
We can run JavaScript code inside <script> tags in our HTML file.
https://gist.github.com/newyork-anthonyng/af6b374b7220e7767c0d7151f42aa47e

We can move our JavaScript code into a JavaScript file, and link to it with our script tag. This will run our code the same way. The only difference being that we are making an external network call for the JavaScript file.
https://gist.github.com/newyork-anthonyng/2e7acf9e2265fd27b8ccfa189167be75

The Javascript file doesn't explicitly have to end in a `.js` extension. As long as the `Content-Type` in the Response is JavaScript (`text/javascript`, `application/javascript`), you can serve the JavaScript file on an endpoint that doesn't have the `.js` extension.
Most servers will allow you to explicitly set the type. In [Express](https://expressjs.com), you can run
```js
response.set('Content-Type', 'text/javascript');
```
https://gist.github.com/newyork-anthonyng/fc0c44e1d72520d98fc46c5930fff996

Script tags are not limited by the Same-Origin Policy. There are other tags, such as <img> tags and <video> tags, also are not limited by the Same-Origin Policy. Our JavaScript can live on a different origin.
https://gist.github.com/newyork-anthonyng/cc6326c7d5378cceb318c64cdc3097dc

The code inside the JavaScript file has access to everything that is in scope. If you had a function that was defined earlier, you can use it in your JavaScript file.
https://gist.github.com/newyork-anthonyng/ff6093a298879267ef90c45dbc75627e

We can also pass arguments like we would with normal JavaScript function calls.
https://gist.github.com/newyork-anthonyng/94dc22972a996f4aa51454e43cdd6366

In our above example, we passed in a hard-coded string. But we could also pass in data coming from some persistent storage. The server on localhost:8000 could construct the .js file with some information from our database.
https://gist.github.com/newyork-anthonyng/b1e6bf53647771c2fb7f78334764c461

And this is what JSONP is. Instead of using fetch or XMLHTTPRequest to make an API call to retrieve data, we used a <script> tag to do it.
Because we used a <script> tag, we were able to bypass the Same-Origin Policy. 
We are also able to use the data that was returned by localhost:8000 in our greet function.

JSONP means JSON with Padding. Our API responses usually return JSON. The padding means we are surrounding our JSON response with a function call. I like to visualize it like this:
# TODO: Draw JSON with padding

Most servers allow you to specify the name of your padding function, rather than use the one dictated by the server.
https://gist.github.com/newyork-anthonyng/8326924984ae9cff78e8b090bdc79a47
The server takes your calback function name, invokes it by adding an open parenthesis, adding the JSON data, and adding a closing parenthesis.

Because of this, you are not limited to passing function names as your callback (although you would probably want to).
https://gist.github.com/newyork-anthonyng/26932a8028239abf06b66a4ad88e02d8

# History of JSONP
There is no official spec for JSONP, although there were some suggestions for one. You can think of JSONP as more of a hack.

There are the normal security concerns as you would have for including JavaScript code onto your webpage. You have to trust that there is no malicious code coming from the backend.

Another restriction is that <script> tags can only make GET requests. Therefore, JSONP is limited to GET requests.

# Alternatives to using JSONP
You may run into JSONP when working with older API's. Now you know how they work!.
Cross-Origin Resource Sharing (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) is an official spec, and is the preferred way of getting around the Same-Origin Policy.
In our example, we could have enabled Cross-Origin Resource Sharing by adding a header to our Response.
```js
response.set('Access-Control-Allow-Origin', '*'); 
```
This means all origins can safely use this resource without fear of the Same-Origin Policy.

Sometimes, you don't have control over the server-code though. You would not be able to update the Response headers to include the `Access-Control-Allow-Origin` header. Another alternative is to make your own proxy server that makes the cross-origin request for you. The Same-Origin policy only applies to the browser. Servers are free to make cross-origin requests.
# TODO: Include drawing of proxy server.


# Resources
* https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
* https://github.com/newyork-anthonyng/jsonp-example.