const server = require("./server");

// escolher uma port ou pegar a 3000 como defaut
server.listen(process.env.port || 3000);
