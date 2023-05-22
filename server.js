const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const app = express();

app.use(xmlparser());

const router = require("./router");

app.use("/", router);

app.listen(3008, function () {
  console.log("服务启动成功！");
});
