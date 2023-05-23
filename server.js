const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const dotenv = require("dotenv");

const app = express();

app.use(xmlparser());

const router = require("./router");
app.use("/", router);

dotenv.config(); // 读取并加载 .env 文件中的环境变量

app.listen(3008, function () {
  console.log("服务启动成功！");
});
