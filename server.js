const express = require('express');                 // Here, we're stating that we're using Express. Even tho it isn't a core node module, b/c it's been installed into the node_modules file, we can import it this way with the require keyword instead of specifying a file path
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();                   // Call the express function which will return an Express server application which is now available to us under variable name "app"
app.use(morgan('dev'));                  // This will configure morgan to log the developement version which will print some additional info to screen
app.use(bodyParser.json());              // Activate body-parser middleware to handle JSON-formatted data so that when server receives request with JSON formatted data in the body, the body-parser middleware will handle parsing that data into properties of the request object so we can access that data more easily. 

// This will apply to any/all HTTP verbs so we don't have to repeat this for each endpoint (DRY)
app.all('/campsites', (req, res, next) => {                 // Routing method "all" is a catch-all for all HTTP verbs, so anytime any HTTP request is made for this path (/campsites), this method will run and then move on to the next routing method bc the "next" keyword is used at the end of this code block. First param is path; 2nd param is a callback
    res.statusCode = 200;                                   // This means the response object's status code will be 200
    res.setHeader('Content-type', 'text/plain');            // This means we'll send back plain text in the response body 
    next();                                                 // Calling the "next" function passes control to the application routing to the next relevant routing method after this one; otherwise, it would just stop here and not go any further
});

// Add support for 4 endpoints for path '/campsites' :
app.get('/campsites', (req, res) => {                       // Don't need to include "next" as a param of 2nd argument since we do not want to process any more routing methods after this one.
    res.end(`Will send all the campsites to you`);          // Bc app.all method already set the response object's status code and content type, we do not need to include that here, just the res.end method to send a message back to client
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsites: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites`);
});

app.delete('/campsites', (req, res) => {
    res.end(`Deleting all campsites`);
});

// Add support for 4 more endpoints for a different path '/campsites/:campsiteId' :
app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);                                     // \n creates new line
    res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`)     // We're parsing out the body name and body description from the request object that was sent to us, rather than the campsite ID route paramater (like in the above) 
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);                     // This will only delete the selected campsite, rather than all of them as stated in the above delete method
});


app.use(express.static(__dirname + '/public'));             // Set up Express to serve up static files from the public folder 
                                                            // express.static is a middleware fxn;  __dirname variable is a special var in Node - refers to absolute path of current directory of file that it's in

app.use((req, res) => {                  // Use the use method of Express on app variable to set up server. For now, it will return the same response (defined in following lines) for any request; has access to 3 params: req, res, next
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1> This is an Express Server </html></body></h1>')
});

app.listen(port, hostname, () => {        // This both creates an instance of the HTTP server class and start listening to it
    console.log(`Server running at http://${hostname}:${port}/`);
});

