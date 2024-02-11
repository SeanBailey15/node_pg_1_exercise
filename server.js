/** Server startup for BizTime. */

// In terminal, be sure to enter your PostGres password before starting the server:
// ex PGPASSWORD=userpassword nodemon server.js

const app = require("./app");

app.listen(3000, function () {
  console.log("Listening on 3000");
});
