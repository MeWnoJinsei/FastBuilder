#!/usr/bin/env node

const colorize = require('./core/colorize');
const WSServer = require('./core/wsserver');
const BuildSession = require('./core/session');
const profile = require('./core/profile');
const os = require('os');

let localhost;
if(os.type == 'Linux'){
  try{
    localhost = os.networkInterfaces()[Object.keys(os.networkInterfaces())[1]][0].address + ':8080';
  }catch (e) {
    localhost = '127.0.0.1:8080';
  }
}else{
  try{
    localhost = os.networkInterfaces()[Object.keys(os.networkInterfaces())[0]][1].address + ':8080';
  }catch (e) {
    localhost = '127.0.0.1:8080';
  }
}
var wss = new WSServer(8080);
console.log(colorize('Server is running at ws://' + localhost).yellow);
console.log(colorize(profile.logo).yellow);

wss.on('client', function(session, request) {
  BuildSession.createAndBind(session);
  console.log(request.connection.remoteAddress, 'connected!');
});

//When I wrote this, only God and I understood what I was doing
//Now, God only knows.