const server = require("./server");

// escolher uma port ou pegar a 3000 como defaut
server.listen(process.env.PORT || 3000);
