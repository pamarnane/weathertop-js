"use strict";

const express = require("express");
const logger = require("./utils/logger");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();
app.use(cookieParser());
const exphbs = require("express-handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(fileUpload());

app.engine(
  ".hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
      helpers: {
      checkLength: function(v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        else {
          return options.inverse(this);
        }
      }
    }
  })
);
app.set("view engine", ".hbs");

const routes = require("./routes");
app.use("/", routes);

const listener = app.listen(process.env.PORT || 4000, function() {
  logger.info(`WeatherTop JS started on port ${listener.address().port}`);
});
