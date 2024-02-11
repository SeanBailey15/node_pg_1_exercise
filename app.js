/** BizTime express application. */

const express = require("express");
const app = express();
const ExpressError = require("./expressError");

app.use(express.json());

const compRoutes = require("./routes/companies");
app.use("/companies", compRoutes);

const invRoutes = require("./routes/invoices");
app.use("/invoices", invRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  let status = err.status || 500;

  return res.json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
