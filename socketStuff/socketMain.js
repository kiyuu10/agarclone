// Where all our socket sutff will go
const io = require('../servers').io
//oh... we need express, get app, but only put what we need to inside of out socket stuff
const app = require('../servers').app