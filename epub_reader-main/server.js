const static = require("node-static");

const file = new static.Server("./book");

require("http")
  .createServer(function (request, response) {
    request
      .addListener("end", function () {
        file.serve(request, response);
      })
      .resume();
  })
  .listen(8080, console.log("a"));
