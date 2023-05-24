const express = require("express");
const xmlparser = require("express-xml-bodyparser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv");

dotenv.config(); // 读取并加载 .env 文件中的环境变量

const app = express();
app.use(xmlparser());

const router = require("./router");
app.use("/", router);

// 配置代理中间件
const proxyOptions = {
  target: "https://relay1.ksrd.xyz:2083", // 代理服务器的地址和端口
  changeOrigin: true, // 设置请求头中的Host字段为目标URL的主机名
};
const proxy = createProxyMiddleware("/", proxyOptions);
app.use(proxy); // 将代理中间件添加到 Express 应用程序中

app.listen(3008, function () {
  console.log("服务启动成功！");
});
