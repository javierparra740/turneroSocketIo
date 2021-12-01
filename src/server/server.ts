import express = require('express');

export default class Server{
  public app : express.Application;


  constructor(private port : number){
    this.app = express();
  }

  start(){
    this.app.listen(this.port);
    console.log("Server started");
  }

  static init(port : number) : Server{
    console.log("Server listening on port", port);
    return new Server(port);
  }
}
