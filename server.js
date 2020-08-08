const express = require('express');                 // Here, we're stating that we're using Express. Even tho it isn't a core node module, b/c it's been installed into the node_modules file, we can import it this way with the require keyword instead of specifying a file path

const hostname = 'localhost';
const port = 3000;

const app = express();                   // Call the express function which will return an Express server application which is now available to us under variable name "app"

app.use((req, res) => {                  // Use the use method on app variable to set up server. For now, it will return the same response (defined in following lines) for any request; has access to 3 params: req, res, next
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1> This is an Express Server </html></body></h1>')
});

app.listen(port, hostname, () => {        // This both creates an instance of the HTTP server class and start listening to it
    console.log(`Server running at http://${hostname}:${port}/`);
});

