// This is our server

const express = require('express');                 // Here, we're stating that we're using Express. Even tho it isn't a core node module, b/c it's been installed into the node_modules file, we can import it this way with the require keyword instead of specifying a file path
const morgan = require('morgan');
const bodyParser = require('body-parser');
const campsiteRouter = require('./routes/campsiteRouter');          // We're essentially importing the campsiteRouter module by using its filepath
const promotionRouter = require('./routes/promotionRouter');        // Essentially importing promotionRouter
const partnerRouter = require('./routes/partnerRouter');            // Essentially importing partnerRouter

const hostname = 'localhost';
const port = 3000;

const app = express();                   // Call the express function which will return an Express server application which is now available to us under variable name "app"
app.use(morgan('dev'));                  // This will configure morgan to log the developement version which will print some additional info to screen
app.use(bodyParser.json());              // Activate body-parser middleware to handle JSON-formatted data so that when server receives request with JSON formatted data in the body, the body-parser middleware will handle parsing that data into properties of the request object so we can access that data more easily. 

app.use('/campsites', campsiteRouter);          // Here, we provide the root path for the campsiteRouter so we do not need to specify it in the campsiteRouter module
app.use('/promotions', promotionRouter);        // This means that if user goes to localhost:3000/promotions then app knows to go to the promotionRouter to know how to handle the HTTP verb/method
app.use('/partners', partnerRouter);

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