const express = require("express");
const app = express();
const path = require("path");

//Middleware
require("./middleware")(app);

//Adding api routes
app.use("/api", require("./routes"));

//Adding client routes
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(
    "/static",
    express.static(path.join(__dirname, "../client/build/static"))
  );
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

//Listening http
const port = process.env.PORT || 5000;
const server = app.listen(port, function() {
  console.log("Server running on http://localhost:" + port);
});

//Socket functions
require("./socket")(server);
