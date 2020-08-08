// This is an Express router. This module will contain the code for handling the REST API endpoints for campsites and campsites/campsiteId

const express = require('express');
const bodyParser = require('body-parser');

// Create a new Express router by calling express.Router fxn and assigning it to a variable
const campsiteRouter = express.Router();

campsiteRouter.use(bodyParser.json());

campsiteRouter.route('/')               // The path isn't '/campsites' like you'd expect bc it's defined in server.js on campsiteRouter line
// When moving Express routing methods out of single file and into separate module, we'll now link the methods by removing "app" from "app.all" method, removing path '/campsites' from param list since it's now defined in server.js, and remove ; at end of block so methods are linked 
.all((req, res, next) => {                       
    res.statusCode = 200;                                  
    res.setHeader('Content-type', 'text/plain');           
    next();                                                
})

.get((req, res) => {                      
    res.end(`Will send all the campsites to you`);         
})

.post((req, res) => {
    res.end(`Will add the campsites: ${req.body.name} with description: ${req.body.description}`);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /campsites`);
})

.delete((req, res) => {
    res.end(`Deleting all campsites`);
});                                                                 // Leave this semicolon since it's the end of the routing method statement



// Export router so it can be used elsewhere in app
module.exports = campsiteRouter;
